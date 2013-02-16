(function ($) {

    var ruleSet;

    $(init);

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

    function init() {
        ajax('GetRuleSet', {}, function (resp) {
            ruleSet = new RuleSet(resp.d);
        });
    }

    var Rule = function () {

    };
    var RuleSet = function (data) {

    };

})(jQuery);