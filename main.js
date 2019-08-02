var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var can = document.getElementById('cvs')
var ctx = can.getContext('2d')
can.width = WIDTH
can.height = HEIGHT
var oX = WIDTH - 50, vX = 0,
    oY = 200, vY = 0
    g = .9, m = .01
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

function checkBang() {}
function update() {
  deg += vX
  if (oY + 50 == HEIGHT) {
    vX -= m
  }
  if (oY + 50 + vY > HEIGHT) {
    vY *= -.9
    vX += (vX > 0 ? -1 : 1) * m
  } else {
    vY += g
  }
  oY += vY
  if ((oX + 50 + vX > WIDTH ) || oX + vX < 0) {
    vX *= -.8
  }
  oX += vX
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
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  drawBall()
  checkBang()
  update()
  ctx.drawImage(imgNet, 0, HEIGHT * .3)
  raf = window.requestAnimationFrame(render)
}
function bindEvent() {
  document.addEventListener('touchstart', function(e) {
    e.preventDefault()
    sX = e.touches[0].pageX
    sY = e.touches[0].pageY
    tm = Date.now()
  }, {passive: false})
  document.addEventListener('touchend', function(e) {
    vX = (e.changedTouches[0].pageX - sX) / (Date.now() - tm) * 10
    vY = (e.changedTouches[0].pageY - sY) / (Date.now() - tm) * 10
  })
}