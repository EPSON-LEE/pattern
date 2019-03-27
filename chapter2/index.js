document.getElementById = (function (func) {
  return function () {
    return func.apply(document, arguments)
  }
})(document.getElementById)
