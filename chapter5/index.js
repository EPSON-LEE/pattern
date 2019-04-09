// JavaScript中的策略模式
var strategies = {
  'S': function(salary) {
    return salary * 4
  },
  'A': function(salary) {
    return salary * 3
  },
  'B': function(salary) {
    return salary * 2
  }
}

var calculateBonus = function(level, salary) {
  return strategies[level](salary)
}

console.log(calculateBonus('S', 20000))

// 使用策略模式实现缓动动画

var tween = {
  linear: function(t,b,c,d) {
    return c*t/d + b
  },
  easyIn: function(t,b,c,d) {
    return c * (t /= d) * t + b
  },
  strongEasyIn: function(t,b,c,d) {
    return c * (t/=d) * t * t * t * t + b
  },
  strongEasyOut: function(t,b,c,d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  sineaseOut: function() {
    return c * ((t = t/d - 1) * t * t + 1) + b
  }
}

var Animate = function(dom) {
  this.dom = dom          // 进行运动的dom节点
  this.startTime = 0      // 动画要开始的时间
  this.startPos = 0       // 动画开始时，dom节点的位置
  this.endPos = 0         // 动画结束时， dom节点的位置
  this.propertyName = null // dom节点需要被改变的css属性名
  this.easing = null   // 缓动算法
  this.duration = null // 动画持续时间
}

// Animate.prototype.start 方法负责启动这个动画，在动画启动的瞬间要记录一些信息，供缓动算法在以后计算小球当前位置的时候使用。在记录这些信息之后，此方法还要负责启动器。
Animate.prototype.start = function( propertyName, endPos, duration, easing ) {
  this.startTime = +new Date() // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[propertyName] // dom节点初始位置
  this.propertyName = propertyName
  this.endPos = endPos
  this.duration = duration

  this.easing = tween[ easing ]

  var self = this
  var timeId = setInterval(function() {
    if (self.step() === false) {
      clearInterval(timeId)
    }
  }, 19)
}

// 接下来是Animate.prototype.step方法， 代表小球每一帧要做的事情
Animate.prototype.step = function() {
  var t = +new Date
  if (t >= this.startTime + this.duration) {
    this.update(this.endPos)
    return false
  }

  var pos = this.easing( t - this.startTime, this.startPos,
    this.endPos - this.startPos, this.duration)
    // pos为当前小球位置
    this.update(pos) // 更新小球的CSS属性
}

// Animate.prototype.update
Animate.prototype.update = function(pos) {
  this.dom.style[this.propertyName] = pos + 'px'
}

// 表单校验

// 最基本的初级版本
var registerForm = document.getElementById('registerForm')

registerForm.onsubmit = function() {
  if (registerForm.userName.value === '') {
    alert('用户不能为空')
    return false
  }

  if (registerForm.password.value.length < 6) {
    alert('密码长度不能小于6位')
    return false
  }

  if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
    alert('手机号码格式不正确')
    return false
  }
}

// 使用策略模式重构表单校验

// 首先把策略逻辑分装为策略对象
var strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  }
}

// 实现Validator类， 在这里validator作为Context，负责接收用户的请求并委托给strategy

var validataFunc = function() {
  var validator = new Validator()
  // 添加一些校验规则
  validator.add(registerForm.userName, 'isNoEmpty', '同户名不能为空')
  validator.add(registerForm.password, 'minLength:6', '密码长度不能小于6位')
  validator.add(registerForm.userName, 'isMobile', '手机号码格式不正确')

  var errorMsg = validator.start()
  return errorMsg
}

