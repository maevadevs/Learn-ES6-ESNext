// OVERVIEW
// ********
//  Object and array literals are the most frequently used notations in JavaScript
//  With JSON, they’ve become a particularly important part of the language
//  ES6 adds destructuring to Objects and Arrays

// USAGE
// *****
// To extracts the values of variables from an object and store that data in local variables with the same names
// Avoidig to assign them all one by one
// Also avoiding to dig through the entire structure just to find one piece of data
// For this purpose, ES6 adds destructuring for both objects and arrays

// OBJECT DESTRUCTURING
// ********************

let node = {
  type: 'Identifier',
  name: 'foo'
}
let { type, name } = node // Object Destructuring
console.log(type) // => 'Identifier'
console.log(name) // => 'foo'

// When destructuring, declaration alone is not enough: Initialization is required
// It is also possible to use destructuring in assignments alone
// Note that you must put parentheses around a destructuring assignment statement
// A block statement cannot appear on the left side of an assignment
// The parentheses signal that the next curly brace is not a block statement and
// should be interpreted as an expression

;({ type, name } = node) // assign different values using destructuring
console.log(type) // => 'Identifier'
console.log(name) // => 'foo'

// A destructuring assignment expression evaluates to the right side of the expression
// That means you can use a destructuring assignment expression anywhere a value is expected
// An error is thrown when the right side of the destructuring assignment expression
// evaluates to null or undefined: Any attempt to read a property of null or undefined results
// in a runtime error

function outputInfo (value) {
  console.log(value === node)
}
outputInfo({ type, name } = node) // => true
console.log(type) // => "Identifier"
console.log(name) // => "foo"

// DEFAULT VALUES
// **************
// If you specify a local variable with a property name that doesn’t exist on the object,
// then that local variable is assigned a value of undefined
// You can optionally define a default value to use when a specified property doesn’t exist
// The default value is only used if the property is missing or has a value of undefined

let { someValue } = node
console.log(someValue) // => undefined

;({ type, name, someValue = 'abc123' } = node) // Using default value
console.log(someValue) // => "abc"

// ASSIGNING TO DIFFERENT LOCAL VARIABLE
// *************************************
// ES6 has an extended syntax that allows you to assign to a local variable with a different name
// The syntax looks like the object literal nonshorthand property initializer syntax
// This syntax is effectively the opposite of traditional object literal syntax,
// where the name is on the left of the colon and the value is on the right
// In this case, the name is on the right of the colon and the location of the value
// to read is on the left

let { type: localType, name: localName } = node
console.log(localType) // => "Identifier"
console.log(localName) // => "foo"

// And we can still use defaults on top of that

let { someValue: greeting = 'Hello World!' } = node
console.log(greeting) // => "Hello World!"

// NESTED OBJECT DESTRUCTURING
// ***************************
// We can navigate into a nested object structure to retrieve just the information we want
// Destructuring patterns can be nested to an arbitrary level of depth, with all capabilities
// available at each level

let node2 = {
  type: 'Identifier',
  name: 'foo',
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
}
let { loc: { start: { line, column: localCol } } } = node2

console.log(line) // => 1
console.log(localCol) // => 1

// ARRAY DESTRUCTURING
// *******************
// Just uses array literal syntax instead of object literal syntax
// Operates on positions within an array, rather than the named properties that are
// available in objects

let colors = [ 'red', 'green', 'blue' ]

let [ color1, color2 ] = colors
console.log(color1) // => "red"
console.log(color2) // => "green"

// Here, the variable names can be anything
// The values are chosen because of their position in the array
// The array itself isn’t changed in any way
// You can also omit items in the destructuring pattern and only provide variable names
// for the items you’re interested in

let [,, b] = colors
console.log(b) // => "blue"

// We can also use Array Destructuring in assignment
// But there is no need to wrap in parenthesis as with object (No block confusion)

let r, g

;[ r, g ] = colors
console.log(r) // => "red"
console.log(g) // => "green"

// Array destructuring assignment has a very unique use case that makes it easier
// to swap the values of two variables without a third variables
// Value swapping is a common operation in sorting algorithms

let x = 100
let y = 200

;[ x, y ] = [ y, x ]
console.log(x) // => 200
console.log(y) // => 100

// There is still temporary variable [y, x] but it is transparent
// The destructuring happens on the temporary array, which has the
// values of y and x copied into its first and second positions

