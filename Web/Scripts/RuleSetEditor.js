(function ($) {

    var ruleSet;

    $(function () {
        ajax('LoadRuleSet', {}, function (resp) {
            ruleSet = resp.d;
            bindUI();
            refreshUI();
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

    function bindUI() {
        $('#ruleChaining').change(function () {
            ruleSet.Chaining = $(this).val();
        });
        $('#ruleSetSaveButton').click(function () {
            ajax('SaveRuleSet', { ruleSet: ruleSet });
        });
    }

    function refreshUI() {
        $('#ruleChaining').val(ruleSet.Chaining);
        fillRulesTable();
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
                );
            table.append(tr);
        }
    }

    function getPreview(rule) {
        return ['IF', rule.Condition, 'THEN', rule.ThenActions.join(' '), 'ELSE', rule.ElseActions.join(' ')].join(' ');
    }

})(jQuery);