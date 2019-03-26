/**
 * duck
 */

var duck = {
  duckSing: function() {
    console.log('嘎嘎嘎')
  }
}

var chicken = {
  duckSing: function() {
    console.log('嘎嘎噶')
  }
}

var choir = []

var joinChoir = function(animal) {
  if (animal && typeof animal.duckSing === 'function') {
    choir.push(animal)
    console.log('恭喜加入合唱团')
    console.log('合唱团已有成员数量' + choir.length)
  }
}

joinChoir(duck)
joinChoir(chicken)

/**
 * 多态 polymorphism
 */

 var makeSound = function(animal) {
   animal.sound()
 }

 var Duck = function() {}

 Duck.prototype.sound = function() {
   console.log('嘎嘎嘎')
 }

 var Chicken = function() {
   console.log('咯咯咯')
 }

 makeSound(new Duck())
 makeSound(new Chicken())

 /**
 * 地图
 */

 var googleMap = {
   show: function() {
     console.log('开始渲染google地图')
   }
 }

 var baiduMap = {
  show: function() {
    console.log('开始渲染baidu地图')
  }
}

 var renderMap = function(type) {
   if (type === 'google') {
     googleMap.show()
   } else {
     baiduMap.show()
   }
 }

 renderMap('google')
 renderMap('baidu')

// 进化

 var renderMap = function(map) {
   if (map.show instanceof Function) {
     map.show()
   }
 }

 renderMap(googleMap)
 renderMap(baiduMap)

/**
 * 模拟new的实现
 */
function Person(name) {
  this.name = name
}

Person.prototype.getName = function() {
  return this.name
}

var objectFactory = function() {
  var obj = new Object() // 从Object.prototype上克隆一个空对象
  Constructor = [].shift.call(arguments) // 取外部传入的构造器
  obj.__proto__ = Constructor.prototype // 指向正确的原型
  var ret = Constructor.apply(obj, arguments) //借用外部传入的构造器给obj设置属性
  return typeof ret === 'object' ? ret : obj //保证返回对象
}

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