// Note: an error is thrown when the right side of an array destructured assignment expression
// evaluates to `null` or `undefined`

// DEFAULT VALUES
// **************
// Array destructuring also allows to specify a default value for any position in the array
// The default value is used when the property at the given position either doesn’t exist or has
// the value `undefined`

let colors2 = ['red']
let [ firstColor, secondColor = 'green' ] = colors2

console.log(firstColor) // => "red"
console.log(secondColor) // => "green"

// NESTED ARRAY DESTRUCTURING
// **************************
// Manner similar to destructuring nested objects
// By inserting another array pattern into the overall pattern, the destructuring will descend
// into a nested array
// As with objects, you can nest arrays arbitrarily deep

let colors3 = [ 'red', [ 'green', 'lightgreen' ], 'blue' ]
let [ fColor, [ sColor ] ] = colors3

console.log(fColor) // => "red"
console.log(sColor) // => "green"

// REST ITEMS
// **********
// Array destructuring has a similar concept as rest parameter called rest items
// Rest items use the ... syntax to assign the remaining items in an array to a particular variable
// Rest items are useful for extracting certain items from an array and keeping the rest available

let [ fCol, ...restColors ] = colors

console.log(fCol) // => "red"
console.log(restColors.length) // => 2
console.log(restColors[0]) // => "green"
console.log(restColors[1]) // => "blue"

// Rest Items can also used to clone an Array, similar in using Array.concat()
// While the concat() method is intended to concatenate two arrays together, calling it without an
// argument returns a clone of the array

// cloning an array in ECMAScript 5
var clonedColors = colors.concat()
console.log(clonedColors) // => "['red', 'green', 'blue']"

// In ECMAScript 6, we can use rest items to achieve the same thing through syntax
// intended to function that way

// cloning an array in ECMAScript 6
let [ ...clonedColors2 ] = colors
console.log(clonedColors2) // => "['red', 'green', 'blue']"

// NOTE:
// Rest items must be the last entry in the destructured array and cannot be followed by
// a comma. Including a comma after rest items is a syntax error.

// MIXED DESTRUCTURING
// *******************
// Object and array destructuring can be used together to create more complex expressions

let data = {
  type: 'Identifier',
  name: 'foo',
  loc: {
    start: {
      line: 100,
      column: 200
    },
    end: {
      line: 1,
      column: 4
    }
  },
  range: [3, 5, 8, 9]
}

// Destructuring
let {
  loc: {
    start: {
      line: asLine = 0, column: asColumn = 0
    }
  },
  range: [ startIndex = 0,,, endIndex ]
} = data

console.log(asLine) // => 100
console.log(asColumn) // => 200
console.log(startIndex) // => 3
console.log(endIndex) // => 9

// DESTRUCTURED PARAMS
// *******************
// Destructuring is very helpful when passing function arguments
// Destructured parameters also makes it clear what arguments a function expects
// A destructured parameter uses an object or array destructuring pattern in place
// of a named parameter
// The destructured params also act like regular params: They are set to undefined if
// not passed
// NOTE: Destructured params have the same capabilities as regular destructuring

function setCookie (name, value, { secure, path, domain, expires }) {
  /* code to set the cookie here */
}
setCookie('type', 'js', {
  secure: true,
  expires: 60000
})

// NOTE: Destructured params are required by default, unless set as optional
// They throw an error if no value passed

// setCookie('type', 'js') // => Throw error: options object not passed

// To fix this, we can set a default on the options object

function setCookie2 (name, value, { secure, path, domain, expires } = {}) {
  /* code to set the cookie here */
}
setCookie2('type', 'js')

// DEFAULT VALUES FOR DESTRUCTURED PARAMS
// **************************************
// Very similar to destructured assignment
// Just add the equals sign after the parameter and specify the default value

function setCookie3 (name, value, { secure = false, path = '/', domain = 'example.com', expires = new Date(Date.now() + 360000000) } = {}) {
  /* code to set the cookie here */
}
setCookie3('type', 'js')

// SUMMARY
// *******
// Destructuring makes working with objects and arrays in JavaScript easier
// Both object and array destructuring can specify default values
// You can also navigate deeply nested data structures with object and array destructuring
// Destructuring declarations must always have an initializer
// Destructured parameters use the destructuring syntax to make “options” objects more
// transparent when used as function parameters: you can use all of the features of destructuring
