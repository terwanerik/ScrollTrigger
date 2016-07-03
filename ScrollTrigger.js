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
		
		// the previous scrollTop position, to determine if a user
		// is scrolling up or down
		var previousScroll = {
			left: 0,
			top: 0
		};

		// the loop method to use, preferred window.requestAnimationFrame
		var loop = window.requestAnimationFrame;
		
		// if the requestAnimationFrame is looping
		var isLooping = true;


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
				// the data-scroll attribute and turn it from a NodeList
				// into a plain old array
				triggers = [].slice.call(_this.bindElement.querySelectorAll("[data-scroll]"));

				// check what requestAnimationFrame to use, and if
				// it's not supported, use the onscroll event
				loop = window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					_this.scrollElement.onscroll; // old school browser support
				
				// set the current scroll positions
				previousScroll.left = _this.bindElement.scrollLeft;
				previousScroll.top = _this.bindElement.scrollTop;
				
				if (triggers.length > 0) {
					isLooping = true;
					
					// start the update loop
					update();
				} else {
					isLooping = false;
				}
				
				// return 'this' for chaining
				return _this;
			};
		}(this);


		/**
		 * Attaches a callback that get's called every time 
		 * the update method is called
		 */
		this.attach = function(_this) {
			return function(callback) {
				// add callback to array
				attached.push(callback);
				
				if (!isLooping) {
					isLooping = true;
					
					// start the update loop
					update();
				}
				
				// return 'this' for chaining
				return _this;
			};
		}(this);
	
	
		/**
		 * Detaches a callback
		 */
		this.detach = function(_this) {
			return function(callback) {
				// remove callback from array
				attached.splice(attached.indexOf(callback), 1);
				
				// return 'this' for chaining
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
			var windowWidth = _this.scrollElement.innerWidth;
			var windowHeight = _this.scrollElement.innerHeight;
			var currentTop = _this.bindElement.scrollTop;
			var currentLeft = _this.bindElement.scrollLeft;
			
			// loop through all triggers
			for (var i = 0; i <  triggers.length; i++) {
				var trigger = triggers[i];
				var triggerTop = trigger.getBoundingClientRect().top;
				var triggerLeft = trigger.getBoundingClientRect().left;
				
				// parse the options given in the data-scroll attribute, if any
				var optionString = trigger.getAttribute('data-scroll');
				var callString = trigger.getAttribute('data-scrollCall');
				var visibleClass = 'visible';
				var hiddenClass = 'invisible';
				var xOffset = 0;
				var yOffset = 0;
				
				// split the options on the toggle() parameter
				var classParts = optionString.split('toggle(');
				if (classParts.length > 1) {
					// the toggle() parameter was given, split it at ) to get the
					// content inside the parentheses, then split them on the comma
					var classes = classParts[1].split(')')[0].split(',');
					
					// trim and remove the dot
					visibleClass = classes[0].trim().replace('.', '');
					hiddenClass = classes[1].trim().replace('.', '');
				}
				
				// split the options on the offset() parameter
				var offsetParts = optionString.split('offset(');
				if (offsetParts.length > 1) {
					// the offset() parameter was given, split it at ) to get the
					// content inside the parentheses, then split them on the comma
					var offsets = offsetParts[1].split(')')[0].split(',');
					
					// remove the px unit and parse as integer
					xOffset = parseInt(offsets[0].replace('px', ''));
					yOffset = parseInt(offsets[1].replace('px', ''));
				}
				
				// parse the boolean options
				var addWidth = optionString.indexOf("addWidth") > -1;
				var addHeight = optionString.indexOf("addHeight") > -1;
				var once = optionString.indexOf("once") > -1;
				
				// add the full width of the element to the left position, so the
				// visibleClass is only added after the element is completely
				// in the viewport
				if (addWidth) {
					triggerLeft += trigger.offsetWidth;
				}
				
				// add the full height of the element to the top position, so the
				// visibleClass is only added after the element is completely
				// in the viewport
				if (addHeight) {
					triggerTop += trigger.offsetHeight;
				}
				
				if (previousScroll.left > currentLeft) {
					// scrolling left, so we subtract the xOffset
					triggerLeft -= xOffset;
				} else if (previousScroll.left < currentLeft) {
					// scrolling right or not scrolling at all
					// then we add the xOffset
					triggerLeft += xOffset;
				}
				
				if (previousScroll.top > currentTop) {
					// scrolling up, so we subtract the yOffset
					triggerTop -= yOffset;
				} else if (previousScroll.top < currentTop){
					// scrolling down or not scrolling at all
					// then we add the yOffset
					triggerTop += yOffset;
				}
								
				// toggle the classes
				if (triggerLeft < windowWidth && triggerLeft > 0 && 
						triggerTop < windowHeight && triggerTop > 0) {
					// the element is visible
					if (!trigger.classList.contains(visibleClass)) {
						trigger.classList.add(visibleClass);
						
						if (callString) {
							functionCall(trigger, callString);
						}
					}

					if (trigger.classList.contains(hiddenClass)) {
						trigger.classList.remove(hiddenClass);
					}
					
					if (once) {
						// remove trigger from triggers array
						triggers.splice(i, 1);
					}
				} else {
					// the element is invisible
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
			
			// save the current scroll position
			previousScroll.left = currentLeft;
			previousScroll.top = currentTop;
			
			if (triggers.length > 0 || attached.length > 0) {
				isLooping = true;
				
				// and loop again
				loop(update);
			} else {
				isLooping = false;
			}
		}
		
		function functionCall(trigger, functionAsString) {
			var params = functionAsString.split('(');
			var method = params[0];
			
			if (params.length > 1) {
				params = params[1].split(')')[0]; // get the value between the parentheses
			} else {
				params = undefined;
			}
			
			if (window[method]) {
				// function exists in the global window scope
				// so let's call it
				window[method].call(trigger, params);
			}
		}
	}
	
	// add an instance of the ScrollTrigger to the window
	// for use in public/window scope.
	window.ScrollTrigger = new ScrollTrigger();
})();

window.counter = function() {
	// this refers to the html element with the data-scrollCall tag
	var span = this.querySelector('span');
	var current = parseInt(span.textContent);
	
	span.textContent = current + 1;
};