// OVERVIEW
// ********
//  ES6 heavily improves the utility of objects
//  Every value in JavaScript is some kind of object
//  Programs are creating more objects all the time

// OBJECT CATEGORIES
// *****************
//  Clear definition for category of objects:
//  - Ordinary: Have all the default internal behaviors for objects in JavaScript
//  - Exotic: Have internal behavior that differs from the default in some way
//  - Standard: defined by ECMAScript 6, such as Array, Date, and so on. Can be ordinary or exotic
//  - Built-In: Present in a JavaScript execution environment when a script begins to execute. All Standards are Built-In

// PROPERTY INITIALIZER SYNTAX
// ***************************
//  Objects are collections of property:value pairs
//  We can eliminate the duplication that exists around property names and local variables
//  by using the property initializer shorthand
//  When an object property name is the same as the local variable name, you can simply
//  include the name without a colon and value

function createPerson (name, age) {
  return {
    name,
    age
  }
}

// The JavaScript engine looks into the surrounding scope for a variable of the same name
// If it finds one, that variable’s value is assigned to the same name on the object literal
// Assigning a property with the same name as a local variable is a very common pattern in JS
// This helps to eliminate naming errors

// CONSISE METHOD SYNTAX
// *********************
//  Improved syntax for assigning methods to object literals
//  Eliminating the colon and the `function` keyword
//  Concise methods may use `super` while the nonconcise ES5 methods may not
//  The `name` property of a method created using concise method shorthand is
//  the name used before the parentheses

let person = {
  name: 'Nicholas',
  sayName () {
    console.log(this.name)
  }
}

// COMPUTED PROPERTY NAMES
// ***********************
//  ES5 computed property names on object instances when using square brackets notation
//  The square brackets allow you to specify property names using variables and string literals
//  even if they may contain characters that would cause a syntax error if used in an identifier
//  (E.g. The property name might contain spaces)
//  When using spaces, property names cannot be used with `dot-notation`

let person1 = {}
let lastName = 'last name'
person1['first name'] = 'Nicholas'
person1[lastName] = 'Zakas'
console.log(person1['first name']) // => "Nicholas"
console.log(person1[lastName]) // => "Zakas"

let person2 = {
  'first name': 'John',
  'last name': 'Smith'
}
console.log(person2['first name']) // => "John"
console.log(person2['last name']) // => "Smith"

// In ES6, computed property names are part of the object literal syntax
// They use the same square bracket notation
// Contents are evaluated as a string

let lName = 'last name'
let suffix = ' name'

let person3 = {
  'first name': 'Nicholas',
  [lName]: 'Zakas' // Computed property name
}
let person4 = {
  [`first ${suffix}`]: 'Nicholas', // Computed expression
  [`last ${suffix}`]: 'Zakas' // Computed expression
}

// NEW OBJECT METHODS
// ******************
//  `Object` global has received an increasing number of methods when no other
//  specific objects are more appropriate
//  ES6 introduces a couple new methods on the Object global that are designed
//  to make certain tasks easier

// `Object.is()`
// *************
//  Identical operator is often used (`===`)
//  But even that sometimes is not entirely accurate
//  `Object.is()` makes up for the remaining quirks of the identically equals operator
//  Accepts two arguments and returns `true` if the values are equivalent
//  Two values are equivalent when they are of the same type and have the same value

console.log(+0 == -0) // => true
console.log(+0 === -0) // => true
console.log(Object.is(+0, -0)) // false

console.log(NaN == NaN) // => false
console.log(NaN === NaN) // => false
console.log(Object.is(NaN, NaN)) // => true

console.log(5 === 5) // => true
console.log(5 == '5') // => true
console.log(5 === 5) // => true
console.log(5 === '5') // => false
console.log(Object.is(5, 5)) // => true
console.log(Object.is(5, '5')) // => false

// In many cases, Object.is() works the same as the `===` operator
// The only differences are that:
//  For Object.is(): +0 and -0 are considered not equivalent
//  For Object.is(): NaN is considered equivalent to NaN
// Choose whether to use `Object.is()` instead of `==` or `===` based on
// how those special cases affect your code

// `Object.assign()`
// *****************
//  In a mixin, or extend, one object receives properties and methods from another object
//  The mixin() function iterates over the own properties of extras and copies
//  them onto final
//  This allows the final object to gain new properties without inheritance

function mixin (final, extras) {
  Object.keys(extras).forEach((key) => {
    final[key] = extras[key]
  })
  return final
}

// ES6 added the `Object.assign()` method, which behaves the same way
// The name changes from `mixin()` to `assign()` to reflect the actual operation that occurs
// Since the mixin() function uses the assignment operator (`=`), it cannot copy accessor
// properties to the receiver as accessor properties
// The name `Object.assign()` was chosen to reflect this distinction
// The `Object.assign()` method accepts any number of suppliers, and the receiver receives
// the properties in the order in which the suppliers are specified
// The second supplier might overwrite a value from the first supplier on the receiver

let receiver = {}
let supplier1 = {
  type: 'js',
  name: 'file.js'
}
let supplier2 = {
  type: 'css'
}
Object.assign(receiver, supplier1, supplier2)
console.log(receiver.type) // => "css"
console.log(receiver.name) // => "file.js"

// NOTE:
//  `Object.assign()` is very similar to the Object Spread Operator
//  Babel compiles Object Spread Operator into using `Object.assign()`
//  However, Object Spread Operator is a ES2018 feature and still not fully supported yet
//  It is safer to use `Object.assign()`
//  `Object.assign()` doesn’t create accessor properties on the receiver
//  when a supplier has accessor properties
//  An accessor property on a supplier will become a data property on the receiver

let receiver2 = {}
let supplier = {
  get name () {
    return 'file.js'
  }
}

Object.assign(receiver2, supplier)
let descriptor = Object.getOwnPropertyDescriptor(receiver2, 'name')

console.log(descriptor.value) // => "file.js"
console.log(descriptor.get) // => undefined

// DUPLICATE OBJECT LITERAL PROPERTIES
// ***********************************
//  ES5 throws an error if duplicate object keys are found
//  In ES6, the duplicate property check was removed
//  Both strict and nonstrict mode code no longer check for duplicate properties
//  The last property of the given name becomes the property’s actual value

let person5 = {
  name: 'Nicholas',
  name: 'Greg' // no error in ES6 strict mode
}
console.log(person.name) // => "Greg"

// OWN PROPERTY ENUMERATION ORDER
// ******************************
//  ES5 didn’t define the enumeration order of object properties
//  ES6 strictly defines the order in which own properties must
//  be returned when they are enumerated
//  Using `Object.getOwnPropertyNames()` and `Reflect.ownKeys` and `Object.assign()`
//    1. All numeric keys in ascending order
//    2. All string keys in the order in which they were added to the object
//    3. All symbol keys in the order in which they were added to the object

let obj = {
  a: 1,
  0: 1,
  c: 1,
  2: 1,
  b: 1,
  1: 1
}
obj.d = 1
console.log(Object.getOwnPropertyNames(obj).join(',')) // => "0,1,2,a,c,b,d"

// The string keys come after the numeric keys and appear in the order that
// they were added to `obj`
// The keys in the object literal itself come first, followed by any dynamic
// keys that were added later
// NOTE: The `for-in` loop still has an unspecified enumeration order because
//       not all JavaScript engines implement it the same way
//       The `Object.keys()` method and `JSON.stringify()` are both specified to
//       use the same (unspecified) enumeration order as `for-in`

// It’s not uncommon to find programs that rely on a specific enumeration order
// to work correctly

// MORE POWERFUL PROTOTYPE
// ***********************
