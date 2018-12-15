// In C-based languages:
// Variables and bindings are created at the spot where the declaration occurs

// In JavaScript:
// Where your variables are created depends on how you declare them

// `var` DECLARATION
// *****************
//  Hoisting feature and function-scoped (ES5)
//  Hoisting:
//    Regardless of where it is declared, assume that it is always declared at
//    the top of the function or the global scope
//    However, the initialization remain at the same spot

function getValue (condition) {
  if (condition) {
    var value = 'blue'
    return value
  } else {
    return null
    // var value still exists here
    // value = undefined
  }
  // var value still exists here
  // value = undefined
}

// The previous getValue() function gets turned into the following because of Variable Hoisting
// So the following is the same as the previous function

function getValue2 (condition) {
  // Variable declaration of value is hoisted at the top of the function
  var value // = undefined
  if (condition) {
    value = 'blue' // This is the same 'value' referenced as above
    return value
  } else {
    return null
  }
}

// Misunderstanding this unique behavior can end up causing bugs
// ES2015 introduces block-level scoping options to make the controlling lifecycle
// a little more powerful

// ES2015 BLOCK-LEVEL DECLARATION
// ******************************
//  Block-level scope now exist in ES2015
//  A block-level scope is either a function or any {...} blocks

// `let` DECLARATION
// *****************
//  Variables with block-level scope are declared with `let` keyword
//  There is still hoisting with 'let', but no implicit initialization (not even to undefined)
//  Attempting to access it before initialization will result in a ReferenceError (TDZ)
//  Tip:
//    Always place the declaration at the top of the block so that they are
//    available throughout the entire block

function getValue3 (condition) {
  if (condition) {
    let value = 'blue' // 'value' is only defined within the if {} block
    return value
  } else {
    // 'value' does not exist in this scope
    return null
  }
  // 'value' does not exist in this scope
}

// NO REDECLARATION OF IDENTIFIERS IN SAME SCOPE
// *********************************************
//  We cannot redeclare an identifier more than once.
//  If an identifier already exists as a 'var', it cannot be declared again as a
//  'let'. And vice-versa.

var count = 30
// let count = 40 // => throw Syntax error
let name = 'john'
// var name = 'mary' // => throw Syntax error

// Redeclaration only works if it is within two different scopes
if (condition) {
  // Not an error because this is within a new block if {...} scope.
  let name = 'june'
}

// ES6 CONSTANTS
// *************
//  Constants with block-level scope are declared with `const` keyword
//  Their binding cannot be changed once set
//  Every `const` variable must be initialized at declaration time
//  There is hoisting with `const`, but no implicit initialization (not even to undefined)
//  Attempting to access it before initialization will result in a ReferenceError (TDZ)
//  No Redeclaration of identifier also applies to `const`
//  NOTE: It is the binding that is constant, not the value
//        An object's properties can still be re-assigned even if the object is constant

const greetings = 'Hello, world!'

// const GREET // => SyntaxError because it must be initialized at declaration
// var greetings = 'Hi' // => SyntaxError because the identifier is already a constant above

function test () {
  if (condition) {
    // const is block-scoped
    const maximum = 5
  }
  // maximum is undefined here
}

// const count = 5 // => SyntaxError: 'count' has already been defined with `var` previously
// const name = 'Max' // => SyntaxError: 'name' has already been defined with `let` previously
const NAME = 'Marc'
// NAME = 'John' // => Error: Cannot reassign a constant

// NOTE
//  A const declaration prevents modification of the binding, not of the value itself
//  Therefore, const declarations for objects do not prevent modification of those objects props

const USER = {
  firstName: 'Nicholas',
  lastName: 'Johnas'
}
USER.firstName = 'Greg' // => This works: Change object props, not object binding!
// USER = { firstName: 'Greg' }  // => This is an error: Changing the object binding!

