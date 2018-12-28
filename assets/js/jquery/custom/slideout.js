;(function(){
    $.fn.slideout = function (options) {
        'use strict';

        var defaultState = {
            "open": false,
        };
        
        var defaultOptions = {
            "content": $(".slideout-content"),
            "direction": "left",
            "push": false,
            "width": 260,
        };
    
        var Slideout = function (element, options) {
            options = options || {};
            this.defaults = defaultOptions;
            this.state = defaultState;
            this.settings = $.extend(defaultOptions, options);
            this.slideout = element.addClass("slideout-slide");
            this.content = this.settings.content.addClass("slideout-content");
    
            return this.init();
        };
    
        $.extend(Slideout.prototype, {
    
            init: function() {

                this.close = this.close.bind(this);
                this.hide = this.hide.bind(this);
                this.toggle = this.toggle.bind(this);

                $(window).on("resize", this.close);
                $(window).on("click", this.hide);
                
                if(this.settings.toggle){
                    $(this.settings.toggle).on("click", this.toggle);
                }

                return this.render();
            },
    
            hide: function(e){
                var target = $(e.target);
                if (target.closest(this.slideout).length == 0 && target.closest(this.settings.toggle).length == 0) {
                    this.close();
                }
    
                return this
            },
    
            open: function() {
                this.state.open = true;
                return this.render();
            },
    
            close: function() {
                this.state.open = false;
                return this.render();
            },
    
            toggle: function() {
                this.state.open = !this.state.open;
                return this.render();
            },
    
            render: function() {
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
    
                styles.slideout.width = width;

                this.slideout.css(styles.slideout);
                this.content.css(styles.content);
    
                return this;
            },
    
        });
        
        return new Slideout(this, options);
    }
})()
