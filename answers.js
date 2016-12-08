(function(module) {
    'use strict'
    module.first = function() {
        return this[0];
    };

    module.last = function() {
        return this[this.length - 1];
    };

    module.skip = function(start) {
        return this.slice(start);
    };

    module.take = function(end) {
        return this.slice(0, end);
    };

    function paramCheckDecorator(type, fn) {
        return function(param) {
            if (typeof param !== type) {
                throw new Error('Predicate should be a function');
            }

            return fn.apply(this, arguments);
        }
    }

    module.while = paramCheckDecorator('function', function(predicate) {
        let newArray = [];

        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i], i, this) === false) {
                return newArray;
            }

            newArray.push(this[i]);
        }

        return newArray;
    });

    module.filter = paramCheckDecorator('function', function(predicate) {
        let newArray = [];

        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i], i, this)) {
                newArray.push(this[i]);
            }
        }
        return newArray;
    });

    module.toObject = paramCheckDecorator('function', function(predicate) {
        let newObject = {};

        for (let i = 0; i < this.length; i++) {
            let tmpObject = predicate(this[i], i, this);
            newObject[tmpObject.key] = tmpObject.value;
        }
        return newObject;
    });

    module.fold = paramCheckDecorator('function', function(predicate, initialValue) {
        let previousValue;
        previousValue = this[0] + initialValue;

        for (let i = 1; i < this.length; i++) {
            previousValue = predicate(previousValue, this[i], i, this);
        }
        return previousValue;
    });

    module.transform = paramCheckDecorator('function', function(predicate) {
        let newArray = [];

        for (let i = 0; i < this.length; i++) {
            newArray.push(predicate(this[i], i, this));
        }
        return newArray;
    });

    module.each = paramCheckDecorator('function', function(predicate) {
        for (let i = 0; i < this.length; i++) {
            predicate(this[i], i, this);
        }
        return this;
    });

    module.find = paramCheckDecorator('function', function(predicate) {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i], i, this) === true) {
                return this[i];
            }
        }

        return undefined;
    });

    module.findLast = paramCheckDecorator('function', function(predicate) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate(this[i], i, this) === true) {
                return this[i];
            }
        }

        return undefined;
    });

    module.findIndex = paramCheckDecorator('function', function(predicate) {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i], i, this) === true) {
                return i;
            }
        }

        return -1;
    });

    module.findIndexLast = paramCheckDecorator('function', function(predicate) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate(this[i], i, this) === true) {
                return i;
            }
        }

        return -1;
    });

})(Array.prototype);


(function(module) {
    'use strict'
    module.keys = function() {
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        let result = [],
            prop;
        for (prop in this) {
            if (hasOwnProperty.call(this, prop)) {
                result.push(prop);
            }
        }
        return result;
    };

    module.values = function() {
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        let result = [],
            prop;
        for (prop in this) {
            if (hasOwnProperty.call(this, prop)) {
                result.push(this[prop]);
            }
        }
        return result;
    };

    module.entries = function() {
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        let result = [],
            prop;
        for (prop in this) {
            if (hasOwnProperty.call(this, prop)) {
                let tmp = [];
                if (hasOwnProperty.call(obj, prop)) {
                    tmp.push(prop);
                    tmp.push(obj[prop]);
                    result.push(tmp);
                }
            }
        }
        return result;
    };

})(Object.prototype);


(function(module) {
    'use strict'

    function paramCheckDecorator(fn) {
        return function(obj) {
            if (obj !== undefined && typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            return fn.apply(this, arguments);
        }
    }

    module.keys = paramCheckDecorator(function(obj) {
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        let result = [],
            prop;
        if (obj !== undefined) {
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }
            return result;
        }
    });

    module.values = paramCheckDecorator(function(obj) {
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        let result = [],
            prop;
        if (obj !== undefined) {
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(obj[prop]);
                }
            }
            return result;
        }
    });

    module.entries = paramCheckDecorator(function(obj) {
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        let result = [],
            prop;
        if (obj !== undefined) {
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push([prop, obj[prop]])
                }
            }
            return result;
        }
        return result;
    });


})(Object);



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



let accum = arr.fold(function(previousValue, currentValue) {
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
console.log("find " + arr.find(function(elem, index, array) {
    return elem < 5;
}));
console.log("findLast " + arr.findLast(function(elem, index, array) {
    return elem < 5;
}));
console.log("findIndex: " + arr.findIndex(function(elem, index, array) {
    return elem < 5;
}));
console.log("findIndexLast: " + arr.findIndexLast(function(elem, index, array) {
    return elem < 5;
}));

console.log(Object.keys(obj));
console.log(obj.values());
console.log(Object.entries(obj));
