/* global jQuery */

(function($, window) {
	"use strict";

	var pluginName = "pluginName";
	var defaultState = {};
	var defaultOptions = {};

	function Plugin(element, options) {
		this._name = pluginName;
		this._defaults = defaultOptions;
		this.element = element;
		this.settings = $.extend({}, defaultOptions, options);
		this.state = defaultState;

		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function() {
			var check = 0;
			$(window).on("scroll", function() {
				window.scrollY > check
					? console.log("down", window.scrollY)
					: console.log("up", window.scrollY);
				check = window.scrollY;
			});
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
