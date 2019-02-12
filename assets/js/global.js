/* global $ */

// Initialize tooltips
$('[data-toggle="tooltip"]').tooltip();

// Initialize "refine" - jquery/custom/refine.js
$(".refine").refine();

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

$("input[type='date']").flatpickr({
	enableCalendar: false,
	enableTime: true,
	altInput: true,
	altFormat: "F j, Y",
	dateFormat: "Y-m-d",
});
