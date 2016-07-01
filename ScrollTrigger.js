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
	"use strict";
	
	var ScrollTrigger = function() {
		// the element to detect the scroll in
		this.scrollElement = window;
		
		// the element to get the data-scroll elements from
		this.bindElement = document.body; 
		
		
		// the elements with the data-scroll attribute
		var triggers = [];
		
		// attached callbacks for the requestAnimationFrame loop,
		// this is handy for custom scroll based animation. So you
		// don't have multiple, unnecessary loops going.
		var attached = [];

		// the loop method to use, preferred window.requestAnimationFrame
		var loop = window.requestAnimationFrame;


		/**
		 * Initializes the scrollTrigger
		 */
		this.init = function(_this) {
			return function(bindTo, scrollIn) {
				// check if bindTo is not undefined or null,
				// otherwise use the document.body
				if (bindTo != undefined && bindTo != null) {
					_this.bindElement = bindTo;
				} else {
					_this.bindElement = document.body;
				}
				
				// check if the scrollIn is not undefined or null,
				// otherwise use the window
				if (scrollIn != undefined && scrollIn != null) {
					_this.scrollElement = scrollIn;
				} else {
					_this.scrollElement = window;
				}
				
				// get all trigger elements, e.g. all elements with
				// the data-scroll attribute
				triggers = _this.bindElement.querySelectorAll("[data-scroll]");

				// check what requestAnimationFrame to use, and if
				// it's not supported, use the onscroll event
				loop = window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					_this.scrollElement.onscroll; // old school browser support

				update();

				return _this;
			};
		}(this);


		/**
		 * Attaches a callback every time the update method is called
		 */
		this.attach = function(_this) {
			return function(callback) {
				attached.push(callback);

				return _this;
			};
		}(this);

		
		// store _this for use in the update function scope (strict)
		var _this = this;
		
		
		/**
		 * Gets called everytime the browser is ready for it, or when the user
		 * scrolls (on legacy browsers)
		 */
		function update() {
			var windowHeight = _this.scrollElement.innerHeight;
			
			// loop through all triggers
			for (var i = 0; i <  triggers.length; i++) {
				var trigger = triggers[i];
				var triggerTop = trigger.getBoundingClientRect().top;
				
				// parse the options given in the data-scroll attribute,
				// if any.
				var options = trigger.getAttribute('data-scroll').split(' ');
				var yOffset = parseInt(options[0] != undefined ? options[0] : 0);
				var visibleClass = options[1] != undefined ? options[1] : 'visible';
				var hiddenClass = options[2] != undefined ? options[2] : 'invisible';
				var addHeight = options[3] != undefined ? (options[3] == 'true') : false;
				
				// if the add height (last parameter) is true, we add the
				// full height of the element to the top position, so the
				// visibleClass is only added after the element is completely
				// in the viewport
				if (addHeight) {
					triggerTop += trigger.offsetHeight;
				}
				
				// add the yOffset
				triggerTop += yOffset;
				
				// toggle the classes
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
			
			// call the attached callbacks, if any
			for (var n = 0; n < attached.length; n++) {
				var callback = attached[n];

				callback.call(_this, windowHeight, _this.bindElement.scrollTop);
			}
			
			// and loop again
			loop(update);
		}
	};
	
	
	// add an instance of the ScrollTrigger to the window
	// for use in public/window scope.
	window.ScrollTrigger = new ScrollTrigger();
})();
