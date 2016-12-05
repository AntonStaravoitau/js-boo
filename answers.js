Array.prototype.first = function () { return this[0]; }
Array.prototype.last = function () { return this[this.length-1]; }
Array.prototype.skip = function (start) { return this.slice(start); }
Array.prototype.take = function (end) { return this.slice(0,end); }
Array.prototype.while = function (predicate) {
    if(typeof predicate !== "function"){
        console.log("predicate must be a function");
        return null;
    }
    var newArray = [];
        for(let i = 0; i < this.length; i++){
            if(predicate(this[i],i,this)){
                newArray.push(this[i]);
            }
        }
    return newArray;
}

Array.prototype.toObject = function (predicate) {
    if(typeof predicate !== "function"){
        console.log("predicate must be a function");
        return null;
    }
    var newArray = {};
    for(let i = 0; i < this.length; i++){
        if(predicate(this[i],i,this)){
            newArray.push(this[i]);
        }
    }
    return newArray;
}

/*
 Аналог reduce назвать old
 Аналог map назвать transform
 Аналог forEach назвать each

 и метод toObject пробразуеющий массив в объект

 Example:

 let massiveAttack = [1,2]

 let obj = massiveAttack.toObject(function (elem, index, array) {
 return {
 key: ‘prop’ + index,
 value: elem
 };
 });

 console.log(obj); // => { prop0: 1, prop1: 2}

 */

let arr = [1,2,3,4,5,6,7,8]
let result = arr.while(function (elem, index, array) {
    return elem < 5;
});
console.log(result); // [1,2,3,4]