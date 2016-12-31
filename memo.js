function fibonacci(n) {

  if (n < 0 || typeof(n) !== "number") {
    throw new Error ("Please check the argument");
  }

  if (n === 0 || n === 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

}

function memo (fn) {
  let cache = {};

  return function () {
    let args = Array.prototype.slice.call(arguments);
    let value, key;
    key = JSON.stringify(args);

    if (cache.hasOwnProperty(key)) {
      value = cache[key];
    } else {
      value = fn.apply(this, args);
      cache[key] = value;
    }

    return value;
  }
}

let fibonacci2 = memo(fibonacci);



console.log(fibonacci2(5));
console.log(fibonacci2(10));
console.log(fibonacci2(5));
console.log(fibonacci2(10));