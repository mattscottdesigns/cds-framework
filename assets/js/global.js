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

	return {
		options: options,
	};
})();

var plugins = (function() {
	var init = function() {
		$(".refine").refine();
		$('[data-toggle="tooltip"]').tooltip();
		$("input[type='date']").flatpickr(cds.options.flatpickr);
	};

	var slideout = {
		create: function(options) {
			options.padding = options.padding || 275;
			var slide = new Slideout(options);

			function checkOpen(e) {
				if (slide.isOpen()) {
					e.preventDefault();
					slide.close();
				}
			}

			function addCloseClick() {
				options.panel.addEventListener("click", checkOpen);
			}

			function removeCloseClick() {
				options.panel.removeEventListener("click", checkOpen);
			}

			slide.on("open", addCloseClick);
			slide.on("close", removeCloseClick);

			options.toggle.addEventListener("click", function() {
				slide.toggle();
            });
            
            window.addEventListener("resize", function(){
                slide.close();
            })

			return slide;
		},
		overlap: function(left, right) {
			function showLeft() {
				left.menu.style.visibility = "visible";
				right.menu.style.visibility = "hidden";
			}

			function showRight() {
				left.menu.style.visibility = "hidden";
				right.menu.style.visibility = "visible";
			}

			function showAll() {
				left.menu.style.visibility = "visible";
				right.menu.style.visibility = "visible";
			}

			left.on("beforeopen", showLeft).on("beforeclose", showAll);

			right.on("beforeopen", showRight).on("beforeclose", showAll);

			return [left, right];
		},
	};

	return {
		init: init,
		slideout: slideout,
	};
})();

var ui = (function() {
	var nav = {
		init: function(active) {
			$(".nav:not(.nav-tabs):not(.nav-pills) .nav-link").on(
				"click",
				function() {
					var element = $(this);
					var navigation = element.closest(".nav");
					var collapse = element.closest(".collapse");

					nav
						.removeActive(navigation)
						.handleCollapse(collapse)
						.setActive(element);
				}
			);

			if (active) {
				return this.setActive(active);
			}

			return this;
		},

		setActive: function(element) {
			$(element).addClass("active");

			return this;
		},
        
		removeActive: function(element) {
			$(element)
				.find(".nav-link.active")
				.removeClass("active");

			return this;
		},

		handleCollapse: function(collapse) {
			if ($(collapse).length > 0) {
				$(collapse)
					.prev()
					.addClass("active");
			} else {
				$(".collapse").collapse("hide");
			}

			return this;
		},
	};

	return {
		nav: nav,
	};
})();

ui.nav.init();
