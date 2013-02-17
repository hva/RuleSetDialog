(function ($) {

    var ruleSet,
        selectedRuleIndex = 0;

    $(function () {
        ajax('LoadRuleSet', {}, function (resp) {
            ruleSet = resp.d;
            $('#ruleChaining').val(ruleSet.Chaining);
            addHandlers();
            refreshRulesTable();
            refreshRuleDefinition();
            refreshButtons();
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
        // Rule Set section
        $('#addRule').click(addRule);
        $('#deleteRule').click(deleteRule);
        $('#ruleChaining').change(function () {
            ruleSet.Chaining = $(this).val();
        });

        // Rule Definition section
        $('#ruleName').blur({ prop: 'Name' }, modifyRuleProperty);
        $('#rulePriority').blur({ prop: 'Priority' }, modifyRuleProperty);
        $('#ruleReevaluation').change({ prop: 'Reevaluation' }, modifyRuleProperty);
        $('#ruleActive').change(function () {
            var rule = ruleSet.Rules[selectedRuleIndex],
                value = $(this).is(':checked');
            rule.Active = value;
            refreshRulesTable();
        });
        $('#ruleCondition').change({ prop: 'Condition' }, modifyRuleProperty);
        $('#ruleThenActions').change({ prop: 'ThenActions' }, modifyRuleMultilineProperty);
        $('#ruleElseActions').change({ prop: 'ElseActions' }, modifyRuleMultilineProperty);

        // control buttons
        $('#ruleSetSaveButton').click(function () {
            ajax('SaveRuleSet', { ruleSet: ruleSet });
        });
    }

    function refreshRulesTable() {
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
                ).click({ index: i }, ruleRowClick).css('cursor', 'pointer');
            table.append(tr);
        }
        $('tbody > tr', table).eq(selectedRuleIndex).addClass('highlight');
    }

    function getPreview(rule) {
        return ['IF', rule.Condition, 'THEN', rule.ThenActions.join(' '), 'ELSE', rule.ElseActions.join(' ')].join(' ');
    }

    function ruleRowClick(e) {
        var index = e.data.index;
        selectedRuleIndex = index;
        $(this).addClass('highlight').siblings('.highlight').removeClass('highlight');
        refreshRuleDefinition();
    }

    function refreshRuleDefinition() {
        var rule = ruleSet.Rules[selectedRuleIndex];
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
            refreshRulesTable();
        }
    }

    function modifyRuleMultilineProperty(e) {
        var prop = e.data.prop,
            rule = ruleSet.Rules[selectedRuleIndex],
            value = $(this).val();
        rule[prop] = value.split('\n');
        refreshRulesTable();
    }

    function addRule() {
        var index = ruleSet.Rules.length,
            rule = {
                Name: 'Rule' + (index + 1),
                Priority: 0,
                Reevaluation: 'Always',
                Active: true,
                Condition: '',
                ThenActions: [],
                ElseActions: []
            };
        ruleSet.Rules[index] = rule;
        selectedRuleIndex = index;
        refreshRulesTable();
        refreshRuleDefinition();
        refreshButtons();
    }

    function deleteRule() {
        ruleSet.Rules.splice(selectedRuleIndex, 1);
        if (ruleSet.Rules.length > 0) {
            if (!(selectedRuleIndex in ruleSet.Rules)) {
                selectedRuleIndex--;
            }
            refreshRulesTable();
            refreshRuleDefinition();
        } else {
            refreshRulesTable();
        }
        refreshButtons();
    }
    
    function refreshButtons() {
        var disabled = ruleSet.Rules.length == 0,
        inputs = ['#ruleName', '#rulePriority', '#ruleReevaluation', '#ruleActive', '#ruleCondition', '#ruleThenActions', '#ruleElseActions'];
        $(inputs.concat(['#deleteRule']).join(',')).prop('disabled', disabled);
        if (disabled) {
            $(inputs.join(',')).val('');
        }
    }

})(jQuery);