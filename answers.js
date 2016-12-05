Array.prototype.first = function() {
    return this[0];
};
Array.prototype.last = function() {
    return this[this.length - 1];
};
Array.prototype.skip = function(start) {
    return this.slice(start);
};
Array.prototype.take = function(end) {
    return this.slice(0, end);
};
Array.prototype.while = function(predicate) {
    if (typeof predicate !== "function") {
        console.log("predicate must be a function");
        return this;
    }
    let newArray = [];
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) {
            newArray.push(this[i]);
        } else {
            break;
        }
    }
    return newArray;
};

Array.prototype.toObject = function(predicate) {
    if (typeof predicate !== "function") {
        console.log("predicate must be a function");
        return this;
    }
    let newObject = {};
    let tmpObject, tmpKey, tmpValue;
    for (let i = 0; i < this.length; i++) {
        tmpObject = predicate(this[i], i, this);
        newObject[tmpObject.key] = tmpObject.value;
    }
    return newObject;
};

let arr = [1, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2]
let result = arr.while(function(elem, index, array) {
    return elem < 5;
});



let massiveAttack = [1, 2, 3];

let obj = massiveAttack.toObject(function(elem, index, array) {
    return {
        key: "prop" + index,
        value: elem
    };
});

console.log("array for skip and take [" + arr + "]");
console.log("skip 3: " + arr.skip(3));
console.log("take 2: " + arr.take(2));
console.log("while: " + result); // [1,2,3,4]
console.log(obj);
