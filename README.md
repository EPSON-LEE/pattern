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

