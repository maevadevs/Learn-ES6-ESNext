// In most C-based languages, variables (or bindings) are created at the spot
// where the declaration occurs
// In JavaScript, where your variables are actually created depends on how you
// declare them
// ES6 offers options to make controlling scope easier
//
// var: Declare variables with Hoisting feature and function-scoped (ES5)
//      Hoisting: Regardless of where it is declared, assume that it is always
//      declared at the top of the function (or the global scope)
function getValue(condition) {
  if (condition) {
    var value = "blue";
    // ...
    return value;
  }
  else {
    // var value exists here: with a value of undefined
    return null;
  }
  // var value exists here: with a value of undefined
}

// This function gets turned into the following because of Hoisting
// So this is similar to the previous function
function getValue(condition) {
  // Variable declaration of value is hoisted at the top of the function
  var value;

  if (condition) {
    value = "blue"; // This is the same value
    // ...
    return value;
  }
  else {
    return null;
  }
}