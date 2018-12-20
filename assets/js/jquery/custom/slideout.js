$.fn.slideout = function (options) {
    'use strict';

    var slideout = this;
    var defaultState = {
        "open": false,
    };
    var defaultOptions = {
        "content": $(".slideout-content"),
        "direction": "left",
        "push": false,
        "width": 260,
    };

    var Slideout = function (options) {
        options = options || {};

        this.defaults = defaultOptions;
        this.state = defaultState;
        this.settings = $.extend(defaultOptions, options);
        this.slideout = slideout.addClass("slideout-slide");
        this.content = this.settings.content.addClass("slideout-content");

        this.init();
    };

    Slideout.prototype = {

        init: function () {
            if(this.settings.toggle){
                $(this.settings.toggle).on("click", this.toggle.bind(this));
            }

            this.slideout.css({ "width": this.settings.width });

            $(window).on("resize", this.close.bind(this));
            $(window).on("click", this.hide.bind(this));

            return this.render();
        },

        hide: function(e){
            var target = $(e.target);
            if (target.closest(this.slideout).length == 0 && target.closest(this.settings.toggle).length == 0) {
                this.close();
            }

            return this
        },

        open: function () {
            this.state.open = true;
            this.render();
        },

        close: function () {
            this.state.open = false;
            this.render();
        },

        toggle: function () {
            this.state.open = !this.state.open;
            this.render();
        },

        render: function () {
            var state = this.state;
            var settings = this.settings;
            var open = state.open;
            var push = settings.push;
            var direction = settings.direction;
            var width = settings.width;
            var styles = {
                "slideout": {},
                "content": {},
            }

            open
                ? styles.slideout[direction] = 0
                : styles.slideout[direction] = -width;

            push && open 
                ? styles.content[direction] = width 
                : styles.content[direction] = 0;

            this.slideout.css(styles.slideout);
            this.content.css(styles.content);

            return this;
        },

    }

    return new Slideout(options);
}
