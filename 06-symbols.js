/* eslint-disable no-extend-native */
// OVERVIEW
// ********
// Symbol is a Primitive type introduced in ES2015
// Primitives types: strings, numbers, booleans, null, undefined, symbols
// Symbols began as a way to create private object members
// Before symbols, any property with a string name was easy to access regardless
// of the obscurity of the name: the “private names” feature was meant to let developers
// create non-string property names
// The private names proposal eventually evolved into ECMAScript 6 symbols
// They added non-string values for property names
// In the standard, however, the goal of privacy was dropped
// Instead, symbol properties are categorized separately from other object properties

// CREATING SYMBOLS
// ****************
// Symbols are unique: They don't have a literal form
// They have to be created with the Symbol() factory function
// Calling new Symbol() throws an error
// The Symbol function also accepts an optional argument that is the description of the symbol
// The description is used for debugging purposes: It is stored internally in the [[Description]] property
// This property is read whenever the symbol’s toString() method is called
// It is not possible to access [[Description]] directly from code

const fNameSym = Symbol('First Name')
const person = {}

person[fNameSym] = 'John'
console.log(person[fNameSym]) // => "John"
console.log(fNameSym) // => Symbol(First Name)

// The symbol fNameSym is created and used to assign a new property on the person object
// That symbol must be used each time you want to access that same property
// Naming the symbol variable appropriately is a good idea, so you can easily tell what
// the symbol represents

// IDENTIFYING SYMBOLS
// *******************
// Symbols are primitives, so typeof can be used on them
// typeof will returns 'symbol'

console.log(typeof fNameSym) // => 'symbol'

// USING SYMBOLS
// *************
// You can use symbols anywhere you would use a computed property name
// We would previously use strings with bracket notations for those
// We can also use symbols with Object.defineProperty() and Object.defineProperties()

// Use a computed object literal property
const person1 = {
  [fNameSym]: 'John'
}
// make the property read only
Object.defineProperty(person, fNameSym, { writable: false })
// another symbol
const lNameSym = Symbol('last name')
// appending to person1 as property
Object.defineProperties(person1, {
  [lNameSym]: {
    value: 'Appleseed',
    writable: false
  }
})
console.log(person1[fNameSym]) // => "John"
console.log(person1[lNameSym]) // => "Appleseed"

// Symbols can be used in any place that computed property names are allowed
// You’ll need to have a system for sharing these symbols between
// different pieces of code in order to use them effectively

// SHARING SYMBOLS
// ***************
// Example, two different object types in your application that should
// use the same symbol property to represent a unique identifier
// Keeping track of symbols across files or large codebases can be difficult and error-prone
// ES6 provides a global symbol registry that you can access at any point in time

// When you want to create a symbol to be shared, use the Symbol.for() method instead of calling
// the Symbol() method
// The Symbol.for() method accepts a single parameter, which is a string identifier
// for the symbol you want to create. That parameter is also used as the symbol’s description

const uid = Symbol.for('uid')
const object = {}

object[uid] = '12345'
console.log(object[uid]) // => "12345"
console.log(uid) // => "Symbol(uid)"

// Symbol.for('foo') will always return the same exact symbol

const uid1 = Symbol.for('uid') // => "Symbol(uid)"
const object1 = {
  [uid1]: '12345'
}
console.log(object1[uid1]) // => "12345"
console.log(uid1) // => "Symbol(uid)"

const uid2 = Symbol.for('uid')

console.log(uid1 === uid2) // => true
console.log(object1[uid2]) // => "12345"
console.log(uid2) // => "Symbol(uid)"

// With shared symbols, you can retrieve the key associated with a symbol in the global
// symbol registry by calling the Symbol.keyFor() method

const uidx = Symbol.for('uid')
console.log(Symbol.keyFor(uidx)) // => "uid"

const uidy = Symbol.for('uid')
console.log(Symbol.keyFor(uidy)) // => "uid"

const uidz = Symbol('uid')
console.log(Symbol.keyFor(uidz)) // => undefined: Not found in the registry

// NOTE:
// The global symbol registry is a shared environment, just like the global scope
// Do not make assumptions about what is or is not already present in that environment
// Use namespacing of symbol keys to reduce the likelihood of naming collisions when
// using third-party components

// SYMBOL TYPE COERCION
// ********************
// Synbols are inflexible when it comes to coercion
// Other types lack a logical equivalent to a symbol
// Symbols cannot be coerced into strings or numbers

const uid4 = Symbol.for('uid')
const desc = String(uid4) // Calls uid4.toString()
console.log(desc) // => "Symbol(uid)"

// Concatenation does not work
// Concatenating uid with an empty string requires that uid first be coerced into a string
// An error is thrown when the coercion is detected, preventing its use in this manner

const uid5 = Symbol.for('uid')
console.log(uid5 + '') // => Type error

// You cannot coerce a symbol to a number either
// All mathematical operators cause an error when applied to a symbol

const uid6 = Symbol.for('uid')
const sum = uid6 / 1 // => Type error

