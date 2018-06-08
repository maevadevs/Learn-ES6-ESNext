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
//  If you forget the parentheses, such as second = getValue instead of `second = getValue()`,
//  you are passing a reference to the function rather than the result of the function call

// We could also use a previous parameter as the default for a later parameter
// NOTE: 
//  The ability to reference parameters from default parameter assignments works only for previous arguments
//  so earlier arguments do not have access to later arguments

function add (first, second = first) {
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
  let result = Object.create(null)
  // Start at the second parameter
  for (let i = 1, len = arguments.length; i < len; i++) {
    result[arguments[i]] = object[arguments[i]]
  }
  return result
}
let book = {
  title: 'Understanding ECMAScript 6',
  author: 'Nicholas C. Zakas',
  year: 2015
}
let bookData = pick(book, 'author', 'year')

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

function pick2 (object, ...rest) {
  let result = Object.create(null)
  for (let i = 0, len = rest.length; i < len; i++) {
    result[rest[i]] = object[rest[i]]
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
//   set name(...value) { /* do something */ } // => Syntax error: Can't use rest param in setter
// }

// REST PARAMETER VS `arguments`
// *****************************
//  Rest parameters were designed to replace `arguments` in ES6
//  But `arguments` is not removed from the language
//  The `arguments` object works together with rest parameters by reflecting the arguments that 
//  were passed to the function when called

function checkArgs(...rest) {
    console.log(rest.length)
    console.log(arguments.length)
    console.log(rest[0], arguments[0])
    console.log(rest[1], arguments[1])
}
checkArgs('a', 'b') 
// => 2
// 2
// a a
// b b

// The arguments object always correctly reflects the parameters that were passed into a function 
// regardless of rest parameter usage

// BETTER FUNCTION CONSTRUCTOR
// ***************************
//  The `Function()` constructor is an infrequently used part of JavaScript that allows you to 
//  dynamically create a new function
//  In ES6: 
//    `Function()` constructor is allowed default parameters and rest parameters
//    For Rest parameters, just add the ... before the last parameter

const add = new Function('first', 'second = first', 'return first + second')
const pickFirst = new Function('...args', 'return args[0]')

// SPREAD OPERATOR
// ***************
//  The `rest` parameters allow you to specify that multiple independent arguments should 
//  be combined into an array
//  The spread operator allows you to specify an array that should be split and have its 
//  items passed in as separate arguments to a function
//  The JavaScript engine splits the array into individual arguments and passes them to 
//  the function
//  We can mix and match the spread operator with other arguments as well
//  You’ll likely find it to be a suitable replacement for the `apply()` method in most 
//  circumstances

let values = [25, 50, 75, 100, 1, 45, 67, 78, 43, 23, 0, 31]
let extraValues = [1, 2, 3, 4, 500, 600, 700, 800]
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

namedFunc1.name // => "namedFunc1"
namedFunc2.name // => "namedFunc2"

// Special Cases of the `name` Property
//  If the function expression itself has a name, that name takes priority over the variable 
//  to which the function was assigned

const aFunc = function anotherFunc () { return true }
aFunc.name // => anotherFunc

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

person.sayName.name // => sayName
Object.getOwnPropertyDescriptor(person, 'name').get.name // => get name

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
let person = new Person('Nicholas')
let notAPerson = Person('Nicholas') // throws error
let notAPerson = Person.call(person, 'Michael') // works!

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
person = new Person2('Nicholas')
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
