/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    var timestamp;

    $.fn.scrollPainting = function () {
        return this.each(function () {
            var $this = $(this);
            $this.on('wheel', function (event) {
                $this.scrollLeft($this.scrollLeft() + event.deltaY);
                event.preventDefault();
            });
        });
    };

    $('.scroll-painting').scrollPainting();

});