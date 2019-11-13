import ScrollTrigger from '../src/ScrollTrigger'

// Setup ScrollTrigger with default trigger options
const scroll = new ScrollTrigger({
  trigger: {
    once: false
  },
  scroll: {
      callback: (position, direction) => {
          console.log(position)
      }
  }
})

// Add all sections to the scroll trigger colllection
scroll.add('.Block')
