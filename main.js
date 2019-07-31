var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var can = document.getElementById('cvs')
var ctx = can.getContext('2d')
can.width = WIDTH
can.height = HEIGHT
var ox = 50, oy = 0, dirY = 1, speed = 0, g = 1

var imgBall = new Image()
imgBall.onload = init
imgBall.src = 'ball.png'

function init() {
  bindEvent()
  render()
}

function calc() {
  speed += dirY * g
  if (speed < 0) {
    speed = 0
  }
  if (speed == 0) {
    if (dirY == 1) {
      dirY = 0
    }
    dirY = 1
  }
  oy += dirY * speed
  if (oy + 50 > HEIGHT) {
    oy = HEIGHT - 50
  }
  if (oy + 50 == HEIGHT) {
    dirY = -1
    speed *= .9
  }
}
function render() {
  calc()
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  ctx.drawImage(imgBall, ox, oy)
  window.requestAnimationFrame(render)
}
function bindEvent() {
  document.addEventListener('touchstart', function(e) {
    dirY = -1
    speed = 12
  })
}