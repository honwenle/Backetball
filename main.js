var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var can = document.getElementById('cvs')
var ctx = can.getContext('2d')
can.width = WIDTH
can.height = HEIGHT
var oX = WIDTH - 50, dirX = -1, speedX = 20,
    oY = 200, dirY = -1, speedY = 20,
    g = 1, m = .02
var sX, sY, tm, deg = 0, res_count = 0
var imgBall = new Image()
imgBall.onload = handleLoad
imgBall.src = 'ball.png'
var imgNet = new Image()
imgNet.onload = handleLoad
imgNet.src = 'net.png'

function handleLoad() {
  res_count += 1
  if (res_count == 2) {
    init()
  }
}
function init() {
  bindEvent()
  render()
}

function calc() {
  deg += 1 * dirX
  speedY += dirY
  if (speedY < 0) {
    speedY = 0
    dirY = 1
  }
  if (speedX <= 0) {
    speedX = 0
    dirX = 0
  }
  if (oY + 50 == HEIGHT) {
    speedX -= m
    deg += speedX * dirX
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
function drawBall() {
  ctx.save()
  ctx.translate(oX + 25, oY + 25)
  ctx.rotate(deg * Math.PI/180)
  ctx.translate(-oX - 25, -oY - 25)
  ctx.drawImage(imgBall, oX, oY)
  ctx.restore()
}
function render() {
  calc()
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  drawBall()
  ctx.drawImage(imgNet, 0, HEIGHT * .3)
  window.requestAnimationFrame(render)
}
function bindEvent() {
  document.addEventListener('touchstart', function(e) {
    e.preventDefault()
    sX = e.touches[0].pageX
    sY = e.touches[0].pageY
    tm = Date.now()
  }, {passive: false})
  document.addEventListener('touchend', function(e) {
    dirX = sX < e.changedTouches[0].pageX ? 1 : -1
    dirY = sY < e.changedTouches[0].pageY ? 1 : -1
    speedX = Math.abs(sX - e.changedTouches[0].pageX) / (Date.now() - tm) * 10
    speedY = Math.abs(sY - e.changedTouches[0].pageY) / (Date.now() - tm) * 10
  })
}