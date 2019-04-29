export default function headerCanvas (text, tag) {
  var HeaderCan = document.getElementById(tag)
  var ctx = HeaderCan.getContext('2d')
  var img
  var RAF = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  })()
  var particleArray = []
  var animateArray = []
  var particleSizeX = 1
  var particleSizeY = 2
  var canvasHandle = {
    init: function () {
      this._reset()
      this._initImageData()
      this._execAnimate()
    },
    _reset: function () {
      particleArray.length = 0
      animateArray.length = 0
      this.ite = 100
      this.start = 0
      this.end = this.start + this.ite
    },
    _initImageData: function () {
      this.imgx = (HeaderCan.width - img.width) / 2
      this.imgy = (HeaderCan.height - img.height) / 2
      ctx.clearRect(0, 0, HeaderCan.width, HeaderCan.height)
      ctx.drawImage(img, this.imgx, this.imgy, img.width, img.height)
      var imgData = ctx.getImageData(this.imgx, this.imgy, img.width, img.height)
      for (var x = 0; x < img.width; x += particleSizeX) {
        for (var y = 0; y < img.height; y += particleSizeY) {
          var i = (y * imgData.width + x) * 4
          if (imgData.data[i + 3] >= 125) {
            var color = 'rgba(' + imgData.data[i] + ',' + imgData.data[i + 1] + ',' + imgData.data[i + 2] + ',' + imgData.data[i + 3] + ')'
            var xRandom = x + Math.random() * 20
            var vx = -Math.random() * 200 + 400
            var yrandom = img.height / 2 - Math.random() * 40 + 20
            var vy
            if (yrandom < this.imgy + img.height / 2) {
              vy = Math.random() * 300
            } else {
              vy = -Math.random() * 300
            }
            particleArray.push(
              new Particle(
                xRandom + this.imgx,
                yrandom + this.imgy,
                x + this.imgx,
                y + this.imgy,
                vx,
                vy,
                color
              )
            )
            particleArray[particleArray.length - 1].drawSelf()
          }
        }
      }
    },
    _execAnimate: function () {
      var that = this
      particleArray.sort(function (a, b) {
        return a.ex - b.ex
      })
      if (!this.isInit) {
        this.isInit = true
        animate(function (tickTime) {
          if (animateArray.length < particleArray.length) {
            if (that.end > (particleArray.length - 1)) {
              that.end = (particleArray.length - 1)
            }
            animateArray = animateArray.concat(particleArray.slice(that.start, that.end))
            that.start += that.ite
            that.end += that.ite
          }
          animateArray.forEach(function (i) {
            i.update(tickTime)
          })
        })
      }
    }
  }
  function animate (tick) {
    if (typeof tick == 'function') { //eslint-disable-line
      var tickTime = 16
      ctx.clearRect(0, 0, HeaderCan.width, HeaderCan.height)
      tick(tickTime)
      // stats.update()
      RAF(function () {
        animate(tick)
      })
    }
  }
  function Particle (x, y, ex, ey, vx, vy, color) {
    this.x = x
    this.y = y
    this.ex = ex
    this.ey = ey
    this.vx = vx
    this.vy = vy
    this.a = 1500
    this.color = color
    this.width = particleSizeX
    this.height = particleSizeY
    this.stop = false
    this.static = false
    this.maxCheckTimes = 10
    this.checkLength = 5
    this.checkTimes = 0
  }
  var oldColor = ''
  Particle.prototype = {
    constructor: Particle,
    drawSelf: function () {
      if (oldColor != this.color) {//eslint-disable-line
        ctx.fillStyle = this.color
        oldColor = this.color
      }
      ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    },
    move: function (tickTime) {
      if (this.stop) {
        this.x = this.ex
        this.y = this.ey
      } else {
        tickTime = tickTime / 1000
        var cx = this.ex - this.x
        var cy = this.ey - this.y
        var angle = Math.atan(cy / cx)
        var ax = Math.abs(this.a * Math.cos(angle))
        ax = this.x > this.ex ? -ax : ax
        var ay = Math.abs(this.a * Math.sin(angle))
        ay = this.y > this.ey ? -ay : ay
        this.vx += ax * tickTime
        this.vy += ay * tickTime
        this.vx *= 0.95
        this.vy *= 0.95
        this.x += this.vx * tickTime
        this.y += this.vy * tickTime
        if (Math.abs(this.x - this.ex) <= this.checkLength && Math.abs(this.y - this.ey) <= this.checkLength) {
          this.checkTimes++
          if (this.checkTimes >= this.maxCheckTimes) {
            this.stop = true
          }
        } else {
          this.checkTimes = 0
        }
      }
    },
    update: function (tickTime) {
      this.move(tickTime)
      this.drawSelf()
    }
  }
  //  use text
  img = document.createElement('canvas')
  img.width = 400
  img.height = 80
  var imgctx = img.getContext('2d')
  imgctx.textAlign = 'center'
  imgctx.textBaseline = 'middle'
  imgctx.font = text.length > 6 ? '40px 微软雅黑' : '50px 微软雅黑'
  imgctx.fillText(text || '龙宝', img.width / 2, img.height / 2)
  canvasHandle.init()
}
