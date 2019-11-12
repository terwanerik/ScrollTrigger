import Scene from './scene'

const FRAME_RATE = 60
const FRAME_RATE_SECONDS = 1000 / FRAME_RATE

export default class Canvas {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.height = h

        this.scene = new Scene(ctx, w, h)
        this.lastDraw = null
    }

    update() {
        this.scene.update(this.width, this.height)
    }

    set scrollDelta(val) {
        this.scene.scrollDelta = val
    }

    draw() {
        const now = Date.now()

        if (this.lastDraw !== null) {
            const diff = now - this.lastDraw

            if (diff < FRAME_RATE_SECONDS) { return }
        }

        this.ctx.clearRect(0, 0, this.width, this.height)
        this.scene.draw()

        this.lastDraw = now
    }

    didResize() {
        this.scene.reset()
    }
}