// NOTE: TEMPORAL DEAD ZONE AND HOISTING
// *************************************
//  A variable declared with either `let` or `const` cannot be accessed until
//  after the declaration. Attempting to do so results in a ReferenceError.
//  It might appear at first that `let` and `const` are not hoisted
//  However, `let` and `const` are actually hoisted (like `var`, `class` and `function`),
//  but there is a period between entering scope and being declared where they cannot be
//  accessed: This is the Temporal Dead Zone
//  The TDZ ends when the variable is declared, rather than assigned

// console.log(someLet) // => Within TDZ: throw ReferenceError
let someLet // let declared: TDZ Ended
console.log(someLet) // => undefined
someLet = 10 // let assigned
console.log(someLet) // => 10

if (condition) {
  console.log(typeof value) // => (TDZ) ReferenceError: value was used before declaration.
  let value // value is not declared until this point: Hoisting falls in TDZ.
  value = 'blue' // This line is never executed because the previous line throws an error.
  // This line is in the TDZ.
}

// HOW THE TDZ WORKS
// *****************
//  The term is not official but often used to describe why `let` and `const`
//  declarations are not accessible before their declaration.
//
//  When a JS engine looks through an upcoming block and finds a variable declaration,
//  it either hoists the declaration to the top of the function or global scope (var)
//  or places the declaration in the TDZ (`let` and `const`).
//  Any attempt to access a variable in the TDZ results in a runtime error.
//  That variable is only removed from the TDZ, and therefore safe to use,
//  once execution flows to the variable declaration.

// NOTE: TDZ is only limited within the block that contains `let` or `const`
//  Here, `value` is not in the TDZ when the `typeof` operation executes because it
//  occurs outside of the block in which `value` is declared.
//  That means there is no value binding, and typeof simply returns `undefined`.

console.log(typeof value) // => 'undefined' because in the global scope
if (condition) {
  console.log(typeof value) // => ReferenceError because within the scope where `value` is defined but TDZ
  let value = 'blue'
}

// BLOCK-BINDING IN LOOPS
// **********************
//  `let` is very useful within `for` loops
//  The throw-away counter variables (i, j, k...) are meant to be used only inside the loop
//  Once exiting the loop, they should be undefined
//  In ES5, the throwaway loop variable is hoisted and accessible outside the loop, unless reset

console.log(i) // => undefined: i was hoisted out of the for loop
for (var i = 0; i < 10; i++) console.log(i)
// i is still accessible here, outside of the loop body
console.log(i) // => 10

// Using ES6 `let` fixes this problem

for (let j = 0; j < 10; j++) {
  // j only exist here, and only hoisted up to this top
  process(items[j])
}
// j is not accessible here
console.log(j) // => undefined

// FUNCTIONS IN LOOPS
// ******************
//  `var` was problematic with functions within loops
//  The loop variables are accessible from outside the scope of the loop

var funcs = []
for (var i = 0; i < 10; i++) {
  funcs.push(function () {
    console.log(i)
  }) // 'i' should be contained within the callback function
}
funcs.forEach(function (func) {
  func() // outputs the number '10' ten times instead of 0-9
})

// To fix this problem in ES5, we use IIFE
// IIFEs inside of loops to force a new copy of the variable we want to
// iterate over to be created.

var funcs = []
for (var i = 0; i < 10; i++) {
  funcs.push((function (value) {
    return function () {
      console.log(value)
    }
  }(i))) // Call callback function immediately
}
funcs.forEach(function (func) {
  func() // outputs 0, then 1, then 2, up to 9
})

// Using `let` in ES6 is much more simple

// `let` DECLARATIONS IN LOOPS
// ****************************
//  Simplistic mimick of IIFEs
//  On each iteration, the loop creates a new variable and initializes it to the
//  value of the variable with the same name from the previous iteration.
//  Omit the IIFE altogether.

let funcs2 = []

for (let i = 0; i < 10; i++) {
  funcs2.push(function () {
    console.log(i)
  })
}
funcs2.forEach(function (func) {
  func() // => outputs 0, then 1, then 2, up to 9
})

