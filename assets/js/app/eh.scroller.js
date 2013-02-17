(function () {
    EH.Scroller = (function () {

        var tmpl = '<li><span class="quote label label-info"></span> <span class="time"></span></li>';

        function Constr(container) {
            this.container = $(container);
            this.intervalID = null;
            this.intervalTime = 10000;
        }

        function start() {
            var that = this;
            that.refresh();
            that.startAnim();

            this.intervalID = setInterval(function() {
                that.refresh();
                that.startAnim();
            }, this.intervalTime)
        }

        function stop() {
            clearInterval(this.intervalID);
        }

        function startAnim() {
            this.container.stop().find('li:first').remove();
            this.container.css({marginLeft: 0});
            this.container.animate({marginLeft: -188}, this.intervalTime, 'linear');
        }

        function setCalculator(calculator) {
            var that = this;
            this.calculator = calculator;
            this.calculator.subscribe(function() {
                 that.add(that.calculator.rate)
            });
        }

        function refresh() {
            this.calculator.refresh();
        }

        function add(value) {
            var date = new Date,
                hours = date.getHours(),
                minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
                time = hours + ':' + minutes,
                value = $(tmpl).find('.quote').html(value).end().find('.time').html(time).end();

            value.appendTo(this.container);
        }

        Constr.prototype = {
            add: add,
            refresh: refresh,
            setCalculator: setCalculator,
            start: start,
            stop: stop,
            startAnim: startAnim
        };

        return Constr;
    })();
})();