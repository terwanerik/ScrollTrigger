const POINT_RADIUS = 3.5
const MIN_SPEED = 0.05
const MAX_SPEED = 0.1

function getRandomNegative(from, to) {
    const rand = from + (Math.random() * (to - from))

    return Math.random() > 0.5 ? rand : -rand
}

export default class Point {
    constructor(id, w, h) {
        this.id = id
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.xExtra = 0
        this.yExtra = 0

        this.xSpeed = getRandomNegative(MIN_SPEED, MAX_SPEED)
        this.ySpeed = getRandomNegative(MIN_SPEED, MAX_SPEED)
    }

    update(w, h, delta) {
        let xExtra = 0
        let yExtra = 0

        if (this.x > w / 2) {
            this.xExtra = delta * (w / 2)
        } else {
            this.xExtra = -(delta * (w / 2))
        }

        if (this.y > h / 2) {
            this.yExtra = delta * (h / 2)
        } else {
            this.yExtra = -(delta * (h / 2))
        }

        this.x += this.xSpeed
        this.y += this.ySpeed

        if (this.x < POINT_RADIUS || this.x + POINT_RADIUS > w) {
            this.x = this.x < POINT_RADIUS ? POINT_RADIUS : (w - POINT_RADIUS)
            this.xSpeed = -this.xSpeed
        }

        if (this.y < POINT_RADIUS || this.y + POINT_RADIUS > h) {
            this.y = this.y < POINT_RADIUS ? POINT_RADIUS : (h - POINT_RADIUS)
            this.ySpeed = -this.ySpeed
        }
    }

    get calcX() {
        return this.x - this.xExtra
    }

    get calcY() {
        return this.y - this.yExtra
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.calcX, this.calcY, POINT_RADIUS, 0, 2 * Math.PI);
        ctx.fill()
    }
}
