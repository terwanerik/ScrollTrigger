/**
 * Written by Erik Terwan on 23/06/16.
 *
 * Erik Terwan - development + design
 * https://erikterwan.com
 * https://github.com/terwanerik
 *
 * MIT license.
 */
(function(){
	var ScrollTrigger = function() {
		this.scrollElement = window;
		this.bindElement = document.body;
		this.triggers = [];

		var scroll = window.requestAnimationFrame;

		this.init = function(_this) {
			return function(bindTo, scrollIn) {
				if (bindTo) {
					_this.bindElement = bindTo;
				}

				if (scrollIn) {
					_this.scrollElement = scrollIn;
				}

				_this.triggers = _this.bindElement.querySelectorAll("[data-scroll]");

				scroll = window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					_this.scrollElement.onscroll; // old school browser support

				didScroll();
			};
		}(this);

		var _this = this;

		function didScroll() {
			var windowHeight = _this.scrollElement.innerHeight;

			for (var i = 0; i <  _this.triggers.length; i++) {
				var trigger = _this.triggers[i];
				var triggerTop = trigger.getBoundingClientRect().top;

				var options = trigger.getAttribute('data-scroll').split(' ');
				var yOffset = parseInt(options[0] != undefined ? options[0] : 0);
				var visibleClass = options[1] != undefined ? options[1] : 'visible';
				var hiddenClass = options[2] != undefined ? options[2] : 'invisible';
				var addHeight = options[3] != undefined ? (options[3] == 'true') : false;

				if (addHeight) {
					triggerTop += trigger.offsetHeight;
				}

				triggerTop += yOffset;

				if (triggerTop < windowHeight && triggerTop > 0) {
					if (!trigger.classList.contains(visibleClass)) {
						trigger.classList.add(visibleClass);
					}

					if (trigger.classList.contains(hiddenClass)) {
						trigger.classList.remove(hiddenClass);
					}
				} else {
					if (!trigger.classList.contains(hiddenClass)) {
						trigger.classList.add(hiddenClass);
					}

					if (trigger.classList.contains(visibleClass)) {
						trigger.classList.remove(visibleClass);
					}
				}
			}

			scroll(didScroll);
		}
	};

	window.ScrollTrigger = new ScrollTrigger();
})();