// Logical operators do not throw an error because all symbols are considered a truthy value

// RETRIEVING SYMBOL PROPERTIES
// ****************************
// Object.keys() and Object.getOwnPropertyNames() methods can retrieve all property names in an object
// Neither method returns symbol properties
// Instead, we use Object.getOwnPropertySymbols()
// Return an array of own property symbols

const uid7 = Symbol.for('uid')
const object7 = {
  [uid7]: '12345'
}
const symbolProps = Object.getOwnPropertySymbols(object7)
console.log(symbolProps.length) // => 1
console.log(symbolProps[0]) // => "Symbol(uid)"
console.log(object[symbolProps[0]]) // => "12345"

// All objects start with zero own-symbol properties
// Objects can inherit symbol properties from their prototypes
// ES6 predefines several such properties, implemented using what are called well-known symbols

// WELL-KNOWN SYMBOLS
// ******************
// These are exposing some of the internal logic of JS in ES6
// ES6 uses symbol prototype properties to define the basic behavior of certain objects
// Each well-known symbol is represented by a property on the Symbol object

console.log(Symbol.hasInstance) // A method used by instanceof to determine an object’s inheritance
console.log(Symbol.isConcatSpreadable) // A Boolean value indicating that Array.prototype.concat() should flatten the collection’s elements if the collection is passed as a parameter to Array.prototype.concat()
console.log(Symbol.iterator) // A method that returns an iterator
console.log(Symbol.match) // A method used by String.prototype.match() to compare strings
console.log(Symbol.replace) // A method used by String.prototype.replace() to replace substrings
console.log(Symbol.search) // A method used by String.prototype.search() to locate substrings
console.log(Symbol.species) // The constructor for making derived objects
console.log(Symbol.split) // A method used by String.prototype.split() to split up strings
console.log(Symbol.toPrimitive) // A method that returns a primitive value representation of an object
console.log(Symbol.toStringTag) // A string used by Object.prototype.toString() to create an object description
console.log(Symbol.unscopables) // An object whose properties are the names of object properties that should not be included in a with statement

// `Symbol.hasInstance()`
// **********************
// Every function has a Symbol.hasInstance() method
// Determines whether or not a given object is an instance of that function
// The method is defined on Function.prototype
// All functions inherit the default behavior for the instanceof property
// The method is non-writable, non-configurable, and non-enumerable
// Symbol.hasInstance() method accepts a single argument: the value to check
// Returns true if the value passed is an instance of the function
// ES6 essentially redefined the `instanceof` operator as shorthand syntax for this method call
// Note that the left operand to instanceof must be an object to trigger the
// Symbol.hasInstance call, as nonobjects cause instanceof to simply return false
// all the time

const arr = []
console.log(arr instanceof Array) // Same
console.log(Array[Symbol.hasInstance](arr)) // Same

// This allows to redefine how instanceof works
// You must use Object.defineProperty() to overwrite a nonwritable property

function MyObject () {}
Object.defineProperty(MyObject, Symbol.hasInstance, {
  value: v => false
})

const obj = new MyObject()
console.log(obj instanceof MyObject) // => false

// `Symbol.isConcatSpreadable`
// ***************************
// JavaScript Arrays have a `concat()` method
// The concat() method can also accept nonarray arguments
// Those arguments are simply added to the end of the array

const colors1 = ['red', 'green']
const colors2 = colors1.concat(['blue', 'black'], 'brown')

console.log(colors2.length) // 5
console.log(colors2) // ["red","green","blue","black","brown"]

// Arrays are automatically split into their individual items and all other types are not
// Prior to ECMAScript 6, there was no way to adjust this behavior
// The Symbol.isConcatSpreadable property is a boolean value indicating that an object
// has a length property and numeric keys, and that its numeric property values should
// be added individually to the result of a concat() call
// This symbol is available as a way to augment how concat() works on certain types of
// objects, effectively short-circuiting the default behavior

// An array-like object
const collection = {
  0: 'Hello',
  1: 'world',
  length: 2,
  [Symbol.isConcatSpreadable]: true
}

const messages = ['Hi'].concat(collection)

console.log(messages.length) // 3
console.log(messages) // ["Hi","Hello","world"]

// The Symbol.isConcatSpreadable property is set to true to indicate that
// the property values should be added as individual items to an array.

// `Symbol.match`, `Symbol.replace`, `Symbol.search`, `Symbol.split`
// *****************************************************************
// str.match(regex) - Determines whether the given string matches a regular expression
// str.replace(regex, replacement) - Replaces regular expression matches with a replacement
// str.search(regex) - Locates a regular expression match inside the string
// str.split(regex) - Splits a string into an array on a regular expression match
// Before ES6, the way these methods interacted with regular expressions was hidden
// from developers
// ES6 defines four symbols that correspond to these four methods
// Methods on the regular expression argument that should be called on the first
// argument to the str.match(), str.replace(), str.search(), and str.split()

