/* global jQuery */

(function($) {
	"use strict";

	var pluginName = "refine";
	var defaultState = {};
	var defaultOptions = {};

	function Plugin(element, options) {
		options = options || {};
		this.element = element;
		this.settings = $.extend({}, defaultOptions, options);
		this._defaults = defaultOptions;
		this._name = pluginName;
		this.state = defaultState;

		this.source = $(element);
		this.targets = options.targets || $("[data-refine]");

		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function() {
			var targets = this.targets;
			var source = this.source;

			source.on("change keyup", function(e) {
				var value = e.target.value;

				var matches = targets.filter(function(index, el) {
					var data = $(el).data("refine");
					return data.indexOf(value) === -1;
				});

				targets.show();
				matches.hide();
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
})(jQuery);
