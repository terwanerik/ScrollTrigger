import Point from './point'

const AMOUNT_DELTA = 2.4
const CONNECT_DISTANCE = 260
const LINE_WIDTH = 2

export default class Scene {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.height = h
        this.scrollDelta = 0

        this.ctx.globalCompositeOperation = 'lighter'

        this.reset()
    }

    reset() {
        this.points = []

        this.populate()
    }

    populate() {
        const amount = Math.ceil(((this.width + this.height) / 100) * AMOUNT_DELTA)

        for (let i = 0; i < amount; i++) {
            const point = new Point(i, this.width, this.height)

            this.points.push(point)
        }
    }

    update(w, h) {
        this.width = w
        this.height = h

        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i]

            point.update(w, h, this.scrollDelta)
        }
    }

    draw() {
        this.ctx.fillStyle = '#2B7174'

        let linesById = {}

        for (let x = 0; x < this.points.length; x++) {
            const point = this.points[x]

            point.draw(this.ctx)

            for (let y = 0; y < this.points.length; y++) {
                const reference = this.points[y]

                if (reference.id === point.id) { continue }

                const distanceX = Math.abs(point.calcX - reference.calcX)
                const distanceY = Math.abs(point.calcY - reference.calcY)
                const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))

                if (distance <= CONNECT_DISTANCE) {
                    const tag = point.id > reference.id ? `${reference.id}_${point.id}` : `${point.id}_${reference.id}`

                    if (linesById.hasOwnProperty(tag)) { continue }

                    linesById[tag] = { x1: point.calcX, y1: point.calcY, x2: reference.calcX, y2: reference.calcY, distance: distance }
                }
            }
        }

        const lines = Object.values(linesById)

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const alpha = 1.0 - (line.distance / CONNECT_DISTANCE)

            this.ctx.strokeStyle = `rgba(98, 130, 94, ${alpha})`
            this.ctx.lineWidth = LINE_WIDTH
            this.ctx.beginPath()
            this.ctx.moveTo(line.x1, line.y1)
            this.ctx.lineTo(line.x2, line.y2)
            this.ctx.stroke()
        }
    }
}
