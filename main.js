var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var can = document.getElementById('cvs')
var ctx = can.getContext('2d')
can.width = WIDTH
can.height = HEIGHT
var oX = 0, dirX = 1, speedX = 20,
    oY = 200, dirY = -1, speedY = 20,
    g = 1, m = .02

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
    dirY = 1
  }
  if (speedX < 0) {
    speedX = 0
    dirX = 0
  }
  if (oY + 50 == HEIGHT) {
    speedX -= m
  }
  oY += dirY * speedY
  oX += dirX * speedX
  if (oY + 50 > HEIGHT) {
    oY = HEIGHT - 50
    dirY = -1
    speedY *= .9
  }
  if (oX + 50 > WIDTH) {
    oX = WIDTH - 50
    dirX = -1
    speedX *= .8
  }
  if (oX < 0) {
    oX = 0
    dirX = 1
    speedX *= .8
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