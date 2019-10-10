/* eslint-disable no-useless-call */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-new-func */
/* eslint-disable no-unused-vars */

// OVERVIEW
// ********
//  Prior to ES6, JavaScript functions hasn’t changed much since the language was created
//  ES6 functions make a big leap forward
//  A number of incremental improvements on top of ES5 functions
//  Make programming in JavaScript less error-prone and more powerful

// DEFAULT PARAMETERS VALUE
// ************************
//  JavaScript functions allow any number of parameters to be passed,
//  regardless of the number of parameters declared in the function definition

// SIMULATING DEFAULT PARAMETERS IN ES5
// ************************************
//  The flaw in this implementation is that timeout could be 0, interpreted as falsy

function makeRequest1 (url, timeout, callback) {
  timeout = timeout || 2000 // 0 || 2000 => false
  callback = callback || function () {}
  // ...
}

// Another alternative was to use typeof
//  While this approach is safer, it still requires a lot of extra code for a very basic operation

function makeRequest2 (url, timeout, callback) {
  timeout = (typeof timeout !== 'undefined') ? timeout : 2000
  callback = (typeof callback !== 'undefined') ? callback : function () {}
  // ...
}

// BETTER DEFAULT PARAMS WITH ES6
// ******************************
//  We simply give the parameters a default value in the function definition
//  This function only expects the first parameter to always be passed
//  The other two parameters have default values
//    - url is required
//    - The two parameters with a default value are considered optional

function makeRequest3 (url, timeout = 2000, callback = function () {}) {
  // ...
}

// Any arguments can be set to have a default
//  If middle arguments are set with default, they can be set with 'undefined' when calling
//  A value of `null` is considered to be valid

function makeRequest4 (url, timeout = 2000, callback) {
  // ...
}
makeRequest4('http://google.com', undefined, function () { /* ... */ })

// The behavior of the `arguments` object is different when default parameter values are present
//  In strict mode, the `arguments` object does not reflect changes to the named parameters
//  The `arguments` object in a function using ES6 default parameter values
//  will always behave in the same manner as ES5 strict mode

// The default value need not be a primitive value
//  We could execute a function to retrieve the default parameter value

function getValue () {
  return 5
}

function add (first, second = getValue()) {
  return first + second
}

// NOTE:
//  Be careful when using function calls as default parameter values
//  If you forget the parentheses, such as `second = getValue` instead of `second = getValue()`,
//  you are passing a reference to the function rather than the result of the function call

// We could also use a previous parameter as the default for a later parameter
// NOTE:
//  The ability to reference parameters from default parameter assignments works only for previous arguments
//  so earlier arguments do not have access to later arguments

function add1 (first, second = first) {
  return first + second
}

// DEFAULT PARAMETER VALUES WITH TDZ
// *********************************

// Default parameter values also have a TDZ where parameters cannot be accessed
//  Each parameter creates a new identifier binding that can’t be referenced before
//  initialization without throwing an error
//  They behave like 'let'
//  Parameter initialization happens when the function is called
//  Either by passing a value for the parameter or by using the default parameter value

// WORKING WITH UNNAMED PARAMETERS
// *******************************
//  JavaScript functions do not limit the number of parameters that can be passed to
//  the number of named parameters defined (The `arguments` object)
//  You can always pass fewer or more parameters than formally specified

// SIMULATING UNNAMED PARAMETERS IN ES5
// ************************************
//  Unnamed parameters are captured by the `arguments` object
//  While inspecting arguments works fine in most cases, this object can be a little
//  cumbersome to work with

function pick (object) {
  const result = Object.create(null)
  // Start at the second parameter
  for (let i = 1, len = arguments.length; i < len; i++) {
    result[arguments[i]] = object[arguments[i]]
  }
  return result
}
const book = {
  title: 'Understanding ECMAScript 6',
  author: 'Nicholas C. Zakas',
  year: 2015
}
const bookData = pick(book, 'author', 'year')

console.log(bookData.author) // 'Nicholas C. Zakas'
console.log(bookData.year) // 2015

// 1. It’s not at all obvious that the function can handle more than one parameter
// 2. Because the first parameter is named and used directly, when you look for the
//    properties to copy, you have to start in the arguments object at index 1
//    instead of index 0

// BETTER UNNAMED PARAMETERS IN ES6: REST PARAMETER
// ************************************************
//  Indicated by ... preceding a named parameter
//  The named parameter becomes an Array containing the rest of the parameters passed
//  to the function

function pick2 (object, ...everythingElse) {
  const result = Object.create(null)
  for (let i = 0, len = everythingElse.length; i < len; i++) {
    result[everythingElse[i]] = object[everythingElse[i]]
  }
  return result
}

