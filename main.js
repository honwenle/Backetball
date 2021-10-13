var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var can = document.getElementById('cvs')
var ctx = can.getContext('2d')
can.width = WIDTH
can.height = HEIGHT
var oX = 90, vX = 0,
    oY = 0, vY = 0
    g = .9, m = .01
var sX, sY, tm, deg = 0, res_count = 0,
    bangLock = false, ballStep = 0,
    score = 0,
    trail = 1
var imgBall = new Image()
imgBall.onload = handleLoad
imgBall.src = 'ball.png'
var imgNet = new Image()
imgNet.onload = handleLoad
imgNet.src = 'net.png'
var netX, netY = HEIGHT * .3 + 5

function handleLoad() {
  res_count += 1
  if (res_count == 2) {
    init()
  }
}
function init() {
  trail = /trail/.test(location.hash) ? 0.25 : 1
  netX = imgNet.width
  bindEvent()
  render()
}

function checkGoal() {
  if (ballStep == 0) {
    if (oY+25 > netY) {
      ballStep = 1
      if (oX+25 < netX) {
        score += 1
      }
    }
  } else {
    if (oY+25 < netY) {
      ballStep = 0
    }
  }
}
function checkBang() {
  var dx = oX+25 - netX
  var dy = netY - (oY+25)
  if (dx*dx + dy*dy < 25*25) {
    console.log('bang');
    if (!bangLock) {
      [vX, vY] = getReflect(dx, dy)
      bangLock = true
    }
  } else {
    bangLock = false
  }
}
function update() {
  deg += vX
  if (oY + 50 == HEIGHT) {
    vX -= m
  }
  if (oY + 50 + vY > HEIGHT) {
    vY *= -.9
    vX += vX ? vX > 0 ? -m : m : 0
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
function drawScore() {
  ctx.save()
  ctx.font = '20px Arial'
  ctx.fillStyle = "#F7941D";
  ctx.fillText('Score: ' + score, 10, 50)
  ctx.restore()
}
function render() {
  // ctx.clearRect(0, 0, WIDTH, HEIGHT)
  ctx.fillStyle = `rgba(255, 255, 255, ${trail})`
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  drawBall()
  checkBang()
  checkGoal()
  update()
  drawScore()
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
    vX = (e.changedTouches[0].pageX - sX) / (Date.now() - tm) * 15
    vY = (e.changedTouches[0].pageY - sY) / (Date.now() - tm) * 15
  })
  // document.addEventListener('touchmove', function(e) {
  //   oX = e.changedTouches[0].pageX
  //   oY = e.changedTouches[0].pageY
  // })
}
/**
 * (
 * -(2*A*B*y + (A*A-B*B)*x + 2*A*C) / (A*A + B*B),
 * -((B*B - A*A)*y + 2*A*B*x + 2*B*C) / (A*A + B*B)
 * )
 */
function getReflect(dx,dy) {
  var k = dy/dx, x = -vX, y = vY
  return dx ? [
    .8 * (2*k*y - (k*k-1)*x) / (k*k + 1),
    .8 * -(2*k*x - (1 - k*k)*y) / (k*k + 1)
  ] : [vX, -vY]
}