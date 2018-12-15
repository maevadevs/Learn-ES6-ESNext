# Standard ECMA-262, v2015+

**Aliases**: ECMAScript 6, ES6, ES2015, ES Harmony, ES7, ES2016, ES2017, ES2018, ESNext\
**Commitee**: TC-39

This is an overview of the changes in the ES6/ES2015 and ESNext standard.

- [Book Site](https://leanpub.com/understandinges6/read)
- [ESNext Compatibility Chart](https://kangax.github.io/compat-table/es6/)

## Table of Contents

1. Block Bindings: `block-bindings.js`
1. Strings and Regular Expressions: `strings-and-regexp.js`
1. Functions: `functions.js`
1. Objects: `objects.js`
1. Objects and Arrays Destructuring: `destructuring.js`
1. Symbols Type and Symbols Properties: `symbols.js`
1. Sets and Maps: `sets-maps.js`
1. Iterators and Generators: `iterators-generators.js`
1. Classes: `classes.js`
1. Improved Arrays: `improved-arrays.js`
1. Promises and Asynchronous Programming: `async.js`
1. Proxies and Reflection API: `proxies-reflection-api.js`
1. Encapsulation and Modules: `encapsulation-modules.js`
1. Other Changes in ES6: `es6-misc.js`
1. Other Changes in ES7: `es7-misc.js`

---

## 1. Block Bindings: `block-bindings.js`

- `var`: Scope and Hoisting
- `let`: ES2015 Variables, Block-level Declaration
- `const`: ES2015 Constants, Block-level Declaration
- No Redeclaration of Same Identifier In Same Scope
- Hoisting and Temporal Dead Zone (TDZ)
- Block-Binding in Loops
  - Functions in Loops
  - `let` Declarations in Loops
  - `const` Declarations in Loops
- Global Block Binding
- Best Practices for Block Bindings
- Summary

## 2. Strings and Regular Expressions: `strings-and-regexp.js`

- Better Unicode Support
  - In ES5: UTF-16 and Surrogate Pair
  - In ES6: UTF-16 with Better Support
  - `str.codePointAt()`
  - `str.fromCodePoint()`
  - `str.normalize()`
- Substring Changes
  - `str.includes(txt[, start = 0])`
  - `str.startsWith(txt[, start = 0])`
  - `str.endsWith(txt[, start = 0])`
- Other String Methods
  - `str.repeat(times)`
- RegExp Changes
  - RegExp `u` and `y` Flag
  - Duplicating RegExp
  - Returning Existing Flags
- Template Literals
  - Multiline strings
  - Expression substitution
  - Tagged Template
- Summary

## 3. Functions: `functions.js`

- Overview
- Default Parameters Value
  - Default Parameters and TDZ
- Working with Unnamed Parameters
  - `rest` Parameter
  - `rest` vs `arguments`
- Better `Function` constructor
- `spread` Operator
- The `name` Property
- Dual Purpose of Functions
  - Factory vs Constructor
  - `new.target`
- Block-Level Functions
- Arrow Functions Expressions
- Tail-Call Optimization
- Summary

## 4. Objects: `objects.js`

- Overview
- Property Initializer Syntax
- Concise Method Syntax
- Computed Property Names
- New Object Methods
  - `Object.is()`
  - `Object.assign()`
- Duplicate Object Literal Properties
- Own Properties Enumeration Order
- Changing An Object's Prototype: `Object.setPrototypeOf()`
- `super` References
- Formal Method Definition
- Summary

## 5. Destructuring: `destructuring.js`
