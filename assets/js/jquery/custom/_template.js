/* global jQuery */
/* eslint no-unused-vars: off */

(function($, window, document, undefined) {
	"use strict";

	var pluginName = "pluginName";
	var defaultState = {};
	var defaultOptions = {};

	function Plugin(element, options) {
		this._name = pluginName;
		this._defaults = defaultOptions;
		this.element = element;
		this.state = defaultState;
		this.settings = $.extend({}, defaultOptions, options);

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
