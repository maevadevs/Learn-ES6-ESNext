/* jshint esversion: 6 */ // => This line is for JSHint

// - In most C-based languages, variables (or bindings) are created at the spot
//   where the declaration occurs.
// - In JavaScript, where your variables are actually created depends on how you
//   declare them.
// - ES6 offers options to make controlling scope easier.
//
// var: Declare variables with Hoisting feature and function-scoped (ES5.)
//      Hoisting: Regardless of where it is declared, assume that it is always
//      declared at the top of the function (or the global scope.)
//      The initialization remain in the same spot.
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
// This getValue() function gets turned into the following because of Hoisting.
// So this is the same as the previous function.
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

// Misunderstanding this unique behavior can end up causing bug.
// ES6 introduces block level scoping options to make the controlling a lifecycle
// a little more powerful.

// ES6 Block-level Declaration:
//  Block scope now exist in ES6.
//  A block-level scope is either within a function or within {} blocks.
//
//  let:  Variables with block-level scope are declared with this keyword.
//        There is no hoisting with "let".
//        Always place the declaration at the top of the block so that they are
//        available throughout the entire block.
function getValue(condition) {
  if (condition) {
    let value = "blue"; // Only defined within the if {} block
    // ...
    return value;
  }
  else {
    // "value" doesn't exist here
    return null;
  }
  // "value" doesn't exist here
}

// No Redeclaration of Identifier:
//  We cannot redeclare an identifier more than once.
//  If an identifier already exists as a "var", it cannot be declared again as a
//  "let". And vice-versa.
var count = 30;
let count = 40; // => Syntax error
let name = "john";
var name = "mary"; // => Syntax error

// Redeclaration only works if it is within two different scope
if (condition) {
  let name = "june"; // Not an error because this is within the block if {} scope.
}

// ES6 Constants:
//  const:  Constants with block-level scope are declared with this keyword.
//          Their values cannot be changed once set.
//          Every const variable must be initialized on declaration.
//          No Redeclaration of identifier also applies to "const".
const GREETINGS = "Hello, world!";
const GREET;  // => Syntax error because it must be initialized at declaration.

function test() {
  if (condition) {
    const MAX = 5;
    // ...
  }
  // MAX is undefined here
}
const count = 5;  // => Syntax error: "count" has already been defined with var.
const name = "Max"; // => Syntax error: "name" has already been defined with let.
const NAME = "Max";

// We cannot reassign constants
NAME = "John"; // => Error: Cannot reassign a constant.
// However, a const declaration prevents modification of the binding and not of
// the value itself. That means const declarations for objects do not prevent
// modification of those objects.
const PERSON = { name: "Nicholas" };
PERSON.name = "Greg";       // => This works: Change contents, not binding!
PERSON = { name: "Greg" };  // => This is an error: Change binding!

// Temporal Dead Zone (TDZ):
//  A variable declared with either "let" or "const" cannot be accessed until
//  after the declaration. Attempting to do so results in a reference error.
if (condition) {
  console.log(typeof value);  // ReferenceError: value was used before declaration.
  let value = "blue";
  // value is not declared until this point. There is no hoisting.
  // This line is never executed because the previous line throws an error.
  // This line is in the TDZ.
}

// TDZ:  The term is often used to describe why "let" and "const" declarations are
//       not accessible before their declaration.
//       When a JS engine looks through an upcoming block and finds a variable
//       declaration, it either hoists the declaration to the top of the function
//       or global scope (var) or places the declaration in the TDZ (let and const).
//       Any attempt to access a variable in the TDZ results in a runtime error.
//       That variable is only removed from the TDZ, and therefore safe to use,
//       once execution flows to the variable declaration.

// TDZ is only limited within the block:
//  Here, "value" is not in the TDZ when the typeof operation executes because it
//  occurs outside of the block in which value is declared.
//  That means there is no value binding, and typeof simply returns "undefined".
console.log(typeof value);  // => "undefined"
if (condition) {
  let value = "blue";
}

// Block-Binding in Loops:
//  "let" is very useful within "for" loops.
//  The throwaway counter variable (i,j,...) is meant to be only inside the loop.

// In ES5, the throwaway loop variable is accessible outside the loop:
for (var i = 0; i < 10; i++) {
  process(items[i]);
}
// i is still accessible here: i was hoisted
console.log(i); // => 10

// Using ES6 "let" fixes this problem
for (let j = 0; j < 10; j++) {
  process(items[j]);
}
// i is not accessible here
console.log(j); // => undefined

