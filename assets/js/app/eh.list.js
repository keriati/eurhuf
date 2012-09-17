(function () {
    EH.List = (function () {

        function Constr(container, type, values) {
            var that = this;

            this.container = null;
            this.type = type;
            this.container = $(container);
            this.calculator = null;
            this.table = null;

            this.list = values || [1];

            $(document).on('EH/Refresh', function () {
                that.draw();
            });
        }

        function setCalculator(calculator) {
            var that = this;

            this.calculator = calculator;

            this.calculator.subscribe(function () {
                that.draw();
            });

            switch (this.type) {
                case 'he':
                    this.typecalc = this.calculator.he;
                    break;
                default:
                    this.typecalc = this.calculator.eh;
            }
        }

        function draw() {
            if (this.calculator === null) {
                return false;
            }

            if(this.table !== null) {
                this.table.remove();
            }

            var listContainer = $('<div class="span3"><table><thead><tr><th>EUR</th><th>HUF</th></tr></thead><tbody></tbody></table></div>'),
                classes = 'table table-striped table-bordered table-hover table-condensed',
                that = this;

            listContainer.find('table').addClass(classes);

            $.each(this.list, function (i, e) {
                var money = EH.prettyFormat(that.typecalc.apply(that.calculator, [e]), 'huf');

                $('<tr><td>' + EH.prettyFormat(e, 'eur') + '</td><td>' + money + '</td></tr>').appendTo(listContainer.find('tbody'));
            });

            this.table = listContainer;

            listContainer.appendTo(this.container);
        }

        Constr.prototype = {
            draw:         draw,
            setCalculator:setCalculator
        };

        return Constr;
    })();
})();