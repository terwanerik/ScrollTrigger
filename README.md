# ScrollTrigger
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
![Issues](https://img.shields.io/github/issues/terwanerik/ScrollTrigger.svg)
[![GitHub release](https://img.shields.io/github/release/terwanerik/ScrollTrigger.svg?maxAge=2592000)]()
[![Bower](https://img.shields.io/bower/v/ScrollTrigger.svg?maxAge=2592000)]()
[![npm version](https://badge.fury.io/js/scrolltrigger-classes.svg)](https://www.npmjs.com/package/scrolltrigger-classes)

Triggers classes on html elements based on the scroll position. It makes use of requestAnimationFrame so it doesn't jack the users scroll, that way the user / browser keeps their original scroll behaviour. Animations run when the browser is ready for it.

## How to use?
It's quite simple, just add the `ScrollTrigger.min.js` file to your HTML page. Then call `ScrollTrigger.init()` when the page has loaded. Like so:

```html
<script src="ScrollTrigger.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function(){
	ScrollTrigger.init();
});
</script>
```

The init call takes 2 parameters, the `bindTo` and `scrollIn` parameters. These are optional.

The `bindTo` parameter is the HTML element where the triggers should be fetched from, this usually is `document.body` but could specify to a certain element.

The `scrollIn` parameter is the element to get the scroll position from, by default this is `window`, but it could be a scrolling div etc.

Now add the `data-scroll` attribute to the HTML element you want to animate:

```html
<div data-scroll></div>
```

When you scroll the page, and the element is visible in the viewport, it will add the `visible` class. If it's out of the viewport the `invisible` class is added. Now you can define those classes in your css file and add animations to them, like so:

```css
.invisible {
	transition: opacity 0.5s ease;
	opacity: 0.0;
}

.visible {
	transition: opacity 0.5s ease;
	opacity: 1.0;
}
```

Now when you scroll the page, the elements that 'come in' to the viewport fade in. A really basic example.

### Options
The `data-scroll` attribute can take a couple of options, in contrast to v0.1, the position of the options are not strict. So place them anywhere inside the `data-scroll` tag.

| Name      | Type        | Description                                                                                                                                                                          | Example                                                                                                                                                                                                        |
|-----------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| trigger() | CSS Classes | These are the classes that ScrollTrigger triggers, a replacement for the default `visible` and `invisible` classes. It takes 2 required parameters, the visible and invisible class. | `data-scroll="trigger(.animateIn, .animateOut)"` The `.` is not required, so `data-scroll="trigger(animateIn, animateOut)"` is also valid, just a bit less legible.                                            |
| offset()  | Pixels      | This is a custom offset you can add to the element, this is nice for tuning animations. It takes 2 required parameters, the x and y offset.                                          | `data-scroll="offset(0,50px)"` for a 50px y offset.`data-scroll="offset(-50px,0)"` for a -50px x offset.The px value is not required, so `data-scroll="offset(-50,0)"` is also valid, just a bit less legible. |
| addWidth  | Boolean     | This adds the offsetWidth of the element to the offset, so the `visible` class is only added when the element is completely in the viewport.                                         | `data-scroll="addWidth"`                                                                                                                                                                                       |
| addHeight | Boolean     | This adds the offsetHeight of the element to the offset, so the `visible` class is only added when the element is completely in the viewport.                                        | `data-scroll="addHeight"`                                                                                                                                                                                      |
| once      | Boolean     | This makes sure the animation only runs once, if you add a callback that will also only run once.                                                                                    | `data-scroll="once"`                                                                                                                                                                                           |

For advanced examples on how to use the options, check out the `example` folder. Especially the `horizontal.html` file.

### Callbacks
You can add callbacks to the show and hide events, e.g. when an element comes into the viewport and when it goes out. You do this by adding the `data-scroll-showCallback` and / or the `data-scroll-hideCallback` tags. We avoid using `eval` so the callback needs to be in the (global) `window` scope. A super simple example:
```html
<div data-scroll data-scroll-showCallback="alert('Visible')" data-scroll-showCallback="alert('Invisible')"></div>
```

For a more advanced example check out the example folder.

## What about CSS?
For more advanced CSS animations check out the example folder, specifically `demo.css`. This demonstrates some translate/scale animations combined with opacity animations. All the animations are done in CSS so the possibilities are (almost) endless.

## Custom animations
If you want to add custom animations based on the scroll position, it would be a waste to start another loop / jack the onscroll function. That's why you can attach callbacks to the ScrollTrigger's loop. This is really simple:

```javascript
document.addEventListener('DOMContentLoaded', function(){
	var callback = function(scrollLeft, scrollTop, width, height){
	  // i can do anything now with the height of the viewport
	  // or the scrollPosition in the scrollElement. 'this' refers to
	  // the html object that contains the data-scroll attribute.
	  
	  // if you are done with the callback you can detach it
	  // using the ScrollTrigger.detach() method.
	  ScrollTrigger.detach(callback);
	};
	
  ScrollTrigger.init();
  ScrollTrigger.attach(callback);
});
```

## Contributing
Fork, check out `ScrollTrigger.js` and enjoy!

## Legacy
Looking for the old, 1.5kb minified, ScrollTrigger? Check out the [legacy branch](https://github.com/terwanerik/ScrollTrigger/tree/legacy-v0.1)!
