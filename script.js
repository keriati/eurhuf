(function () {

    // EH pls
    var EH = {};

    EH.Calculator = (function () {

        var query = 'select * from yahoo.finance.xchange where pair in ("EURHUF")';

        function Constr() {
            this.rate = null;
            this.subscribes = [];
            this.refresh();
        }

        function refresh() {
            var q = EH.YQL(query),
                that = this;

            q.success(function (data) {
                that.rate = parseInt(data.query.results.rate.Rate, 10);

                $(document).trigger('EH/Refresh', that);

                $.each(that.subscribes, function (i, e) {
                    if (typeof(e) === 'function') {
                        e();
                    }
                });
            });
        }

        function eh(value, rate) {
            if(rate) {
                return parseInt(value, 10) * parseInt(rate, 10);
            }
            return parseInt(value, 10) * this.rate;
        }

        function he(value, rate) {
            if(rate) {
                return parseInt(value, 10) / parseInt(rate, 10);
            }
            return value / this.rate;
        }

        function subscribe(func) {
            this.subscribes.push(func);

            if(this.rate !== null) {
                func();
            }
        }

        Constr.prototype = {
            refresh:  refresh,
            eh:       eh,
            he:       he,
            subscribe:subscribe
        };

        return Constr;
    })();

    EH.Charts = (function () {

        var times = ['1d', '5d', '1m', '3m', '1y', '2y'],
            imgUrl = 'http://chart.finance.yahoo.com/z?s=EURHUF%3dX&q=&l=&a=v&z=m&p=s&lang=de-DE&region=DE';

        function Constr() {

        }

        function draw(container) {

            $.each(times, function (i, e) {
                var myImgUrl = imgUrl + '&t=' + e,
                    gcont = $('<div></div>').addClass('half');

                $('<h2/>').html(e).appendTo(gcont);
                $('<img/>').attr('src', myImgUrl).appendTo(gcont);

                gcont.appendTo(container);
            });
        }

        Constr.prototype = {
            draw:draw
        };

        return Constr;
    })();

    EH.List = (function () {

        function Constr(container, type, values) {
            var that = this,
                list = [10, 20, 30, 40, 50, 100, 200, 300, 500, 800, 1000, 1100, 1500];

            this.container = null;
            this.type = type;
            this.container = $(container);
            this.calculator = new EH.Calculator();

            this.list = values || list;

            switch (type) {
                case 'he':
                    this.typecalc = this.calculator.he;
                    break;
                default:
                    this.typecalc = this.calculator.eh;
            }

            $(document).on('EH/Refresh', function () {
                that.draw();
            });
        }

        function draw() {
            var listContainer = $('<ul></ul>'),
                that = this;

            this.container.empty();

            $.each(this.list, function (i, e) {
                $('<li>' + e + ' -> ' + that.typecalc.apply(that.calculator, [e]) + '</li>').appendTo(listContainer);
            });

            listContainer.appendTo(this.container);
        }

        Constr.prototype = {
            draw:draw
        };

        return Constr;
    })();

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

    window.EH = EH;
})();