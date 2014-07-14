/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {
    function AscendSlide($this) {
        this.init($this);
    }

    AscendSlide.prototype.init = function ($this) {
        var self = this;

        this.ele = $this;
        this.outStack = [];
        this.inStack = [];
        this.lock = false;
        this.lockTime = 800;

        this.pages = this.ele.children('div');

        this.clickerList = $(null);

        var clickerFn = function (event) {
            self.locker(function () {
                self.jump($(event.currentTarget).index());
            });
//
//            if (count !== 0) {
//                var fn = count > 0 ? self.pop : self.push;
//                count = Math.abs(count);
//
//                for (var i = 0; i < count; ++i) {
//                    fn.apply(self);
//                }
//            }
        };

        this.pages.addClass('ascend-slide-page')
            .each(function (index, ele) {

                var $ele = $(ele),
                    clicker = $('<li/>')
                        .append('<a><span class="dot"/><span class="text">' + $ele.attr('data-text') + '</span></a>')
                        .on('click', clickerFn);

                if (index === self.pages.length - 1) {
                    clicker.addClass('current');
                    $ele.addClass('current');
                }
                self.clickerList = clicker.add(self.clickerList);
                self.inStack.push({
                    clicker: clicker,
                    page: $ele
                });
            });

        this.clicker = $('<div class="ascend-slide-clicker"/>').append($('<ul/>').append(this.clickerList));
        this.ele.append(this.clicker);
        this.clicker.css('margin-top', '-' + (this.clicker.height() / 2) + 'px');

        this.ele.on('mousewheel', function (event) {
            self.locker(function () {
                if (event.deltaY === 1) {
                    self.push();
                } else {
                    self.pop();
                }
            });
        });

        $(window).on('keydown', function (event) {
            self.locker(function () {
                switch (event.keyCode) {
                    case 38:
                        self.push();
                        break;
                    case 40:
                        self.pop();
                        break;
                }
            });
        });
    };

    AscendSlide.prototype.pop = function () {
        if (this.inStack.length > 1) {

            var ascend = this.inStack.pop();
            ascend.page.addClass('ascend').removeClass('current');
            ascend.clicker.removeClass('current');

            var current = this.inStack[this.inStack.length - 1];
            current.page.addClass('current');
            current.clicker.addClass('current');

            this.outStack.push(ascend);
        }
    };

    AscendSlide.prototype.push = function () {
        if (this.outStack.length) {

            var current = this.outStack.pop();
            current.page.removeClass('ascend').addClass('current');
            current.clicker.addClass('current');

            var ascend = this.inStack[this.inStack.length - 1];
            ascend.page.removeClass('current');
            ascend.clicker.removeClass('current');

            this.inStack.push(current);
        }
    };

    AscendSlide.prototype.jump = function (index) {
        var self = this,
            count = index - self.outStack.length;
        if (count !== 0) {
            if (Math.abs(count) === 1) {
                count > 0 ? self.pop() : self.push();
            } else if (0) {

            }
        }
    };

    AscendSlide.prototype.locker = function (fn) {
        var self = this;
        if (!this.lock) {
            this.lock = true;
            setTimeout(function () {
                self.lock = false;
            }, this.lockTime);
            fn();
        }
    };

    $.fn.ascendSlide = function () {
        return this.each(function () {
            new AscendSlide($(this));
        });
    };

    $('.ascend-slide').ascendSlide();
});