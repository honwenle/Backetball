var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var can = document.getElementById('cvs')
var ctx = can.getContext('2d')
can.width = WIDTH
can.height = HEIGHT
var oX = 50, oY = 0, dirY = 1, speedY = 0

var imgBall = new Image()
imgBall.onload = init
imgBall.src = 'ball.png'

function init() {
  bindEvent()
  render()
}

function calc() {
  speedY += dirY
  if (speedY < 0) {
    speedY = 0
  }
  if (speedY == 0) {
    if (dirY == 1) {
      dirY = 0
    }
    dirY = 1
  }
  oY += dirY * speedY
  if (oY + 50 > HEIGHT) {
    oY = HEIGHT - 50
  }
  if (oY + 50 == HEIGHT) {
    dirY = -1
    speedY *= .9
  }
}
function render() {
  calc()
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  ctx.drawImage(imgBall, oX, oY)
  window.requestAnimationFrame(render)
}
function bindEvent() {
  document.addEventListener('touchstart', function(e) {
    dirY = -1
    speedY = 12
  })
}