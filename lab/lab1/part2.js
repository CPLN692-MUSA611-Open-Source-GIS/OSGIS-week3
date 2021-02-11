/* =====================
# Lab 1, Part 2 — Functions as Values
Functions that `return` can be passed as values to other functions. Each exercise here builds on that theme.
===================== */

/* =====================
Instructions: Write a function that *always* returns the number 1.
===================== */

var justOne = function() {
    return 1;
};

console.log('justOne success:', justOne() === 1);

/* =====================
Instructions: Write a function that returns true if a number is even.
===================== */

var isEven = function(num) {
    return num%2 === 0;
};

console.log('isEven success:', isEven(2) === true && isEven(3) === false);

/* =====================
Instructions: Write a function that *always* returns false.
              Use functions "justOne" and "isEven" somehow in the definition.
===================== */

var justFalse = function() {
    return isEven(justOne());
};

console.log('justFalse success:', justFalse() === false);

/* =====================
Instructions: Write a function that takes a boolean value and returns its opposite.
===================== */

var not = function(boo) {
    return !boo;
};

console.log('not success:', not(true) === false);

/* =====================
Instructions: Write a function that returns true if a number is odd
              Use functions "isEven" and "not" somehow in the definition.
===================== */

var isOdd = function(num) {
    return !isEven(num);
};

console.log('isOdd success:', isOdd(4) === false);

/* =====================
Instructions: Write a function that takes a list of numbers and returns a list with only numbers above 10
===================== */

var filterOutLessThan10 = function(array) {
    return array.filter(
         function(v){return v>10})
};
// The function 'arraysEqual' (which it is also your task to define!) is necessary because
// ([4] === [4]) is *false* in javascript(!!!)
// Use google + stackoverflow to figure out how to define a function which returns true given two equal arrays
function arraysEqual(a, b) {
    //console.log(a.sort())
    //a = a.sort();
    //b = b.sort();
    if(a.length != b.length){
        return false;
    }
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
        return false;
    }
    return true;
}
console.log('filterOutLessThan10 success:', arraysEqual(filterOutLessThan10([4, 11]), [11]));

/* =====================
Stretch goal
Instructions: Let's bring it all together. Write a function that filters a list with a predicate you provide. It takes:
              1. a list of values (to be filtered)
              2. a function that takes a value and returns true (to keep a number) or false (to toss it out)
===================== */

var filter = function(array, func) {
    return array.filter(func)
};

console.log('filter success:', arraysEqual(filter([4, 11], isOdd), [11]));