// The let declaration creates a new variable i each time through the loop,
// so each function created inside the loop gets its own copy of i.
// The same is true for `for-in` and `for-of` loops.

// NOTE:
//  Early implementations of `let` did not have this behavior, as it was added
//  later on in the process.

let funcs3 = []
let object = {
  a: true,
  b: true,
  c: true
}
for (let key in object) {
  funcs3.push(function () {
    console.log(key)
  })
}
funcs3.forEach(function (func) {
  func() // => outputs 'a', then 'b', then 'c'
})

// `const` DECLARATIONS IN LOOPS
// *****************************
//  It is not disallowed by ES6 but it depends on the situation
//  There are different behaviors based on the type of loop you’re using
//  for: Can use `const` in the initialization. Warning is attempt to change value
//       You can only use `const` to declare a variable in the loop initializer if
//       you are not modifying that variable

let funcs4 = []
for (const i = 0; i < 10; i++) { // => throws an error at i++
  funcs4.push(function () {
    console.log(i)
  })
}
//  for-in, for-of: 'const' behaves the same as a 'let'
let funcs5 = []
let object1 = {
  a: true,
  b: true,
  c: true
}
for (const key in object1) { // => doesn't cause an error
  funcs5.push(function () {
    console.log(key) // => No modification so there is no error
  })
}
funcs5.forEach(function (func) {
  func() // => outputs 'a', then 'b', then 'c'
})

// The only difference is that the value of key cannot be changed inside the loop
// The for-in and for-of loops work with `const` because the loop initializer
// creates a new binding on each iteration through the loop rather than attempting
// to modify the value of an existing binding

// GLOBAL BLOCK BINDING
// ********************
//  The global scope behavior of `let` and `const` are different from `var`
//  `var`:  Creates a global variable as a property of the global object
//          Danger: we could accidentaly overwrite an existing global variable

// var RegExp = 'Hello!' // window.RegExp is already a default global variable
// console.log(window.RegExp) // 'Hello!'
// var ncz = 'Hi!' // window.ncz is already a default global variable
// console.log(window.ncz) // 'Hi!'

// It is safer to always use `let` and `const` instead of `var`
//  A new binding is created in the global scope but no property
//  is added to the global object
//  We cannot overwrite a global variable using `let` or `const`

let RegExp = 'Hello!'

// Now, it is a binding that only shadows the global RegExp
//  window.RegExp and RegExp are not the same, so there is no disruption to the global scope
//  There is no property RegExp created on the global object

console.log(RegExp) // => 'Hello!'
console.log(window.RegExp === RegExp) // => false

// And this is a binding that shadows the global ncz
//  window.ncz and ncz are not the same, so there is no disruption to the global scope.
//  There is no property ncz created on the global object

const ncz = 'Hi!'
console.log(ncz) // 'Hi!'
console.log('ncz' in window) // false

// BEST PRACTICES FOR BLOCK-BINDINGS
// *********************************
//  - Use `let` by default instead of `var`
//  - Use `const` for variables that should be protected from modifications
//  - Much better: Use `const` by default and only use `let` when a variable’s
//    value needs to change.
// Rationale:
//  Most variables should not change their value after initialization because
//  unexpected value changes are a source of bugs.

// SUMMARY
// *******
//  - `let` and `const`
//    # Lexical scoping (Block scoping) in JavaScript
//    # Variables cannot be accessed before they are declared (No unintentional
//      undefined)
//    # Hoisting comes with Temporal Dead Zone (TDZ): Attempting to access a block binding before
//      its declaration results in an error due to the binding presence in the
//      Temporal Dead Zone (TDZ)
//    # Behave similar to `var` except inside loops:
//      for-in and for-of loops create a new binding with each iteration through
//      the loop. Similar for for-loops with `let`. `const` declarations in a
//      for-loops may result in an error.
//  - Use `const` by default. Only use `let` when the variable will change. Don't use `var`.
