(function($) {

    var ruleSet;

    $(function() {
        ajax('LoadRuleSet', {}, function (resp) {
            ruleSet = new RuleSet(resp.d);
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
            ajax('SaveRuleSet', { ruleSet: ruleSet.rawData });
        });
        $('#ruleChaining').change(function () {
            var value = $(this).val();
            ruleSet.setChaining(value);
        });
    }

    function refreshUI() {
        $('#ruleChaining').val(ruleSet.getChaining());
    }


    var Rule = function () {

    };
    var RuleSet = function (data) {
        // private
        var rawData = data,
            getChaining = function() {
                return rawData.ChainingBehavior;
            },
            setChaining = function(value) {
                rawData.ChainingBehavior = value;
            }
        ;
        // public
        return {
            rawData: rawData,
            getChaining: getChaining,
            setChaining: setChaining
        };
    };

})(jQuery);