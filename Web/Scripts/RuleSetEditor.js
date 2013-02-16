(function($) {

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
        $('#ruleSetSaveButton').click(function () {
            ajax('SaveRuleSet', { ruleSet: ruleSet });
        });
        $('#ruleChaining').change(function () {
            ruleSet.Chaining = $(this).val();
        });
    }

    function refreshUI() {
        $('#ruleChaining').val(ruleSet.Chaining);
    }

})(jQuery);