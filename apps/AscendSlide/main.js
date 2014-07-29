/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {

    function AscendSlide($this) {
        this.init($this, {
            duration: 800,
            scrollEase: 'cubic-bezier(.82, 0, .42, 1)'
        });
    }

    AscendSlide.prototype.init = function ($this, opt) {
        var self = this;

        this.opt = opt;
        this.wrap = $this;
        this.scollView = $('.ascend-slide-scroll', this.wrap);
        this.pagesWrap = $('.ascend-slide-pages', this.wrap);
        this.pages = $('.ascend-slide-page', this.wrap);

        this.currentIndex = 0;

        this.appendClicker();
        this.setPagesHeight();

        this.onClickerEvent();
        this.onWindowEvent();
        this.onWrapEvent();

        this.scollView.on('wheel', function (event) {
            var delta = event.deltaY;

            if (Math.abs(delta) > 30) {
                var index = delta < 0 ? self.currentIndex - 1 : self.currentIndex + 1;

                self.scrollTo(index, self.opt.duration);
                event.preventDefault();
            }
        });
    };

    AscendSlide.prototype.setPagesHeight = function () {
        this.pagesHeight = this.wrap.height();
        this.pages.height(this.pagesHeight);
        this.scrollTo(this.currentIndex, 0);
    };

    AscendSlide.prototype.appendClicker = function () {
        var self = this;

        this.clickerList = $();
        this.pages.each(function (index, page) {
            self.clickerList = self.clickerList.add(self.clicker($(page).attr('data-text')));
        });

        this.pages.eq(this.currentIndex).addClass('current');
        this.clickerList.eq(this.currentIndex).addClass('current');

        this.clicker = $('<div class="ascend-slide-clicker">').append($('<ul/>').append(this.clickerList));
        this.wrap.append(this.clicker);

        this.clicker.css('margin-top', '-' + (this.clicker.height() / 2) + 'px');
    };

    AscendSlide.prototype.onClickerEvent = function () {
        var self = this;

        this.clickerList.on('click', function (event) {
            self.scrollTo($(event.currentTarget).index(), self.opt.duration);
        });
    };

    AscendSlide.prototype.onWindowEvent = function () {
        var self = this;

        $(window)
            .on('keydown', function (event) {
                switch (event.keyCode) {
                    case 38:
                        self.scrollTo(self.currentIndex - 1, self.opt.duration);
                        break;
                    case 40:
                        self.scrollTo(self.currentIndex + 1, self.opt.duration);
                        break;
                }
            })
            .on('resize', function () {
                self.setPagesHeight();
            });

        $('body').on('mousewheel', function (event) {
            event.preventDefault();
        });
    };

    AscendSlide.prototype.onWrapEvent = function () {
        var self = this;

        if ($.isTouchCapable() || 1) {
            this.wrap
                .on('swipeup', function () {
                    self.scrollTo(self.currentIndex + 1, self.opt.duration);
                })
                .on('swipedown', function () {
                    self.scrollTo(self.currentIndex - 1, self.opt.duration);
                });
        }
    };

    AscendSlide.prototype.clicker = function (text) {
        return $('<li/>').append('<a><span class="dot"/><span class="text">' + text + '</span></a>');
    };

    AscendSlide.prototype.scrollTo = function (index, duration) {
        if (!this.lock) {
            this.lock = true;
            var self = this;

            if (index < 0) {
                index = 0;
            } else if (index > this.pages.length - 1) {
                index = this.pages.length - 1;
            }

            this.pagesWrap.transition({
                y: -index * this.pagesHeight,
                complete: function () {
                    self.lock = false;
                }
            }, duration || 0, this.opt.scrollEase);

            this.setCurrentIndex(index);
        }
    };

    AscendSlide.prototype.setCurrentIndex = function (index) {
        this.pages.eq(this.currentIndex).removeClass('current');
        this.clickerList.eq(this.currentIndex).removeClass('current');
        this.pages.eq(index).addClass('current');
        this.clickerList.eq(index).addClass('current');

        this.currentIndex = index;
    };

    $.fn.ascendSlide = function () {
        return this.each(function () {
            new AscendSlide($(this));
        });
    };

    $('.ascend-slide').ascendSlide();
});