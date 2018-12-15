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
//  Objects are collections of `property: value` pairs
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
  Object.keys(extras).forEach(key => {
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

// OWN PROPERTIES ENUMERATION ORDER
// ********************************
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
//  Prototypes are the foundation of inheritance in JS
//  ES6 introduced improvements on prototypes

// CHANGING AN OBJECT'S PROTOTYPE
// ******************************
//  Normally, the prototype of an object is specified when the object is created
//  In ES5, an object’s prototype remains unchanged after instantiation
//  Querying prototype was possible with `Object.getPrototypeOf()`
//  But there was no standard way to change an object’s prototype after instantiation
//  In ES6, we can change an object's prototype with `Object.setPrototypeOf()`
//  It accepts two arguments:
//    - the object whose prototype should change
//    - the object that should become the first argument’s prototype

let person6 = {
  getGreeting () {
    return 'Hello'
  }
}

let dog = {
  getGreeting () {
    return 'Woof'
  }
}

// prototype is `person`
let friend = Object.create(person)
console.log(friend.getGreeting()) // => "Hello"
console.log(Object.getPrototypeOf(friend) === person) // => true

// set prototype of friend to `dog`
Object.setPrototypeOf(friend, dog)
console.log(friend.getGreeting()) // => "Woof"
console.log(Object.getPrototypeOf(friend) === dog) // => true

// EASY PROTOTYPE ACCESS WITH `super` REFERENCES
// *********************************************
//  ES6 introduces `super` references
//  Make accessing functionality on an object’s prototype easier

let person7 = {
  getGreeting () {
    return 'Hello'
  }
}

let dog2 = {
  getGreeting () {
    return 'Woof'
  }
}

let friend1 = {
  getGreeting () {
    return Object.getPrototypeOf(this).getGreeting.call(this) + ', hi!'
  }
}

// set prototype to `person`
Object.setPrototypeOf(friend1, person7)
console.log(friend1.getGreeting()) // => "Hello, hi!"
console.log(Object.getPrototypeOf(friend1) === person7) // => true

// set prototype to dog
Object.setPrototypeOf(friend1, dog2)
console.log(friend1.getGreeting()) // "Woof, hi!"
console.log(Object.getPrototypeOf(friend1) === dog2) // true

// This code could be re-written in the following using `super`
let friend2 = {
  getGreeting () {
    // in the previous example, this is the same as:
    // Object.getPrototypeOf(this).getGreeting.call(this)
    // Using `super` to access reference to the prototype of this
    return super.getGreeting() + ', hi!'
  }
}
// set prototype to dog: super = dog
Object.setPrototypeOf(friend2, dog2)
console.log(friend2.getGreeting()) // "Woof, hi!"
console.log(Object.getPrototypeOf(friend2) === dog2) // true

// You can call any method on an object’s prototype by using a `super` reference
// as long as it’s inside a concise method
// Attempting to use super outside of concise methods syntax results in a syntax error

let friendX = {
  getGreeting: function () {
    return super.getGreeting() + ', hi!' // => syntax error
    // getGreeting() is not in a concise method syntax
    // using named property `super` is invalid in this context
  }
}

// NOTE:
//  Using `Object.getPrototypeOf()` stops working in multiple inheritance chain
//  Using `super` still works

let personX = {
  getGreeting () {
    return 'Hello'
  }
}
// prototype of friend is person
let friendY = {
  getGreeting () {
    return super.getGreeting() + ', hi!'
  }
}
Object.setPrototypeOf(friendY, personX)
// prototype of relative is friend
let relative = Object.create(friendY)

console.log(personX.getGreeting()) // "Hello"
console.log(friendY.getGreeting()) // "Hello, hi!"
console.log(relative.getGreeting()) // "Hello, hi!"

// FORMAL METHOD DEFINITION
// ************************
//  In ES5, Methods were just object properties that contained functions instead of data
//  In ES6:
//    A method is a function that has an internal [[HomeObject]] property containing the
//    object to which the method belongs

let pers = {
  // Formal method
  getGreeting () {
    return 'Hello'
  }
}
// Not a method
function shareGreeting () {
  return 'Hi!'
}

// The [[HomeObject]] for `getGreeting()` is `pers`
// The `shareGreeting()` function has no [[HomeObject]]
// It becomes very important when using `super` references
//  Any reference to `super` uses the [[HomeObject]] to determine what to do
//  - Call `Object.getPrototypeOf()` on the [[HomeObject]] to retrieve a reference to the prototype
//  - The prototype is searched for a function with the same name
//  - The `this` binding is set and the method is called

let pers1 = {
  getGreeting () {
    return 'Hello'
  }
}
// prototype is person
let friend13 = {
  getGreeting () {
    return super.getGreeting() + ', hi!'
  }
}
Object.setPrototypeOf(friend13, pers1)

console.log(friend13.getGreeting()) // => "Hello, hi!"

// super.getGreeting() is equivalent to pers1.getGreeting.call(this)

// SUMMARY
// *******
//  - Several changes to object literals
//  - Computed property name
//  - Shorthand methods
//  - Loose strict check for duplicate property names
//  - `Object.assign()` method
//  - `Object.is()` method
//  - Enumeration order for own properties
//  - `Object.setPrototypeOf()` method
//  - `super` keyword
