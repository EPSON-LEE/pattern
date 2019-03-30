var func = function () {
  var a = 1
  return function () {
    a++
    console.log(a)
  }
}


var func = function() {
  var a = 1
  return function() {
    return a
  }
}

var f = func()
f()
f()
f()
f()
f()
f()
f()

var testClosureInCirculation = function () {
  for (var i = 0, arr = []; i <= 3; i++) {
    arr.push(function () {
      console.log(i)
    })
  }
  arr[0]()
  arr[1]()
  arr[2]()
}

var extend = function() {
  var value = 0
  return {
    call: function() {
      value++
      console.log(value)
    }
  }
}

var extend = extend()

extend.call()
extend.call()
extend.call()

var isType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object' + type + ']'
  }
}

var isString = isType('String')
var isArray = isType('Array')
var isNumber = isType('Number')

// 批量构建isType函数

var isType = {}
for (var i = 0, type; type = ['String', 'Array','Number'][i++];) {
  (function(type) {
    Type['is' + type] = function(obj) {
      return Object.prototype.toString.call(obj) === '[Object' + type + ']'
    }
  })(type)
}

Type.isArray([])
Type.isString("str")

// 单例
var single = function(fn) {
  var ret
  return function () {
    return ret || (ret = fn.apply(this, arguments))
  }
}

// 运行
var getScript = getSingle(function() {
  return document.createElement('script')
})

var script1 = getScript()
var script2 = getScript()
console.log(script1 === script2)

// 高阶函数实现AOP
Function.prototype.before = function(beforefn) {
  var _self = this
  return function() {
    beforefn.apply(this, arguments)
    return _self.apply(this, arguments)
  }
}

Function.prototype.after = function(afterfn) {
  var _self = this
  return function() {
    var ret = _self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

var func = function() {
  console.log(2)
}

func = func.before(function() {
  console.log(1)
}).after(function() {
  console.log(3)
})

func()

// 高阶函数的其他应用
/**
 * 1、currying
 * 2、unCurrying
 */

//  unCurrying
Function.prototype.uncurrying = function() {
  var self = this
  return function() {
    var obj = Array.prototype.shift.call(arguments)
    return self.apply(obj, arguments)
  }
}

for (var i = 0, fn, ary = ['push', 'shift', 'forEach']; fn = ary[i++];) {
  Array[ fn ] = Array.prototype[fn].uncurrying()
}

var obj = {
  'length': 3,
  "0": 1,
  "1": 2,
  "2": 3
}

Array.push(obj, 4)
console.log(obj.length)

var first = Array.shift(obj)
console.log(first)
console.log(obj)

Array.forEach(obj, function(i, n){
  console.log( n )
})

// 函数截流
var throttle = function(fn, interval) {
  var _self = fn, // 保存函数引用
      timer,
      firstTime = true

  return function() {
    var args = arguments,
        _me = this
    if (firstTime) {
      _self.apply(_me, args)
    }

    if (timer) {
      return false
    }

    timer = setTimeout(function() {
      clearTimeout(timer)
      timer = null
      _self.apply(_me, args)
    }, interval || 500)
  }
} 

window.onresize = throttle(function() {
  console.log(1)
}, 500)

// 分时函数
/***
 * 1s 创建1000个节点 改造为 每隔200ms创建8个节点
 */

 var timerChunk = function() {  }

// 惰性加载函数

// 
var getSingle = function(fn) {
  var ret
  return function() {
    return ret || fn.apply(this, arguments)
  }
}

var a = function(value) {
  console.log(value)
}

var b = getSingle(a)
b(13)

// 
var cost = (function() {
  var args  = []
  return function() {
    if (arguments.length === 0) {
      var money = 0
      for (var i = 0, len = arguments.length; i < len; i++) {
        money += args[i]
      }
      return money
    } else {
      [].apply.apply(args, arguments)
    }
  }
})()

cost(100)
cost(200)
cost()

// uncurry

// uncurry 的一种实现方法
Function.prototype.uncurrying = function() {
  var self = this // self 等价于 Array.prototype.push
  return function() {
    var obj = Array.prototype.shift.call(arguments)
    return self.apply(obj, arguments)
  }
}

// uncurry的另一种实现方法
Function.prototype.uncurrying = function() {
  var self = this
  return function() {
    return Function.prototype.call.apply(self, arguments)
  }
}

// 通过uncurrying的方法把这句代码转换为一个通用的push函数
var push = Array.prototype.push.uncurrying()

(function() {
  push(arguments, 4)
  console.log(arguments)
})(1,2,3,4)

// 我们把这个方法范围扩大一些

for (var i = 0, fn, ary = ['push', 'shift', 'forEach']; fn = ary[i++];) {
  Array[fn] = Array.prototype[ fn ].uncurrying()
}

var obj = {
  "length": 3,
  "0": 1,
  "1": 2,
  "3": 3
}

// 函数节流

var throttle = function(fn, interval) {
  var _self = fn,
    timer,
    firstTime = true
  return function() {
    var args = arguments,
      _me = this

      if (firstTime) {
        _self.apply(_me, args)
        return firstTime = false
      }

      if (timer) {
        return false
      }

      timer = setInterval(function() {
        clearInterval(timer)
        timer = null
        _self.apply(_me, this)
      }, interval || 500)
  }
}

window.onresize = throttle(function() {
  console.log(1)
}, 500)