// You can tell right away by looking at the function that it is capable of handling
// any number of parameters

// NOTE: Rest parameters do not count for a function’s `length` property
//  `func.length` indicates the number of named parameters for the function
//  Any argument passed as rest parameter is not counted toward `func.length`

// RESTRICTIONS FOR REST PARAMETER
// *******************************
//  1. There can be only one rest parameter
//  2. The rest parameter must be last
//  3. rest parameters cannot be used in an object literal setter: because object literal
//     setters are restricted to a single argument

// function pick (object, ...keys, last) { /* ... */ } // => Syntax Error: Can't have a named parameter after rest parameters
// let object = {
//   set name(...value) { /* ... */ } // => Syntax error: Can't use rest param in setter
// }

// REST PARAMETER VS `arguments`
// *****************************
//  Rest parameters were designed to replace `arguments` in ES6
//  But `arguments` is not removed from the language
//  The `arguments` object works together with rest parameters by reflecting the arguments that
//  were passed to the function when called

function checkArgs (...rest) {
  console.log(rest.length)
  console.log(arguments.length)
  console.log(rest[0], arguments[0])
  console.log(rest[1], arguments[1])
}
checkArgs('a', 'b')
// 2
// 2
// a a
// b b

// The arguments object always correctly reflects the parameters that were passed into a function
// regardless of rest parameter usage

// BETTER FUNCTION CONSTRUCTOR
// ***************************
// The `Function()` constructor is an infrequently used part of JavaScript that allows you to
// dynamically create a new function
// In ES6:
//  `Function()` constructor is allowed default parameters and rest parameters
//  For Rest parameters, just add the ... before the last parameter

const add2 = new Function('first', 'second = first', 'return first + second')
const pickFirst = new Function('...args', 'return args[0]')

// SPREAD OPERATOR
// ***************
//  The `rest` parameter allows you to specify that multiple independent arguments should
//  be combined into an array
//  The spread operator allows you to specify an array that should be split and have its
//  items passed in as separate arguments to a function
//  The JavaScript engine splits the array into individual arguments and passes them to
//  the function
//  We can mix and match the spread operator with other arguments as well
//  You’ll likely find it to be a suitable replacement for the `apply()` method in most
//  circumstances

const values = [25, 50, 75, 100, 1, 45, 67, 78, 43, 23, 0, 31]
const extraValues = [1, 2, 3, 4, 500, 600, 700, 800]
console.log(Math.max(...values)) // => 100
console.log(Math.max(...extraValues, ...values, 0)) // => 800

// `name` PROPERTY
// ***************
//  Identifying functions can be challenging in JavaScript given the various ways a function
//  can be defined
//  Anonymous function expressions makes debugging a bit more difficult
//  ECMAScript 6 adds the `name` property to all functions
//  All functions in an ECMAScript 6 program will have an appropriate value for their name property

function namedFunc1 () {
  return true
}
const namedFunc2 = () => true

console.log(namedFunc1.name) // => "namedFunc1"
console.log(namedFunc2.name) // => "namedFunc2"

// Special Cases of the `name` Property
// If the function expression itself has a name, that name takes priority over the variable
// to which the function was assigned

const aFunc = function anotherFunc () { return true }
console.log(aFunc.name) // => anotherFunc

// GetterSetter function: Includes the `get` or `set` parts as part of the name
// Regular methods are just the name of the method
// Both getter and setter functions must be retrieved using Object.getOwnPropertyDescriptor()

const person = {
  firstName: 'John',
  lastName: 'Smith',
  get name () {
    return `${this.firstName} ${this.lastName}`
  },
  sayName () {
    return `${this.firstName} ${this.lastName}`
  }
}

console.log(person.sayName.name) // => sayName
console.log(Object.getOwnPropertyDescriptor(person, 'name').get.name) // => get name

// Functions created using bind() will have their names prefixed with "bound"
// Functions created using the Function() constructor have a name of "anonymous"

const doSomething = () => true

console.log(doSomething.bind().name) // "bound doSomething"
console.log((new Function()).name) // "anonymous"

// NOTE:
//  The value of name for any function does not necessarily refer to a
//  variable of the same name
//  The name property is meant to be informative, to help with debugging

