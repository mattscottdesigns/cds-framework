/* global jQuery */

(function($, window, document, undefined) {
	"use strict";

	var pluginName = "pluginName";
	var defaultState = {};
	var defaultOptions = {};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaultOptions, options);
		this._defaults = defaultOptions;
		this._name = pluginName;
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
})(jQuery, window, document);
