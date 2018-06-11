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

let person = {
  name: 'Nicholas',
  sayName () {
    console.log(this.name)
  }
}