// CLARIFYING THE DUAL PURPOSE OF FUNCTIONS
// ****************************************
//  Factory Function vs Constructor Function
//  Functions can be callable with or without `new`
//  Can be a function call or a Constructor call
//  NOTE: If the function makes use of `this`, calling the function without `new`
//  will create properties on the global object (as the `this` reference)
//  Capitalization of Person is the only real indicator that the function
//  is meant to be called using `new`
//  This confusion over the dual roles of functions led to some changes in ES6
//  JavaScript has two different internal-only methods for functions: [[Call]] and [[Construct]]
//    - When a function is called without `new`, the [[Call]] method is executed
//    - When a function is called with `new`, that’s when the [[Construct]] method is called
//  Not all functions have [[Construct]], and therefore not all functions can be called with `new`
//  Arrow functions do not have a [[Construct]] method

// HOW A FUNCTION WAS CALLED IN ES5
// ********************************
//  The most popular way to determine if a function was called with `new` in ES5 is to use `instanceof`
//  Unfortunately, this approach is not completely reliable because `this` can still be an instance of
//  `Person` without using `new`

function Person (name) {
  if (this instanceof Person) {
    this.name = name // using new
  } else {
    throw new Error('You must use `new` with `Person`')
  }
}
const person1 = new Person('Nicholas')
let notAPerson = Person('Nicholas') // throws error
const notAPerson2 = Person.call(person1, 'Michael') // works!

// `new.target` META-PROPERTY
// **************************
//  ES6 introduces the `new.target` metaproperty
//  It is a property of a non-object that provides additional information
//  related to its target (such as `new`)
//  - When a function’s [[Construct]] method is called, `new.target` is filled
//    with the target of the `new` operator: typically the constructor of the newly
//    created object instance that will become `this` inside the function body
//  - If [[Call]] is executed, then `new.target` is `undefined`
//  Now, we can safely detect if a function is called as a Factory or as a Constructor

function Person2 (name) {
  if (typeof new.target !== 'undefined') {
    // using new: Constructor
    this.name = name
  } else {
    // using as Factory
    throw new Error('You must use `new` with `Person`.')
  }
}
const person2 = new Person2('Nicholas')
notAPerson = Person2.call(person, 'Michael') // error!
notAPerson = Person2('Nicholas') // throws error

function Person3 (name) {
  if (new.target === Person3) {
    // using new: Constructor
    this.name = name
  } else {
    // using as Factory
    throw new Error('You must use `new` with `Person`.')
  }
}

// NOTE: Using `new.target` outside of a function is a syntax error

// BLOCK-LEVEL FUNCTIONS
// *********************
//  In ES3, a function declaration occurring inside of a block was a syntax error
//  It is considered a best practice to avoid function declarations inside of blocks
//  ES5 strict mode introduced an error when a function declaration was used inside of a block

const condition = true
if (condition) {
  // In ES5 Strict-Mode, this throws a syntax error
  // In ES6, this is considered a block-level declaration
  function doSomething1 () {
    return true
  }
}

// In ES6, this is considered a block-level declaration
// The function can only be accessed and called within the declaration block

// "use strict"
if (condition) {
  console.log(typeof doSomething1) // ES5 Function Statement Hoisted: "function"
  function doSomething1 () {
    return true
  }
  // Call within the same block
  doSomething1() // => true
}
console.log(typeof doSomething1) // => "undefined"

// WHEN TO USE BLOCK-LEVEL FUNCTIONS
// *********************************
//  Block-Level functions statement are similar to `let` function expressions
//  Function definition is removed once execution flows out of the block in
//  which it’s defined
//  The key difference is that block level functions are hoisted to the top
//  of the containing block while `let` function expressions enters the TDZ
//  until they are declared

// "use strict"
if (condition) {
  // console.log(typeof doSomething1) // throws error: doSomething is currently in the TDZ
  const doSomething1 = function () {
    return true
  }
  doSomething1()
}
console.log(typeof doSomething1) // => "undefined"

// BLOCK-LEVEL FUNCTIONS IN NON-STRICT MODE
// ****************************************
//  The behavior is slightly different
//  Instead of hoisting these declarations to the top of the block, they are hoisted all
//  the way to the containing function or global environment
//  This behavior is to remove the incompatible browser behaviors that previously existed

// ES6 behavior
if (condition) {
  console.log(typeof doSomething) // "function" because hoisted to global
  function doSomething () {
    return true
  }
  doSomething()
}
console.log(typeof doSomething) // "function" because it exist in this context from hoisting

