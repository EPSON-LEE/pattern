// 代理模式

/**
 * 不适用代理模式 
 */
var Flower = function() {}

var xiaoming = {
  sendFlower: function(target) {
    var flower = new Flower()
    target.receiverFlower(flower)
  }
}

var A = {
  receiverFlower: function(flower) {
    console.log('收到花 ' + flower)
  }
}

xiaoming.sendFlower(A)

/**
 * 使用代理模式
 */

var Flower = function() {}

var xiaoming = {
  sendFlower: function(target) {
    var flower = new Flower()
    target.receiverFlower(flower)
  }
}

var B = {
  receiverFlower: function(flower) {
    A.receiverFlower(flower)
  }
}

var A = {
  receiverFlower: function(flower) {
    console.log('收到花 ' + flower)
  }
}

xiaoming.sendFlower(B)