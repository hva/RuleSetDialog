(function ($) {

    var ruleSet,
        selectedRuleIndex = 0;

    $(function () {
        ajax('LoadRuleSet', {}, function (resp) {
            ruleSet = resp.d;
            addHandlers();
            drawRuleSet();
        });
    });

    function ajax(method, data, success) {
        $.ajax({
            type: 'POST',
            url: 'Default.aspx/' + method,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: success,
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    }

    function addHandlers() {
        $('#ruleChaining').change(function () {
            ruleSet.Chaining = $(this).val();
        });
        $('#ruleName').blur({ prop: 'Name' }, modifyRuleProperty);
        $('#rulePriority').blur({ prop: 'Priority' }, modifyRuleProperty);
        $('#ruleReevaluation').change({ prop: 'Reevaluation' }, modifyRuleProperty);
        $('#ruleActive').change(function (e) {
            var rule = ruleSet.Rules[selectedRuleIndex],
                value = $(this).is(':checked');
            rule.Active = value;
            drawRuleSet();
        });
        $('#ruleCondition').change({ prop: 'Condition' }, modifyRuleProperty);
        $('#ruleThenActions').change({ prop: 'ThenActions' }, modifyRuleMultilineProperty);
        $('#ruleElseActions').change({ prop: 'ElseActions' }, modifyRuleMultilineProperty);
        $('#ruleSetSaveButton').click(function () {
            ajax('SaveRuleSet', { ruleSet: ruleSet });
        });
    }

    function drawRuleSet() {
        $('#ruleChaining').val(ruleSet.Chaining);
        fillRulesTable();
        $('#rulesTable > tbody > tr').eq(selectedRuleIndex).click();
    }

    function fillRulesTable() {
        var table = $('#rulesTable');
        $('tbody', table).empty();
        for (var i in ruleSet.Rules) {
            var rule = ruleSet.Rules[i],
                td = $('<td></td>'),
                tr = $('<tr></tr>').append(
                    td.clone().text(rule.Name),
                    td.clone().text(rule.Priority),
                    td.clone().text(rule.Reevaluation),
                    td.clone().text(rule.Active),
                    td.clone().text(getPreview(rule))
                ).click({ rule: rule }, ruleRowClick).css('cursor', 'pointer');
            table.append(tr);
        }
    }

    function getPreview(rule) {
        return ['IF', rule.Condition, 'THEN', rule.ThenActions.join(' '), 'ELSE', rule.ElseActions.join(' ')].join(' ');
    }
    
    function ruleRowClick(e) {
        var rule = e.data.rule;
        $(this).addClass('highlight').siblings('.highlight').removeClass('highlight');
        drawRuleDefinition(rule);
        selectedRuleIndex = ruleSet.Rules.indexOf(rule);
    }
    
    function drawRuleDefinition(rule) {
        $('#ruleName').val(rule.Name);
        $('#rulePriority').val(rule.Priority);
        $('#ruleReevaluation').val(rule.Reevaluation);
        $('#ruleActive').attr('checked', rule.Active);
        $('#ruleCondition').val(rule.Condition);
        $('#ruleThenActions').val(rule.ThenActions.join('\n'));
        $('#ruleElseActions').val(rule.ElseActions.join('\n'));
    }

    function modifyRuleProperty(e) {
        var prop = e.data.prop,
            rule = ruleSet.Rules[selectedRuleIndex],
            original = rule[prop],
            modified = $(this).val();
        if (original !== modified) {
            rule[prop] = modified;
            drawRuleSet();
        }
    }

    function modifyRuleMultilineProperty(e) {
        var prop = e.data.prop,
            rule = ruleSet.Rules[selectedRuleIndex],
            value = $(this).val();
        rule[prop] = value.split('\n');
        drawRuleSet();
    }


})(jQuery);