// ARROW FUNCTION EXPRESSIONS
// **************************
//  Anonymous functions
//  Arrow functions behave differently than traditional JavaScript functions
//  - No `this`, `super`, `arguments`, and `new.target` bindings: Their value is by the closest containing non-arrow function
//  - Cannot be called with `new`: Arrow functions do not have a [[Construct]] method. Throw an error when used with `new`
//  - No prototype: The `prototype` property of an arrow function doesn’t exist
//  - Can’t change `this`: The value of `this` inside of the function can’t be changed
//  - No `arguments` object: Rely only on named and rest parameters to access function arguments
//  - No duplicate named parameters: Cannot have duplicate named parameters in strict or nonstrict mode
//
//  `this` binding is a common source of error in JavaScript: arrow functions eliminate this confusion
//  With a single `this` value, JavaScript engines can more easily optimize these operations
//  Reducing errors and ambiguities inside of arrow functions
//  NOTE: Arrow functions also have a `name` property that follows the same rule as other functions

const reflect1 = value => value
const reflect2 = (value) => value
const reflect3 = value => { return value }
const reflect4 = function (value) { return value }

const sum1 = (num1, num2) => num1 + num2
const sum2 = (num1, num2) => { return num1 + num2 }
const sum3 = function (num1, num2) { return num1 + num2 }

const getName1 = () => 'Nicholas'
const getName2 = () => { return 'Nicholas' }
const getName3 = function () { return 'Nicholas' }

const doNothing1 = () => {}
const doNothing2 = function () {}

const returnEmptyObject1 = () => ({})
const returnEmptyObject2 = function () { return {} }

const returnRegObject1 = id => ({ id: id, name: 'Temp' })
const returnRegObject2 = (id) => ({ id: id, name: 'Temp' })
const returnRegObject3 = function (id) {
  return {
    id: id,
    name: 'Temp'
  }
}

// IIFE WITH ARROW FUNCTION
// ************************

// Example of IIFE in ES5
const person3 = (function (name) {
  return {
    getName: function () {
      return name
    }
  }
})('Nicholas')

console.log(person3.getName()) // => "Nicholas"

// Example of IIFE in ES6
// Since Arrow Function is an expression, parenthesis is required
const person4 = (name => ({ getName: () => name }))('Nicholas')

console.log(person4.getName()) // => "Nicholas"

// NO `this` BINDING
// *****************
//  One of the most common areas of error in JavaScript is the binding
//  of `this` inside of functions
//  The value of `this` can change inside a single function depending
//  on the context in which the function is called
//  It is possible to mistakenly affect one object when you meant to affect another

const PageHandler1 = {
  id: '123456',
  init: function () {
    document.addEventListener('click', function (event) {
      this.doSomething(event.type) // Mistake: => error
    }, false)
  },
  doSomething: function (type) {
    console.log('Handling ' + type + ' for ' + this.id)
  }
}

// The call to `this.doSomething()` is broken because `this` is a reference to
// the object that was the target of the event (in this case `document`),
// instead of being bound to `PageHandler`
// We could fix this by binding the value of this to `PageHandler` explicitly using the `bind()`

const PageHandler2 = {
  id: '123456',
  init: function () {
    document.addEventListener('click', function (event) {
      this.doSomething(event.type) // No error: Appropriate explicit binding
    }.bind(this), false)
  },
  doSomething: function (type) {
    console.log(`Handling ${type} for ${this.id}`) // No error
  }
}

// But it is a little bit strange
// By calling `bind(this)`, you’re actually creating a new function whose `this`
// is bound to the current `this`, which is `PageHandler`.
// To avoid creating an extra function, a better way to fix this code is to use
// an arrow function
// Arrow functions have no `this` binding, so `this` is always passed-thru from the scope-chain
//  - If the arrow function is contained within a non-arrow function, `this` will be the same
//    as the containing function's `this`
//  - Otherwise, `this` is equivalent to the value of `this` in the global scope

const PageHandler3 = {
  id: '123456',
  init: function () {
    // this === PageHandler
    document.addEventListener('click', event => {
      // Pass-thru: this === PageHandler
      this.doSomething(event.type) // No error: Binding passed thru from scope
    }, false)
  },
  doSomething: function (type) {
    // this === PageHandler
    console.log(`Handling ${type} for ${this.id}`) // No error
  }
}

// Since the `this` value is determined by the containing function in which
// the arrow function is defined, you cannot change the value of `this` using
// `call()`, `apply()`, or `bind()`

// CANNOT BE USED AS CONSTRUCTOR
// *****************************
//  Arrow functions are designed to be “throw-away” functions, and so cannot
//  be used to define new types: missing `prototype` property
//  An arrow function has no [[Construct]] behavior
//  If you try to use the `new` operator with an arrow function, you’ll get an error

const MyType = () => {}
const object = new MyType() // => Error - you can't use arrow functions with `new`

// ARROW FUNCTIONS AND ARRAY
// *************************
//  Arrow functions are ideal for processing arrays
//  Example of Array Processing with ES5 Function

