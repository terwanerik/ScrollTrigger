# ScrollTrigger
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/terwanerik/ScrollTrigger/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/terwanerik/ScrollTrigger.svg)](https://github.com/terwanerik/ScrollTrigger/issues)
[![GitHub release](https://img.shields.io/github/release/terwanerik/ScrollTrigger.svg?maxAge=2592000)]()
[![Bower](https://img.shields.io/bower/v/ScrollTrigger.svg?maxAge=2592000)]()
[![npm version](https://badge.fury.io/js/scrolltrigger-classes.svg)](https://www.npmjs.com/package/scrolltrigger-classes)
[![Package Quality](http://npm.packagequality.com/shield/scrolltrigger-classes.svg)](http://packagequality.com/#?package=scrolltrigger-classes)

Triggers classes on html elements based on the scroll position. It makes use of requestAnimationFrame so it doesn't jack the users scroll, that way the user / browser keeps their original scroll behaviour. Animations run when the browser is ready for it.

## How to use?
It's quite simple, just add the `ScrollTrigger.min.js` file to your HTML page. Then construct a new ScrollTrigger instance when the page has loaded. Like so:

```html
<script src="ScrollTrigger.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function(){
	var trigger = new ScrollTrigger();
});
</script>
```


## Contributing
Fork, have a look in the `src/` directory and enjoy! If you have improvements, start a new branch & create a pull request when you're all done :)

## Troubleshooting
You can see really quickly if the Trigger is working by hitting 'inspect element' in the little menu that pops up when you hit the right mouse button (or ctrl + click if you're one of those oldschool Mac users). Here you can see if the visible/invisble class is toggled when you scroll past the element, is that happening? Then there is something wrong with the CSS.

If the classes don't toggle, check the JavaScript console. There might be some handy info in there.

#### Found an issue?
Ooh snap, well, bugs happen. Please create a new issue and mention the OS and browser (including version) that the issue is occurring on. If you are really kind, make a [minimal, complete and verifiable example](http://stackoverflow.com/help/mcve) and upload that to [codepen](http://codepen.io).

## Legacy
Looking for the old ScrollTrigger? Check out the [legacy branch](https://github.com/terwanerik/ScrollTrigger/tree/legacy-v0.2)!
