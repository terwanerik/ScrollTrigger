import ScrollTrigger, { Trigger } from '../src/ScrollTrigger'
import Canvas from './canvas'

((document, window) => {
    // This is where the magic happens, start by initializing a ScrollTrigger
    // instance. We can set default options for all triggers in the constructor.
    //
    // We set some default 'trigger' options, and add a custom callback for
    // the didScroll method. Also we set the scroll sustain to 800ms.
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

    const canvasElement = document.querySelector('canvas'),
                    ctx = canvasElement.getContext('2d')

    let w = canvasElement.width = window.innerWidth,
        h = canvasElement.height = window.innerHeight,
        density = 1, isDrawing = true

    const canvas = new Canvas(ctx, w, h)

    function setup() {
        // Add the triggers
        addTriggers()

        // Basic canvas setup
        window.addEventListener('resize', resize)

        density = window.devicePixelRatio != undefined ? window.devicePixelRatio : 1.0

        canvasElement.width = w * density
        canvasElement.height = h * density

        canvas.width = w
        canvas.height = h

        ctx.scale(density,density)

        draw()
    }

    function addTriggers() {
        // Adding triggers can be done in multiple ways, the easiest is to pass
        // a querySelector.
        trigger.add('[data-slideInLeft]')
               .add('[data-slideInRight]')
               .add('[data-slideInBottom]')

        // Add the trigger for the callback example, also add a custom callback
        // when the trigger becomes visible. As an example we pass an HTMLElement
        // instead of a querySelector.
        const element = document.querySelector('[data-callback]')
        trigger.add(element, {
            toggle: {
                callback: {
                    in: counterCallback
                }
            }
        })
    }

    function counterCallback(trigger) {
        // In the callback we get passed the Trigger object, from here we have
        // access to the responding HTMLElement among other things. You could,
        // for instance, change the class it toggles, or attach another callback.
        // Check the console for more info.
        console.info(trigger)

        // For now, we just append the counter
        const counterElement = trigger.element.querySelector('span')
        const counter = parseInt(counterElement.innerText)

        counterElement.innerText = counter + 1
    }

    function didScroll(position) {
        // calculate the delta, from 0 to 1 (when having 1 screen height) to
        // animate with
        const delta = (position.y / window.innerHeight)

        canvas.scrollDelta = delta

        // change the backgroundColor accordingly
        // const lightness = map(delta, 0, 1, 5, 76)
        // const saturation = map(delta, 0, 1, 84, 0)

        // document.body.style.backgroundColor = `hsl(186, ${saturation}%, ${lightness}%)`

        // check if the canvas is on-screen, otherwise stop the animationLoop.
        if (position.y > window.innerHeight) {
            isDrawing = false
        } else if (!isDrawing) {
            isDrawing = true

            draw()
        }
    }

    function map(value, start1, stop1, start2, stop2) {
        return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
    }

    function draw() {
        canvas.update()
        canvas.draw()

        if (isDrawing) {
            window.requestAnimationFrame(draw)
        }
    }

    function resize() {
        w = canvasElement.width = window.innerWidth
        h = canvasElement.height = window.innerHeight

        canvasElement.width = w * density
        canvasElement.height = h * density

        canvas.width = w
        canvas.height = h

        ctx.scale(density, density)

        canvas.didResize()
    }

    setup()
})(document, window)
