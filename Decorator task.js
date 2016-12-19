/**
 * Created by anton on 19.12.2016.
 */
function argsChecker(func, parametrsArray) {
    return function() {
        if (arguments.length != parametrsArray.length) {
            throw new Error("Wrong count of arguments");
        } else {
            for (let i = 0; i < parametrsArray.length; i++) {
                if ((arguments[i]).constructor !== parametrsArray[i]) {
                    //if(arguments[i].__proto__ !== parametrsArray[i].prototype){
                    throw new Error("Wrong type of " + (i + 1) + " arguments");
                }
            }
        }
        return func.apply(this, arguments);
    }
};





function someFunction() {};
let someFunctionDecorated = argsChecker(someFunction, [String, Number, Array]);

someFunctionDecorated("hello world", 2, [2, 3, 4]); //ok
someFunctionDecorated("hello world", "string instead of number", [2, 3, 4]);
