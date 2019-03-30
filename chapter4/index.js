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
