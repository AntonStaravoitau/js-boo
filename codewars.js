function tribonacci(signature,n){
    //Signature will always contain 3 numbers; n will always be a non-negative number; if n==0, then return an empty array
    let result = signature;
    for(let i = signature.length - 1; i < n; i++){
        result[i+1] = result[i-2] + result[i-1] + result[i];
    }
    return result.slice(0,n);
}

function findShort(s){
  /* x Simple, given a string of words, return the length of the shortest word(s).
  String will never be empty and you do not need to account for different data types.*/
  let stringArray = [], minLength;
  stringArray = s.split(" ");
  minLength = stringArray[0].length;
  for(let i = 1; i < stringArray.length; i++){
    if(minLength > stringArray[i].length){
       minLength = stringArray[i].length;
    }
  }
  return minLength;
}
/*
this is best solution for this task in this site
function findShort(s){
  return Math.min.apply(null, s.split(' ').map(w => w.length));
}
*/

/*Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013).
Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word.
Your task is to convert strings to how they would be written by Jaden Smith.
The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.
Example:
Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"*/
String.prototype.toJadenCase = function () {
  return Array.prototype.join.call(this.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)), " ")
};
