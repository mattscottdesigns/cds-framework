/* global $, Slideout */
/* eslint-disable no-unused-vars */

var cds = (function() {
	var options = {
		flatpickr: {
			enableCalendar: false,
			enableTime: true,
			altInput: true,
			altFormat: "F j, Y",
			dateFormat: "Y-m-d",
		},
	};

	return Object.freeze({
		options: options,
	});
})();

var plugins = (function() {
	var slideout = Object.freeze({
		create: function(options) {
			options.padding = options.padding || 275;

			var element = new Slideout(options);

			element.options = options;

			function checkOpen(e) {
				if (element.isOpen()) {
					e.preventDefault();
					element.close();
				}
			}

			function addClick() {
				options.panel.addEventListener("click", checkOpen);
			}

			function removeClick() {
				options.panel.removeEventListener("click", checkOpen);
			}

			element.on("open", addClick);
			element.on("close", removeClick);

			options.toggle.addEventListener("click", function() {
				element.toggle();
			});

			return element;
		},
		overlap: function(primary, secondary) {
			function showPrimary() {
				primary.menu.style.visibility = "visible";
				secondary.menu.style.visibility = "hidden";
			}

			function showSecondary() {
				primary.menu.style.visibility = "hidden";
				secondary.menu.style.visibility = "visible";
			}

			function showAll() {
				primary.menu.style.visibility = "visible";
				secondary.menu.style.visibility = "visible";
			}

			primary
				.on("open", showPrimary)
				.on("beforeclose", showAll);

			secondary
				.on("open", showSecondary)
				.on("beforeclose", showAll);

			return [primary, secondary];
		},
	});

	return Object.freeze({
		slideout: slideout,
	});
})();

$(".nav:not(.nav-tabs):not(.nav-pills) .nav-link").on("click", function() {
	var element = $(this);
	var nav = element.closest(".nav");
	var collapse = element.closest(".collapse");

	var methods = {
		setActive: function() {
			element.addClass("active");

			if (collapse.length > 0) {
				collapse.prev().addClass("active");
			} else {
				$(".collapse").collapse("hide");
			}
			return this;
		},

		removeActive: function() {
			nav.find(".nav-link.active").removeClass("active");

			return this;
		},
	};

	methods.removeActive().setActive();
});

$(".refine").refine();
$('[data-toggle="tooltip"]').tooltip();
$("input[type='date']").flatpickr(cds.options.flatpickr);
