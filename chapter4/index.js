// 基础的单例模式
var singlePattern = function(name) {
  console.log('this is a single pattern' + name)
}

singlePattern.prototype.getName = function() {

}

singlePattern.prototype.getAge = function() {

}

singlePattern.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new singlePattern(name)
  }
  return this.instance
}

var a = singlePattern.getInstance('seven1')
var b = singlePattern.getInstance('seven2')

console.log(a === b)

// 透明的单例模式

var CreateDiv = (function() {
  var instance

  var CreateDiv = function(html) {
    if (instance) {
      return instance
    }
    this.html = html
    this.init()
    return instance = this
  }

  CreateDiv.prototype.init = function() {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
  }

  return CreateDiv
})()

var a = new CreateDiv('sven1')
var b = new CreateDiv('sven2')
console.log(a === b)

// 命名空间

var namespace = {
  a: function() {
    alert(1)
  },
  b: function(params) {
    alert(2)
  }
}

// 创建一个命名空间

var MyApp = {}
MyApp.namespace = function(name) {
  var parts = name.splits('.')
  var current = MyApp
  for (var i in parts) {
    if (!current[parts[i]]) {
      current[parts[i]] = {}
    }
    current = current[parts[i]]
  }
}

MyApp.namespace('event')
MyApp.namespace('dom.style')

console.log(MyApp)