// Symbol.match() - A function that accepts a string argument and returns an array
// of matches, or null if no match is found
// Symbol.replace() - A function that accepts a string argument and a replacement
// string, and returns a string
// Symbol.search() - A function that accepts a string argument and returns the
// numeric index of the match, or -1 if no match is found
// Symbol.split() - A function that accepts a string argument and returns an array
// containing pieces of the string split on the match

// effectively equivalent to /^.{10}$/
const hasLengthOf10 = {
  [Symbol.match]: value => value.length === 10 ? [value] : null,
  [Symbol.replace]: (value, replacement) => value.length === 10 ? replacement : value,
  [Symbol.search]: value => value.length === 10 ? 0 : -1,
  [Symbol.split]: value => value.length === 10 ? ['', ''] : [value]
}

const message1 = 'Hello world' // 11 characters
const message2 = 'Hello John' // 10 characters

const match1 = message1.match(hasLengthOf10)
const match2 = message2.match(hasLengthOf10)

console.log(match1) // null
console.log(match2) // ["Hello John"]

const replace1 = message1.replace(hasLengthOf10, 'Howdy!')
const replace2 = message2.replace(hasLengthOf10, 'Howdy!')

console.log(replace1) // "Hello world"
console.log(replace2) // "Howdy!"

const search1 = message1.search(hasLengthOf10)
const search2 = message2.search(hasLengthOf10)

console.log(search1) // -1
console.log(search2) // 0

const split1 = message1.split(hasLengthOf10)
const split2 = message2.split(hasLengthOf10)

console.log(split1) // ["Hello world"]
console.log(split2) // ["", ""]

// `Symbol.toPrimitive()`
// **********************
// JS often converts objects into primitive values implicitly
// Exactly what primitive value should be used was previously an internal operation
// ES6 exposes that value (making it changeable) through the Symbol.toPrimitive() method
// Defined on the prototype of each standard type
// Prescribes what should happen when the object is converted into a primitive
// When a primitive conversion is needed, Symbol.toPrimitive() is called with a
// single argument: the "hint"
// The hint argument is one of three string values:
//  - If hint is "number" then Symbol.toPrimitive should return a number
//  - If hint is "string" then a string should be returned
//  - If hint is "default" then the operation has no preference as to the type
// For most standard objects, "number" mode has the following behaviors, in order by priority:
//  - Call the valueOf() method, and if the result is a primitive value, return it.
//  - Otherwise, call the toString() method, and if the result is a primitive value, return it.
//  - Otherwise, throw an error
// For most standard objects, "string" mode have the following priority:
//  - Call the toString() method, and if the result is a primitive value, return it.
//  - Otherwise, call the valueOf() method, and if the result is a primitive value, return it.
//  - Otherwise, throw an error
// In many cases, standard objects treat "default" mode as equivalent to "number" mode
//  (except for Date, which treats "default" mode as equivalent to "string" mode)

function Temperature (degrees) {
  this.degrees = degrees
}

Temperature.prototype[Symbol.toPrimitive] = function (hint) {
  switch (hint) {
    case 'string':
      return this.degrees + '\u00b0' // degrees symbol
    case 'number':
      return this.degrees
    case 'default':
      return this.degrees + ' degrees'
  }
}

const freezing = new Temperature(32)

console.log(freezing + '!') // "32 degrees!"
console.log(freezing / 2) // 16
console.log(String(freezing)) // "32째"

// `Symbol.toStringTag()`
// **********************
// One of the most interesting problems in JavaScript has been the availability
// of multiple global execution environments
// The problem arises when trying to identify what type of object you’re dealing
// with after the object has been passed between different environments
// Each realm has its own global scope with its own copy of global objects
// This symbol represents a property on each object that defines what value should
// be produced when Object.prototype.toString.call() is called on it
// For an array, the value that function returns is explained by storing "Array"
// in the Symbol.toStringTag property

function Person (name) {
  this.name = name
}

Person.prototype[Symbol.toStringTag] = 'Person'
Person.prototype.toString = function () {
  return this.name
}

const me = new Person('Nicholas')
console.log(me.toString()) // "Nicholas"
console.log(Object.prototype.toString.call(me)) // "[object Person]"

// There is no restriction on which values can be used for
// Symbol.toStringTag() on developer-defined objects

// `Symbol.unscopables()`
// **********************
// Used on Array.prototype to indicate which properties shouldn’t create
// bindings inside of a `with` statement
// An object whose keys are the identifiers to omit from with statement
// bindings and whose values are true to enforce the block
// This is mostly for backward compatibility. Don't use `with` in new codes

// built into ECMAScript 6 by default
Array.prototype[Symbol.unscopables] = Object.assign(Object.create(null), {
  copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  keys: true,
  values: true
})

// SUMMARY
// *******
// Used to create properties that can’t be accessed without referencing the symbol
// These properties are harder to accidentally change or overwrite
// Suitable for functionality that needs a level of protection from developers
// Object.getOwnPropertySymbols()
// Object.defineProperty() and Object.defineProperties() 
