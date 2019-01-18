/* global jQuery */

(function($, window) {
	"use strict";

    var pluginName = "slideout";
    
	var defaultOptions = {
		content: $(".slideout-content"),
        direction: "left",
        open: false,
        width: 275,
        breakpoint: 768,
        responsive: false
	};

	function Plugin(element, options) {
		this._name = pluginName;
		this._defaults = defaultOptions;
		this.element = element;
		this.settings = $.extend({}, defaultOptions, options);

		this.settings = $.extend(defaultOptions, options);
		this.slideout = $(element).addClass("slideout-slide");
        this.content = this.settings.content.addClass("slideout-content");
        
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function() {
            var settings= this.settings;
			var close = this.close.bind(this);
			var hide = this.hide.bind(this);
            var toggle  = this.toggle.bind(this);
            var open = this.open.bind(this);

            if(settings.responsive && $(window).width() > settings.breakpoint){
                open();
            }else{
                close();
            }

            $(window).on("resize", function(){
                if(settings.responsive && $(window).width() < settings.breakpoint){
                    close();
                }
            })

            $(window).on("click", function(e){
                if($(window).width() < settings.breakpoint){
                    hide(e);
                }
            });

            if(settings.toggle){
                settings.toggle.on("click", function(){
                    toggle();
                })
            }
            
			this.render();
		},

		hide: function(e) {
			var target = $(e.target);
			if (
				target.closest(this.slideout).length === 0 &&
				target.closest(this.settings.toggle).length === 0
			) {
				this.close();
			}

			return this;
		},

		open: function() {
			this.settings.open = true;
			return this.render();
		},

		close: function() {
            this.settings.open = false;
			return this.render();
		},

		toggle: function() {
			this.settings.open = !this.settings.open;
			return this.render();
		},

		render: function() {
			var settings = this.settings;
			var width = settings.width;
			var styles = {
				slideout: {},
				content: {},
            };

            if( settings.open ){
                styles.slideout.marginLeft = 0;
                styles.content.marginLeft = width;
            }else{
                styles.slideout.marginLeft = -width;
                styles.content.marginLeft = 0;
            }

            if( settings.open && $(window).width() < settings.breakpoint ){
                styles.content.marginRight = -width;
            }

            if( settings.open && $(window).width() > settings.breakpoint ){
                styles.content.marginRight = 0;
            }

			this.slideout.css(styles.slideout);
			this.content.css(styles.content);

			return this;
		},
	});

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery, window);
