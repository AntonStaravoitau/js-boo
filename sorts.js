function quickSort(A) {
  if (A.length === 0) {
    return [];
  }
  if (A.length === 1 || (A.length === 2 && A[0] === A[1])) {
    return A;
  }
  let p = A.findBasePoint();
  let leftPart = [],
      rightPart = [];
  for (let i = 0; i < A.length; i++) {
    if (A[i] < p) {
      leftPart.push(A[i]);
    } else {
      rightPart.push(A[i]);
    }
  }
  return quickSort(leftPart).concat(quickSort(rightPart));
}

Array.prototype.findBasePoint = function() {
  let p = 0;
  if (this.length == 0) {
    return undefined;
  }
  for (let i = 0; i < this.length; i++) {
    p += this[i];
  }
  return p / this.length;
};


let unsortArray = [7, 5, 9, 12, 24, 12, 2, 1, 6, 5];
let sortArray = quickSort(unsortArray);
console.log(sortArray);
 5];
let sortArray = quickSort(unsortArray);
console.log(sortArray);
