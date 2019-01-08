/* global jQuery */

(function($) {
	"use strict";

	var pluginName = "affix";
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
		init: function() {},
	});

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery);
