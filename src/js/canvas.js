import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color,velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.ttl=700
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl-=1

  }
}

// Implementation
let particles
function init() {
  particles = []
  // let radius = 5
  // let radian=Math.PI*2/30
  // for (let i = 0; i < 30; i++) {
  //   let x = canvas.width / 2;
  //   let y = canvas.height / 2;
  //   particles.push(new Particle(x, y, radius, `hsl(0,50%,50%)`, {
  //     x: Math.cos(radian * i),
  //     y: Math.sin(radian * i)
  //   }))
  // }
}

let hue=0
let hueRadians = 0
let particleCount=30
function generateRings () {
  hue=Math.sin(hueRadians)
  let radius = 5
  let radian=(Math.PI*2)/particleCount
  setTimeout(generateRings, 200)

  for (let i = 0; i < particleCount; i++) {
    let x = mouse.x;
    let y = mouse.y;
    particles.push(new Particle(x, y, radius, `hsl(${Math.abs(hue *360)},50%,50%)`, {
      x: Math.cos(radian * i)*2,
      y: Math.sin(radian * i)*2
    }))
  }
hueRadians+=0.01
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle='rgba(0,0,0,0.5)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  particles.forEach((particle,i )=> {
    if (particle.ttl < 0) {
      particles.splice(i,1)
    } else {
      particle.update()
    }
  })
}

init()
animate()
generateRings ()
