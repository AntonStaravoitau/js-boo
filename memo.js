var fibonacci1 = (function () {
  let cache={};

  function f(n) {
    let value;

    if(n in cache){
        value = cache[n];
    }else {
      if(n === 1 || n === 0){
        value = n;
      }else {
        value = f(n - 1) + f(n - 2);
      }
      cache[n] = value;
    }

    return value;
  }

  return f;
})();


function fibonacci(n) {

  if (n === 0 || n === 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function memo (fn) {
  var cache = {};

  return function () {
    let args = Array.prototype.slice.call(arguments);
    let value, key;
    key = JSON.stringify(args);

    if(key in cache){
      value = cache[key];
      console.log("memo");
    }else {
      value = fn.apply(this, args);
      cache[key] = value;
      console.log("new");
    }

    return value;
    }
}


let fibonacci2 = memo(fibonacci);

console.log(fibonacci2(5));
console.log(fibonacci2(10));
console.log(fibonacci2(5));
console.log(fibonacci2(10));
