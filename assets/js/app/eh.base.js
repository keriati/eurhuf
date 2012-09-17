/*!
 * EurHuf Javascript Library
 *
 * build: @BN@
 */
(function () {

    var EH = {};

    EH.YQL = function (query) {
        return $.ajax({
            url:     'http://query.yahooapis.com/v1/public/yql?callback=?',
            dataType:'json',
            timeout: 2000,
            data:    {
                q:     query,
                format:'json',
                env:   'store://datatables.org/alltableswithkeys'
            }
        });
    };

    EH.prettyFormat = function (value, type) {
        var myType = type || 'eur',
            money = value;

        switch (myType) {
            case 'huf':
                money = accounting.formatMoney(money, "", 2, " ", ",");
                break;
            case 'eur':
                money = accounting.formatMoney(money, "", 2, " ", ",");
                break;
            default:
                return false;
        }
        return money;
    };

    window.EH = EH;
})();