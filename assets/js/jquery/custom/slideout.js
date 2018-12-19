(function () {
    $.fn.slideout = function (options) {
        'use strict';

        var element = this;
        var body = $("body");
        var defaultState = {
            "open": false,
        };
        var defaultOptions = {
            "direction": "left",
            "push": false,
            "panel": $(".slideout-panel"),
            "width": 250,
        };

        var Slideout = function (options) {
            options = options || {};

            this.defaults = defaultOptions;
            this.state = defaultState;
            this.settings = $.extend(defaultOptions, options);
            this.element = element.addClass("slideout-element");
            this.panel = this.settings.panel.addClass("slideout-panel");

            this.render();
        };

        Slideout.prototype = {

            open: function () {
                this.state.open = true;
                return this.render();
            },

            close: function () {
                this.state.open = false;
                return this.render();
            },

            toggle: function () {
                this.state.open = !this.state.open;
                return this.render();
            },

            render: function (nextState) {

                var state = nextState || this.state;
                var settings = this.settings;
                var element = this.element;
                var panel = this.panel;

                var open = state.open;
                var push = settings.push;
                var content = settings.content;
                var direction = settings.direction;
                var width = settings.width;
                var renderer = {};


                renderer.init = function () {
                    body.addClass("slideout");
                    element.css({
                        "width": settings.width
                    });
                    return this
                }

                renderer.handleOpen = function () {
                    if (open) {
                        body.addClass("slideout-active");
                        element.css({
                            [direction]: 0
                        })
                    } else {
                        body.removeClass("slideout-active");
                        element.css({
                            [direction]: -width
                        })
                    }
                    return this
                }

                renderer.handlePush = function () {
                    if (push && open) {
                        panel.css({
                            [direction]: width
                        })
                    } else {
                        panel.css({
                            [direction]: 0
                        });
                    }
                    return this
                }

                renderer.handleContent = function () {
                    if (content && open) {
                        element.html(content)
                    }
                    return this
                }

                renderer.init()
                    .handleOpen()
                    .handlePush()
                    .handleContent();

                return this;
            },

        }

        return new Slideout(options);
    }
})();
