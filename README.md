# pattern
JavaScript设计模式与开发实践

## chapter 1

### 原型模式和基于原型继承的 JavaScript 对象系统

#### 使用克隆的原型模式
      从设计模式的角度讲，原型模式是用于创建对象的一种模式，如果我们想要创建一个对象，
一种方法是先指定它的类型，然后通过类来创建这个对象。原型模式选择了另外一种方式，我们
不再关心对象的具体类型，而是找到一个对象，然后通过克隆来创建一个一模一样的对象。  

#### JavaScript中的原型继承
  JavaScript中的根对象是Object.prototype对象 Object.prototype对象是一个空对象。我们在JavaScript遇到的每个对象实际上都是从Object.prototype对象克隆来的，Object.prototype对象就是他们的原型。
  ```
  var obj1 = {}
  var obj2 = {}
  console.log( Object.getPrototypeOf(obj1) === Object.prototype)
  console.log( Object.getPrototypeOf(obj2) === Object.prototype)
  ```
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
  已经重复过很多次JavaScript中没有类的概念(ps:es6前)，new 并不是实例化，而是一个函数构造器。JavaScript中函数不仅可以当作普通函数被调用，也可以作为构造器
  被调用。当使用new 运算来调用函数时，此时的函数就是一个构造器。用new运算来创建对象的过程，实际上也是先克隆Object.prototype对象，再进行一些额外的操作过程。

  工厂方法模式和抽象工厂模式可以帮助我们解决这个问题，但这两个模式会带来许多跟产品类平行的工厂
  类层次，也会增加很多额外的代码。
  ```
  var objectFactory = function() {
  var obj = new Object() // 从Object.prototype上克隆一个空对象
  Constructor = [].shift.call(arguments) // 取外部传入的构造器
  obj.__proto__ = Constructor.prototype // 指向正确的原型
  var ret = Constructor.apply(obj, arguments) //借用外部传入的构造器给obj设置属性
  return typeof ret === 'object' ? ret : obj //保证返回对象
  ```
- 对象会记住他的原型。
- 原型模式是通过克隆来创建对象的。
- 原型链委托机制，当某个对象无法响应某个请求时，会把请求委托给自己的原型。

#### 原型继承的未来

```
// ES6的带来的class语法
class Animal {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name)
  }

  speak() {
    return 'woof'
  }
}

var dog = new Dog("Scamp")
console.log(dog.getName() + ' says ' + dog.speak())
```

## chapter2  this call 和 apply

### this的指向

- 作为对象的方法调用
- 作为普通函数调用
- 构造器调用
- Function.prototype.call 和 Function.prototype.apply调用

#### 作为对象的方法调用 

## chapter3 闭包和高阶函数

闭包和JavaScript中的作用域是密不可分的

### 闭包的生命周期
  全局变量的生命周期是永久的，除非自己销毁这个全局变量，
  当函数产生了闭包结构时，局部变量会一直存在与这个环境里，局部变量的生命周期看起来是被延续了。利用这个奇妙的特性我们可以做许多很有意思的事情。
  ```
  var func = function() {
    var a = 0
    return function() {
      console.log(a++)
    }
  }

  let temp = func()
  temp() // 返回0
  temp() // 返回1
  temp() // 返回2
  ```
### 闭包的更多作用

#### 封装变量

可以把一些不需要暴露在全局的变量封装为“私有变量”, 比如说计算数字的乘积：

```
var mul = function() {
  var a = 1
  debugger
  for (var i = 0, l = arguments.length; i < l; i++) {
    a  = a * arguments[i]
  }
  return a
}
```
加入缓存机制提高函数的性能
```
var cache = {}
val mul = function() {
  var args = [].prototype.join.call(arguments, ',')
  if (cache[ args ]) {
    return cache[args]
  }

  if (var i = 0; l = arguments.length; i < l; i++) {
    a = a * arguments[i]
  }

  return cache[ args ] = a
}
console.log(mult(1,2,3))
console.log(mult(1,2,3))
```
#### 延续局部变量的寿命

```
var report = function(src) {
  var img = new Image()
  img.src= src
}
report("url")

```
由于一些低版本的浏览器会出现bug,在这些浏览器下使用report函数进行数据上报会丢失30%左右的数据，也就是说report函数并不是每一次都成功的发起HTTP请求。丢失的原因是img是report函数中的局部变量，当report函数调用结束后，img局部变量就会被销毁，而此时或许还没来得及发出HTTP请求。

```
var report = (function() {
  var imgs = []
  return function(src) {
    var img = new Image()
    imgs.push(img)
    img.src = src
  }
})()
```

#### 闭包实现命令模式

命令模式的意图是把请求分装成对象，从而分离请求的发起者和接受者（执行者）之间的耦合关系。在命令执行之前，可以预先往命令对象中植入命令的接收者。但在JavaScript中函数作为一等对象，本身就可以四处传递，用函数对象而不是普通对象来封装请求显得更加简单自然。如果需要往函数对象中预先植入命令的接受者，那么闭包可以来完成这个工作。在面向对象版本的命令模式中，预先植入的命令接收者被当作对象的属性保存起来；

```
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
extend.call() // 1
extend.call() // 2
extend.call() // 3

```

#### 闭包与内存管理

使用闭包容易产生循环引用，如果闭包的作用域链中保存者一些DOM节点，这时候就容易造成内存泄露。

### 高阶函数

函数可以当作参数、返回值传递
```
var appendDiv = function() {
  for(var i = 0; i < 100; i++) {
    var div = document.createElement('div')
    div.innerHTML = i
    document.body.appendChild(div)
    div.style.display = 'none'
  }
}
```
使用回调函数避免将 ELEMENT.style.display = 'none' 硬编码在代码里

```
var append = function(callback) {
  for (var i = 0; i < 100; i++) {
    var div = document.createElement('div')
    div.innerHTML = i
    document.body.appendChild(div)
    if (typeof callback === 'function') {
      callback(div)
    }
  }
}
appendDiv(function(node) {
  node.style.display = 'none'
})
```

#### 高阶函数实现AOP

#### curry化

#### uncurry化

在JavaScript中，当我们调用对象的某个方法时，其实不用关心该对象原本是不是被设计拥有这个方法，这是动态类型语言的特点，也就是常说的鸭子类型思想。

一个对象未必只能使用它自身的方法，我们可是使用call 和 apply完成这个需求

```

var obj1 = {
  name: 'seven'
}

var obj2 = {
  getName: function() {
    return this.name
  }
}

console.log(obj2.getName.call(obj1))
```

那么如何把泛化this的过程提取出来呢，JavaScript之父Brendan Eich在2011年发表的一篇twitter，下面是uncurrying实现方法之一



```
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
```

##### 函数节流

