(function () {

    EH.Calculator = (function () {

        var query = 'select * from yahoo.finance.xchange where pair in ("EURHUF")';

        function Constr() {
            this.rate = null;
            this.subscribes = [];
            this.lastData = null;
        }

        function refresh() {
            var q = EH.YQL(query),
                that = this;

            q.success(function(data) {that.setRate(data)});
        }

        function setRate(data) {
            this.lastData = data;
            this.rate = parseFloat(data.query.results.rate.Rate);
            this.triggerSubscribes();
        }

        function triggerSubscribes() {
            $.each(this.subscribes, function (i, e) {
                if (typeof(e) === 'function') {
                    e();
                }
            });
        }

        function eh(value, rate) {
            if (rate) {
                return parseFloat(value) * parseFloat(rate);
            }
            return parseFloat(value) * this.rate;
        }

        function he(value, rate) {
            if (rate) {
                return parseFloat(value) / parseFloat(rate);
            }
            return parseFloat(value) / this.rate;
        }

        function subscribe(func) {
            this.subscribes.push(func);

            if (this.rate !== null) {
                func();
            }
        }

        Constr.prototype = {
            refresh:          refresh,
            eh:               eh,
            he:               he,
            subscribe:        subscribe,
            setRate:          setRate,
            triggerSubscribes:triggerSubscribes
        };

        return Constr;
    })();

})();
