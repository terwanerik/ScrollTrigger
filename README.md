# ScrollTrigger
[![Build](https://github.com/terwanerik/ScrollTrigger/workflows/Build/badge.svg)](https://github.com/terwanerik/ScrollTrigger/actions?query=workflow%3ABuild)
[![Deploy](https://github.com/terwanerik/ScrollTrigger/workflows/Deploy/badge.svg)](https://github.com/terwanerik/ScrollTrigger/actions?query=workflow%3ADeploy)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/terwanerik/ScrollTrigger/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/terwanerik/ScrollTrigger.svg)](https://github.com/terwanerik/ScrollTrigger/issues)
[![GitHub release](https://img.shields.io/github/release/terwanerik/ScrollTrigger.svg)](https://github.com/terwanerik/ScrollTrigger/releases)
[![npm (scoped)](https://img.shields.io/npm/v/@terwanerik/scrolltrigger)](https://www.npmjs.com/package/@terwanerik/scrolltrigger)

Let your page react to scroll changes.

The most basic usage of ScrollTrigger is to trigger classes based on the current scroll position. E.g. when an element enters the viewport, fade it in. You can add custom offsets per element, or set offsets on the viewport (e.g. always trigger after the element reaches 20% of the viewport)

When using the callbacks ScrollTrigger becomes really powerfull. You can run custom code when an element enters / becomes visible, and even return Promises to halt the trigger if the callback fails. This makes lazy loading images very easy.

## Installation
`npm install @terwanerik/scrolltrigger` or just add the `dist/ScrollTrigger.min.js` file to your project and import that.

## How to use?
The easiest way to start is to create a new instance and add some triggers to it, with all default values. This will toggle the 'visible' class when the element comes into the viewport, and toggles the 'invisible' class when it scrolls out of the viewport.

```javascript
// when using ES6 import / npm
import ScrollTrigger from '@terwanerik/scrolltrigger'
// Create a new ScrollTrigger instance with default options
const trigger = new ScrollTrigger() // When not using npm, create a new instance with 'new ScrollTrigger.default()'
// Add all html elements with attribute data-trigger
trigger.add('[data-trigger]')
```

Now in your CSS add the following classes, this fades the `[data-trigger]` elements in and out.

```css
.visible, .invisible {
  opacity: 0.0;
  transition: opacity 0.5s ease;
}
.visible {
  opacity: 1.0;
}
```

> ⚠️ **Attention**
> Are you migrating from 0.x to 1.x? [Checkout the migration guide!](https://github.com/terwanerik/ScrollTrigger#migrating-from-0x-to-1x)

### Some more demo's
 - [A Vue.js example with image lazy loading](https://codepen.io/erikterwan/pen/bGNeRMr)
 - [A Vue.js example with infinite scroll](https://codepen.io/erikterwan/pen/QWwEMdZ)

## A more detailed example
Adding callbacks / different classes can be done globally, this becomes the default for all triggers you add, or you can specify custom configuration when adding a trigger.

```javascript
// Create a new ScrollTrigger instance with some custom options
const trigger = new ScrollTrigger({
  trigger: {
    once: true
  }
})
// Add all html elements with attribute data-trigger, these elements will only be triggered once
trigger.add('[data-trigger]')
// Add all html elements with attribute data-triggerAlways, these elements will always be triggered
trigger.add('[data-triggerAlways]', { once: false })
```

## Options
The full set of options is taken from the `demo` directory, for more info, check that out.

```javascript
const trigger = new ScrollTrigger({
    // Set custom (default) options for the triggers, these can be overwritten
    // when adding new triggers to the ScrollTrigger instance. If you pass
    // options when adding new triggers, you'll only need to pass the object
    // `trigger`, e.g. { once: false }
    trigger: {
        // If the trigger should just work one time
        once: false,
        offset: {
            // Set an offset based on the elements position, returning an
            // integer = offset in px, float = offset in percentage of either
            // width (when setting the x offset) or height (when setting y)
            //
            // So setting an yOffset of 0.2 means 20% of the elements height,
            // the callback / class will be toggled when the element is 20%
            // in the viewport.
            element: {
                x: 0,
                y: (trigger, rect, direction) => {
                    // You can add custom offsets according to callbacks, you
                    // get passed the trigger, rect (DOMRect) and the scroll
                    // direction, a string of either top, left, right or
                    // bottom.
                    return 0.2
                }
            },
            // Setting an offset of 0.2 on the viewport means the trigger
            // will be called when the element is 20% in the viewport. So if
            // your screen is 1200x600px, the trigger will be called when the
            // user has scrolled for 120px.
            viewport: {
                x: 0,
                y: (trigger, frame, direction) => {
                    // We check if the trigger is visible, if so, the offset
                    // on the viewport is 0, otherwise it's 20% of the height
                    // of the viewport. This causes the triggers to animate
                    // 'on screen' when the element is in the viewport, but
                    // don't trigger the 'out' class until the element is out
                    // of the viewport.

                    // This is the same as returning Math.ceil(0.2 * frame.h)
                    return trigger.visible ? 0 : 0.2
                }
            }
        },
        toggle: {
            // The class(es) that should be toggled
            class: {
                in: 'visible', // Either a string, or an array of strings
                out: ['invisible', 'extraClassToToggleWhenHidden']
            },
            callback: {
                // A callback when the element is going in the viewport, you can
                // return a Promise here, the trigger will not be called until
                // the promise resolves.
                in: null,
                // A callback when the element is visible on screen, keeps
                // on triggering for as long as 'sustain' is set
                visible: null,
                // A callback when the element is going out of the viewport.
                // You can also return a promise here, like in the 'in' callback.
                //
                // Here an example where all triggers take 10ms to trigger
                // the 'out' class.
                out: (trigger) => {
                    // `trigger` contains the Trigger object that goes out
                    // of the viewport
                    return new Promise((resolve, reject) => {
                        setTimeout(resolve, 10)
                    })
                }
            }
        },
    },
    // Set custom options and callbacks for the ScrollAnimationLoop
    scroll: {
        // The amount of ms the scroll loop should keep triggering after the
        // scrolling has stopped. This is sometimes nice for canvas
        // animations.
        sustain: 200,
        // Window|HTMLDocument|HTMLElement to check for scroll events
        element: window,
        // Add a callback when the user has scrolled, keeps on triggering for
        // as long as the sustain is set to do
        callback: didScroll,
        // Callback when the user started scrolling
        start: () => {},
        // Callback when the user stopped scrolling
        stop: () => {},
        // Callback when the user changes direction in scrolling
        directionChange: () => {}
    }
})

/***
 ** Methods on the ScrollTrigger instance
 ***/

/**
 * Creates a Trigger object from a given element and optional option set
 * @param {HTMLElement} element
 * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
 * @returns Trigger
 */
trigger.createTrigger(element, options)

/**
 * Creates an array of triggers
 * @param {HTMLElement[]|NodeList} elements
 * @param {Object} [options=null] options
 * @returns {Trigger[]} Array of triggers
 */
trigger.createTriggers(elements, options)

/**
 * Adds triggers
 * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
 * @param {Object} [options=null] options
 * @returns {ScrollTrigger}
 */
trigger.add(objects, options)

/**
 * Removes triggers
 * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
 * @returns {ScrollTrigger}
 */
trigger.remove(objects)

/**
 * Lookup one or multiple triggers by a query string
 * @param {string} selector
 * @returns {Trigger[]}
 */
trigger.query(selector)

/**
 * Lookup one or multiple triggers by a certain HTMLElement or NodeList
 * @param {HTMLElement|HTMLElement[]|NodeList} element
 * @returns {Trigger|Trigger[]|null}
 */
trigger.search(element)

/**
 * Reattaches the scroll listener
 */
trigger.listen()

/**
 * Kills the scroll listener
 */
trigger.kill()


/***
 ** Methods on a Trigger instance, e.g. when receiving from a callback or from a query
 ***/
const receivedTrigger = new Trigger()

/**
 * The HTML element
 */
receivedTrigger.element

/**
 * The offset settings
 */
receivedTrigger.offset

/**
 * The toggle settings
 */
receivedTrigger.toggle

/**
 * If the trigger should fire once, boolean
 */
receivedTrigger.once

/**
 * If the trigger is visible, boolean
 */
receivedTrigger.visible
```

## Migrating from 0.x to 1.x
The main differences between `0.x` and `1.x` are the way you add and configure your
triggers. `0.x` added all HTMLElement's with the data-scroll attribute by default,
`1.x` doesn't do that, this requires you to add the triggers yourself. This improves
the configuration of the triggers.

Also, please note that when *not* using a package manager / webpack, and you're
just importing the minified version, you'll have to always use `new ScrollTrigger.default()`.

```html
<script src="dist/ScrollTrigger.min.js"></script>
<script>
var trigger = new ScrollTrigger.default()
</script>
```

Take for example the following element in ScrollTrigger `0.x`:

```html
<div data-scroll="once addHeight" data-scroll-showCallback="alert('Visible')" data-scroll-hideCallback="alert('Invisible')"></div>
```

In ScrollTrigger `1.x` you would write this mostly in JavaScript:

```javascript
// Say you have some divs with class 'animateMe'
const scrollTrigger = new ScrollTrigger()
scrollTrigger.add('.animateMe', {
    once: true, // same functionality as the `once` flag in v0.x
    offset: {
        element: {
            y: 1.0 // note that we pass a float instead of an integer, when the
                   // offset is a float, it takes it as a percentage, in this
                   // case, add 100% of the height of the element, the same
                   // functionality as the `addHeight` flag in v0.x
        }
    },
    toggle: {
        callback: {
            in: () => { // same as the data-scroll-showCallback, no need to set a
                        // custom callScope when calling custom functions and
                        // the possibility to return a Promise
                alert('Visible')
            },
            out: () => { // same as the data-scroll-hideCallback
                alert('Invisible')
            }
        }
    }
})
```

The advantage of writing all this in javascript is the configuration possible, say
i want to change the offset of the element after the first time it's been visible
(e.g. remove the `addHeight` flag after it's been shown):

```javascript
scrollTrigger.add('.animateMe', {
    offset: {
        element: {
            y: 1.0
        }
    },
    toggle: {
        callback: {
            in: (trigger) => {
                // remove the element offset
                trigger.offset.element.y = 0
            }
        }
    }
})
```

Another example for setting custom classes per toggle;

```html
<div data-scroll="toggle(animateIn, animateOut)"></div>
```

Becomes

```javascript
const scrollTrigger = new ScrollTrigger()

scrollTrigger.add('[data-scroll]', {
    toggle: {
        class: {
            in: 'animateIn',
            out: 'animateOut'
        }
    }
})
```

If you have any questions on migrating to `v1.x` feel free to [create a new issue](https://github.com/terwanerik/ScrollTrigger/issues).

## Contributing
Fork, have a look in the `src/` directory and enjoy! If you have improvements, start a new branch & create a pull request when you're all done :)

## Troubleshooting
You can see really quickly if the Trigger is working by hitting 'inspect element'. Here you can see if the visible/invisble class is toggled when you scroll past the element.

If the classes don't toggle, check the JavaScript console. There might be some handy info in there.

#### Found an issue?
Ooh snap, well, bugs happen. Please create a new issue and mention the OS and browser (including version) that the issue is occurring on. If you are really kind, make a [minimal, complete and verifiable example](http://stackoverflow.com/help/mcve) and upload that to [codepen](http://codepen.io).

## Legacy
Looking for the old ScrollTrigger? Check out the [legacy branch](https://github.com/terwanerik/ScrollTrigger/tree/legacy-v0.3.6)!
