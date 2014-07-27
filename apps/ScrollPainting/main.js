/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    var timestamp;

    $.fn.scrollPainting = function () {
        return this.each(function () {
            var $this = $(this);
            $this.on('mousewheel', function (event, delta) {
                console.log(delta)
                $this.scrollLeft($this.scrollLeft() - delta);
                event.preventDefault();
            });
        });
    };

    $('.scroll-painting').scrollPainting();

});