// Functions in Loops:
//  "var" was problematic with functions within loops.
//  The loop variables are accessible from outside the scope of the loop.
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(function() { console.log(i); }); // "i" should be contained within the callback function
}
funcs.forEach(function(func) {
  func(); // outputs the number "10" ten times instead of 0-9
});
// To fix this problem in ES5, we use immediately-invoked function expressions
// (IIFEs) inside of loops to force a new copy of the variable we want to
// iterate over to be created.
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push((function(value) {
    return function() {
      console.log(value);
    };
  } (i))); // Call callback function immediately
}
funcs.forEach(function(func) {
  func();     // outputs 0, then 1, then 2, up to 9
});
// Using "let" in ES6 is much more simplistic.

// "let" Declaration in Loops:
//  Simplistic mimick of IIFEs
//  On each iteration, the loop creates a new variable and initializes it to the
//  value of the variable with the same name from the previous iteration.
//  Omit the IIFE altogether.
var funcs = [];
for (let i = 0; i < 10; i++) {
  funcs.push(function() { console.log(i); });
}
funcs.forEach(function(func) {
  func();     // => outputs 0, then 1, then 2, up to 9
});
// The let declaration creates a new variable i each time through the loop,
// so each function created inside the loop gets its own copy of i.
// The same is true for for-in and for-of loops.
// Note:
//  Early implementations of "let" did not have this behavior, as it was added
//  later on in the process.
var funcs = [],
    object = {
      a: true,
      b: true,
      c: true
    };
for (let key in object) {
  funcs.push(function() {
    console.log(key);
  });
}
funcs.forEach(function(func) {
  func();     // => outputs "a", then "b", then "c"
});

// "const" Declaration in Loops:
//  It is not disallowed by ES6.
//  There are different behaviors based on the type of loop you’re using.
//  for: Can use "const" in the initialization. Warning is attempt to change value.
//       You can only use "const" to declare a variable in the loop initializer
//       if you are not modifying that variable.
var funcs = [];
for (const i = 0; i < 10; i++) { // throws an error at i++
  funcs.push(function() {
    console.log(i);
  });
}
//  for-in, for-of: "const" behaves the same as a "let"
var funcs = [],
    object = {
      a: true,
      b: true,
      c: true
    };
for (const key in object) { // => doesn't cause an error
  funcs.push(function() {
    console.log(key);
  });
}
funcs.forEach(function(func) {
  func();     // => outputs "a", then "b", then "c"
});
// The only difference is that the value of key cannot be changed inside the loop
// The for-in and for-of loops work with const because the loop initializer
// creates a new binding on each iteration through the loop rather than attempting
// to modify the value of an existing binding

// Global Block Binding:
// The global scope behavior of "let" and "const" are different from "var"
//  var:  Creates a global variable, a property of the global object
//        We could accidentaly overwrite an existing global variable
var RegExp = "Hello!";          // window.RegExp is already a global variable
console.log(window.RegExp);     // "Hello!"
var ncz = "Hi!";                // window.ncz is already a global variable
console.log(window.ncz);        // "Hi!"
// It is safer to use "let" and "const" instead of "var"
//  A new binding is created in the global scope but no property is added to the
//  global object.
//  We cannot overwrite a global variable using "let" or "const".
let RegExp = "Hello!";
// A binding that shadows the global RegExp:
//  window.RegExp and RegExp are not the same, so there is no disruption to the
//  global scope.
//  There is no property RegExp created on the global object
console.log(RegExp);                    // "Hello!"
console.log(window.RegExp === RegExp);  // false
// A binding that shadows the global ncz:
//  window.ncz and ncz are not the same, so there is no disruption to the
//  global scope.
//  There is no property ncz created on the global object
const ncz = "Hi!";
console.log(ncz);                       // "Hi!"
console.log("ncz" in window);           // false

// Emerging Best Practices for Block-Bindings:
//  - Use "let" by default instead of "var"
//  - Use "const" for variables that should be protected from modifications
//  - Much better: Use "const" by default and only use "let" when a variable’s
//    value needs to change.
// Rationale:
//  Most variables should not change their value after initialization because
//  unexpected value changes are a source of bugs.

// Summary:
//  - "let" and "const":
//    # Lexical scoping (Block scoping) in JavaScript.
//    # No hoisting.
//    # Variables cannot be accessed before they are declared (No unintentional
//      undefined).
//    # Temporal Dead Zone (TDZ): Attempting to access a block binding before
//      its declaration results in an error due to the binding presence in the
//      Temporal Dead Zone (TDZ).
//    # Behave similar to "var" except inside loops:
//      for-in and for-of loops create a new binding with each iteration through
//      the loop. Similar for for-loops with "let". "const" declarations in a
//      for-loops may result in an error.
//  - Use "const" by default. Only use "let" when the variable will change.
//    Only use "var" when "let" is not an option.