var result = values.sort(function (a, b) {
  return a - b
})

// Example of Array Processing with ES6 Arrow Function

const result1 = values.sort((a, b) => a - b)

// This is applicable to all other Array methods

// NO `arguments` BINDING
// **********************
//  Even though arrow functions don’t have their own `arguments` object,
//  it’s possible for them to access the `arguments` object from a containing function

function createArrowFunctionReturningFirstArg () {
  return () => arguments[0] // Return a function
}
const arrowFunction = createArrowFunctionReturningFirstArg(5)
console.log(arrowFunction()) // => 5

// Even though the arrow function is no longer in the scope of the function that created it,
// `arguments` remains accessible due to scope chain resolution of the `arguments` identifier

// IDENTIFYING ARROW FUNCTIONS
// ***************************
//  Arrow functions are identified as functions

const comparator = (a, b) => a - b
console.log(typeof comparator) // "function"
console.log(comparator instanceof Function) // true

// We can still use `call()`, `apply()`, and `bind()` on arrow functions,
// although the `this` binding of the function will not be affected
// Therefore, this is pretty much unnecessary

const sum = (num1, num2) => num1 + num2

console.log(sum.call(null, 1, 2)) // 3: Unchanged
console.log(sum.apply(null, [1, 2])) // 3: Unchanged
// Using bind() method to create boundSum()
// Attempting to bind `this` to `null`
const boundSum = sum.bind(null, 1, 2)
console.log(boundSum()) // 3: Unchanged

// Arrow functions are appropriate to use anywhere you’re currently using an
// anonymous function expression, such as with callbacks

// TAIL CALL OPTIMIZATION
// **********************
//  A tail call is when a function is called as the last statement in another function
//  Tail calls as implemented in ES5 engines are handled just like any other function call
//  A new stack frame is created and pushed onto the call stack to represent the function call
//  Every previous stack frame is kept in memory, which is problematic when the call stack gets too large

function doSomethingAgain () {
  // ... A bunch of codes here...
  return doSomethingElse() // tail call
}
function doSomethingElse () {}

// ES6 reduces the size of the call stack for certain tail calls in strict mode
// Instead of creating a new stack frame for a tail call, the current stack frame
// is cleared and reused so long as the following conditions are met:
//  1. The tail call does not require access to variables in the current stack frame: The function is not a closure
//  2. The function making the tail call has no further work to do after the tail call returns
//  3. The result of the tail call is returned as the function value

// Not returning the result, results in an unoptimized function

function doSomething3 () {
  // not optimized - no return
  doSomethingElse()
}

// A common way to inadvertently turn off optimization is to store the result of a
// function call in a variable and then return the result

function doSomething4 () {
  // not optimized - call isn't in tail position
  const result = doSomethingElse()
  return result
}

// If you have a function that performs an operation after returning from the tail call
// then the function can’t be optimized

function doSomething5 () {
  // not optimized - must add after returning
  return 1 + doSomethingElse()
}

// The hardest situation to avoid is in using closures
// Because a closure has access to variables in the containing scope,
// tail call optimization may be turned off

function doSomething6 () {
  const num = 1
  const func = () => num
  // not optimized - function is a closure
  return func()
}

// In practice, tail call optimization happens behind-the-scenes, so you don’t
// need to think about it unless you’re trying to optimize a function

// HARNESSING TAIL CALL OPTIMIZATION
// *********************************
//  The primary use case for tail call optimization is in recursive functions
//  That is where the optimization has the greatest effect

function factorial (n) {
  if (n <= 1) {
    return 1
  } else {
    // not optimized - Rule #2. must multiply after returning
    // If n is a very large number, the call stack size will
    // grow and could potentially cause a stack overflow
    return n * factorial(n - 1)
  }
}

// To optimize the function, ensure that the multiplication doesn’t
// happen after the last function call
// move the multiplication operation outside of the return statement

function factorialOptimized (n, p = 1) {
  if (n <= 1) {
    return 1 * p
  } else {
    const result = n * p // Multiplication moved outside. Default value given to p
    return factorial(n - 1, result) // optimized
  }
}

// Tail call optimization is something you should think about whenever you’re writing
// a recursive function: it can provide a significant performance improvement, especially
// when applied in a computationally-expensive function

// SUMMARY
// *******
//  - Default Function Parameters
//  - Rest Parameters
//  - Spread Operator
//  - `name` Property
//  - Block-Level Functions
//  - `[[Call]]` and `[[Construct]]` and `new.target`
//  - Arrow Functions
//  - Tail call optimization
