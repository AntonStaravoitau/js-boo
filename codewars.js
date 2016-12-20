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
