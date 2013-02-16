﻿(function($) {

    var ruleSet;

    $(function() {
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
                tr = $('<tr><td>' + rule.Name + '</td><td>' + rule.Priority + '</td><td>' + rule.Reevaluation + '</td><td>' + rule.Active + '</td></tr>');
            table.append(tr);
        }
    }

})(jQuery);