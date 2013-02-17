(function () {
    EH.Charts = (function () {

        var imgUrl = 'http://chart.finance.yahoo.com/z?s=EURHUF%3dX&q=&l=&a=v&z=m&p=s&lang=en-US&region=US',
            times = [
                {
                    id:  '1d',
                    name:'Last Day'
                },
                {
                    id:  '5d',
                    name:'Last week'
                },
                {
                    id:  '1m',
                    name:'Last month'
                },
                {
                    id:  '3m',
                    name:'Last 3 months'
                },
                {
                    id:  '1y',
                    name:'Last 12 months'
                },
                {
                    id:  '2y',
                    name:'Last 2 years'
                }
            ];

        function Constr(parent) {
            this.parent = parent;
        }

        function draw(container) {
            var that = this;

            $.each(times, function (i, e) {
                var myImgUrl = imgUrl + '&t=' + e.id,
                    gcont = $(that.parent);

                $('<h2/>').html(e.name).appendTo(gcont);
                $('<img/>').attr('src', myImgUrl).addClass('img-polaroid').appendTo(gcont);

                gcont.appendTo(container);
            });
        }

        Constr.prototype = {
            draw:draw
        };

        return Constr;
    })();
})();