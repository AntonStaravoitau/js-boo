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

Array.prototype.filter = function(predicate) {
    if (typeof predicate !== "function") {
        console.log("predicate must be a function");
        return this;
    }
    let newArray = [];
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) {
            newArray.push(this[i]);
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

Array.prototype.fold = function(predicate, initialValue) {
    if (typeof predicate !== "function") {
        console.log("predicate must be a function");
        return this;
    }
    let previousValue, currentValue;
    if (typeof initialValue === 'number' && initialValue === initialValue) {
        previousValue = this[0] + initialValue;
    } else {
        previousValue = this[0];
    }
    for (let i = 1; i < this.length; i++) {
        previousValue = predicate(previousValue, this[i], i, this);
    }
    return previousValue;
};

Array.prototype.transform = function(predicate) {
    if (typeof predicate !== "function") {
        console.log("predicate must be a function");
        return this;
    }
    let newArray = [];
    for (let i = 0; i < this.length; i++) {
        newArray[i] = predicate(this[i], i, this);
    }
    return newArray;
};

Array.prototype.each = function(predicate) {
    if (typeof predicate !== "function") {
        console.log("predicate must be a function");
        return this;
    }
    for (let i = 0; i < this.length; i++) {
        predicate(this[i], i, this);
    }
    return this;
};


let arr = [1, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2]
let result = arr.while(function(elem, index, array) {
    return elem < 5;
});

let result2 = arr.filter(function(elem, index, array) {
    return elem < 5;
});

let massiveAttack = [1, 2, 3];

let obj = massiveAttack.toObject(function(elem, index, array) {
    return {
        key: "prop" + index,
        value: elem
    };
});

let accum = arr.fold(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
}, 5);

let numbers = [1, 4, 9];
let roots = numbers.transform(Math.sqrt);

function logArrayElements(element, index, array) {
    console.log('a[' + index + '] = ' + element);
}

console.log("array for skip and take [" + arr + "]");
console.log("skip 3: " + arr.skip(3));
console.log("take 2: " + arr.take(2));
console.log("while: " + result);
console.log("filter: " + result2);
console.log(obj);
console.log("fold: " + accum);
console.log("transform: " + roots);
console.log("each :");
numbers.each(logArrayElements);
