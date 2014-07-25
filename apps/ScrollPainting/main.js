/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    $.fn.scrollPainting = function () {
        return this.each(function () {
            var $this = $(this);
            $this.mousewheel(function (event, delta) {
                $this.scrollLeft($this.scrollLeft() - delta * 100);
                event.preventDefault();
            });
        });
    };

    $('.scroll-painting').scrollPainting();

});