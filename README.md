# ScrollTrigger
Triggers classes on html elements based on the scroll position

## How to use? ##
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

When you scroll the page, and the element is visible in the viewport, it will add the default class `visible`. If it's out of the viewport the `invisible` class is added.

### Options ###

```html
<div data-scroll="150 animateIn animateOut addHeight once"></div>
```

The first option `150` is the offset to add to the position, in this case, it will start 150 pixels after it has been in the viewport. This is nice for tweaking animations to trigger at the right time.

The second and third options are the classes to add when visible/invisible.

The fourth option is a boolean, if true it'll add the element's height to the scroll offset. Now it will only add the `animateIn` class when the element is completely in the viewport.

The fifth option makes sure the animation only happens once, so when you scroll up & down the animations do not start over.

The position of the first 3 options is strict, the `addHeight` and `once` options are not. E.g. `150 animateIn animateOut once` is valid, as is `150 animateIn animateOut addHeight`.

## What about CSS? ##
You can find examples on how to use the css classes to animate in the [gh-pages branch](https://github.com/terwanerik/ScrollTrigger/tree/gh-pages). Checkout `index.html` and `style.css` for some basic animations.

## Custom animations ##
If you want to add custom animations based on the scroll position, it would be a waste to start another loop / jack the onscroll function. That's why you can attach callbacks to the ScrollTrigger's loop. This is really simple:

```javascript
document.addEventListener('DOMContentLoaded', function(){
	var callback = function(height, scrollPos){
	  // i can do anything now with the height of the viewport
	  // or the scrollPosition in the scrollElement. 'this' refers to
	  // the ScrollTrigger object.
	  
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
