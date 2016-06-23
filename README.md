# ScrollTrigger
Triggers classes on html elements based on the scroll position

## How to use? ##
It's quite simple, just add the `ScrollTrigger.min.js` file to your HTML page. Then call `ScrollTrigger.init()` when the page has loaded. Like so:

<script src="ScrollTrigger.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function(){
  ScrollTrigger.init();
});
</script>

The init call takes 2 parameters, the `bindTo` and `scrollIn` parameters. These are optional.

The `bindTo` parameter is the HTML element where the triggers should be fetched from, this usually is `document.body` but could specify to a certain element.

The `scrollIn` parameter is the element to get the scroll position from, by default this is `window`, but it could be a scrolling div etc.

Now add the data-scroll attribute to the HTML element you want to animate:

<div data-scroll></div>

When you scroll the page, and the element is visible in the viewport, it will add the default class `visible`. If it's out of the viewport the `invisible` class is added. You can specify options in the `data-scroll` attribute, it can take up to 4.

<div data-scroll="150 animateIn animateOut true"></div>

The first option `150` is the offset to add to the position, in this case, it will start 150 pixels after it has been in the viewport. This is nice for tweaking animations to trigger at the right time.

The second and third options are the classes to add when visible/invisible.

The fourth and last option is a boolean, if true it'll add the element's height to the scroll offset. Now it will only add the `animateIn` class when the element is completely in the viewport.

## Contributing
Fork, check out ScrollTrigger.js and enjoy!
