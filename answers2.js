/**
 * Created by anton on 06.12.2016.
 */
var Libra = {};
(function(module) {
    module.assign = function(target) {
        if (target == null) {
            throw new TypeError('Cannot convert first argument to object');
        }
        let newObject = Object(target);
        let parameters = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < parameters.length; i++) {
            let nextSource = parameters[i];
            if (nextSource === undefined || nextSource === null) {
                continue;
            }
            let keysArray = Object.keys(Object(nextSource));
            for (let j = 0; j < keysArray.length; j++) {
                newObject[keysArray[j]] = nextSource[keysArray[j]]
            }
        }
        return newObject;
    };


    module.inherits = function(Child, Parent) {
        let tmpObj = new Parent(5);
        Child.prototype = tmpObj;
        let newObj = new Child;
        return newObj;
    };

})(Libra);

let obj1 = {
    a: 1,
    b: 2
};
let obj2 = {
    c: 3,
    d: 4
};

let objResult1 = Libra.assign({}, obj1, obj2);
let objResult2 = Libra.assign({}, obj1, obj2, {
    o: 30
}, {
    i: 1
});


function Figure(square) {
    squre = square;
}

function Triangle() {
    let angleCount = 3;
}

let triangle = new Libra.inherits(Triangle, Figure);


console.log(objResult1); // { a: 1, b: 2, c: 3, d: 4}
console.log(objResult2); // { a: 1, b: 2, c: 3, d: 4, o: 30, i: 1 }
console.log(triangle instanceof Figure)

/*
function Animal() {
    eats: true;
};
let animal = new Animal();
function Rabbit(name) {
    this.name = name;
    this.__proto__ = animal;
}
var rabbit = new Rabbit("Кроль");
//alert( rabbit instanceof Animal ); // true, из прототипа
    */
