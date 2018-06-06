// Overview
// ********

// Prior to ECMAScript 6, JavaScript functions hadn’t changed much since the language was created
// ES6 functions make a big leap forward
// A number of incremental improvements on top of ES5 functions
// Make programming in JavaScript less error-prone and more powerful

// Default Parameters Value
// ************************

// Simulating Default Parameter Values in ECMAScript 5
//  The flaw in this implementation is that timeout could be 0, interpreted as falsy

function makeRequest1 (url, timeout, callback) {
  timeout = timeout || 2000
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

// Things are better in ES6
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
//  A value of 'null' is considered to be valid

function makeRequest4 (url, timeout = 2000, callback) {
  // ...
}
makeRequest4('http://google.com', undefined, function () { /* ... */ })

// The behavior of the 'arguments' object is different when default parameter values are present
//  In strict mode, the 'arguments' object does not reflect changes to the named parameters
//  The 'arguments' object in a function using ECMAScript 6 default parameter values
//  will always behave in the same manner as ECMAScript 5 strict mode

// The default value need not be a primitive value
//  We could execute a function to retrieve the default parameter value

function getValue () {
  return 5
}

function add (first, second = getValue()) {
  return first + second
}

// NOTE
//  Be careful when using function calls as default parameter values
//  If you forget the parentheses, such as second = getValue instead of `second = getValue()`,
//  you are passing a reference to the function rather than the result of the function call

// We could also use a previous parameter as the default for a later parameter
//  The ability to reference parameters from default parameter assignments works only for previous arguments
//  so earlier arguments do not have access to later arguments

function add (first, second = first) {
  return first + second
}

// Default Parameter Value Temporal Dead Zone
// ******************************************

// Default parameter values also have a TDZ where parameters cannot be accessed
//  Each parameter creates a new identifier binding that can’t be referenced before
//  initialization without throwing an error
//  They behave like 'let'
//  Parameter initialization happens when the function is called
//  Either by passing a value for the parameter or by using the default parameter value

// Working with Unnamed Parameters
// *******************************
