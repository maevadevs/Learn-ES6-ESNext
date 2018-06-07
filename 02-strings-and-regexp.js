// BETTER UNICODE SUPPORT
// **********************
//
// In ES5:
//    - UTF-16:
//        All string properties and methods, like the `length` property and
//        the `charAt()` method, were based on these 16-bit code units.
//
//    - Limitation of UTF-16:
//        Not enough to cover every single character codes in the world.
//        There are just too much code-points to cover.
//        Basic Multilingual Plane (BMP): First 2^16 code-points, using a single
//        16-bit code unit.
//        Supplementary Plane: Everything beyond the BMP, using the surrogate pairs.
//
//    - Any single character in a string can be either one code unit for BMP
//      characters, giving a total of 16 bits, or two units for supplementary
//      plane characters, giving a total of 32 bits.
//
//    - All string operations and methods work on 16-bit code-units: Unexpected
//      results from strings that use surrogate pairs (2 x 16-bit).

let text = '𠮷' // This is using a surrogate pair
console.log(text.length) // => 2 (2x 16-bit)
console.log(/^.$/.test(text)) // => false: A regular expression trying to match a single character fails because it thinks there are two characters.
console.log(text.charAt(0)) // => ''
console.log(text.charAt(1)) // => ''
console.log(text.charCodeAt(0)) // => 55362
console.log(text.charCodeAt(1)) // => 57271

// In ES6:
//  Still using UTF-16, but with much improvements
//  UTF-16 string encoding address problems like these
//  Standardizing string operations based on this character encoding
//  JavaScript can support functionality designed to work specifically with
//  surrogate pairs

// `str.codePointAt()`
// *******************
//  Retrieves the Unicode code point that maps to a given position in a string
//  Accepts the code unit position rather than the character position
//  Returns an integer value
//  Returns the same value as the charCodeAt() method unless it operates on
//  non-BMP characters

let text2 = '𠮷a'
// Using str.charCodeAt()
console.log(text2.charCodeAt(0)) // 55362
console.log(text2.charCodeAt(1)) // 57271
console.log(text2.charCodeAt(2)) // 97
// Using str.codePointAt()
console.log(text2.codePointAt(0)) // 134071
console.log(text2.codePointAt(1)) // 57271
console.log(text2.codePointAt(2)) // 97

// Calling the str.codePointAt() method on a character is the easiest way to
// determine if that character is represented by one or two code points

function is32Bit (char) {
  return char.codePointAt(0) > 0xFFFF
}
console.log(is32Bit('𠮷')) // true
console.log(is32Bit('a')) // false

// `str.fromCodePoint()`
// *********************
//  Static method
//  Produces a single-character string from a given code point
//  This is the reverse of String.codePointAt()
//  A more complete version of the String.fromCharCode() method

console.log(String.fromCodePoint(134071)) // '𠮷'

// `str.normalize()`
// *****************
//  Different characters may be considered equivalent for the purpose of sorting
//  or other comparison-based operations
//  2 Ways to define the relationship:
//    - Canonical Equivalence -  Two sequences of code points are considered
//                               interchangeable in all respects.
//    - Compatibility - Two compatible sequences of code points look different
//                      but can be used interchangeably in certain situations.
//  Two strings representing fundamentally the same text can contain different
//  code point sequences.
//  The character “æ” and the two-character string “ae” may be used
//  interchangeably but are strictly not equivalent unless normalized in some
//  way.
//
//  This method optionally accepts a single string parameter indicating one of
//  the following Unicode normalization forms to apply:
//    - Normalization Form Canonical Composition ('NFC') -- Default
//    - Normalization Form Canonical Decomposition ('NFD')
//    - Normalization Form Compatibility Composition ('NFKC')
//    - Normalization Form Compatibility Decomposition ('NFKD')
//
//  Just keep in mind that when comparing strings, both strings must be
//  normalized to the same form

let normalized = values.map(function (value) {
  return value.normalize() // 'NFC'
})

normalized.sort(function (first, second) {
  if (first < second) return -1
  else if (first === second) return 0
  else return 1
})

values.sort(function (first, second) {
  let firstNormalized = first.normalize('NFD')
  let secondNormalized = second.normalize('NFD')

  if (firstNormalized < secondNormalized) return -1
  else if (firstNormalized === secondNormalized) return 0
  else return 1
})

// REGEXP 'u' FLAG
// ***************
//  Regular expressions assume 16-bit code units, where each represents a single character
//  To address this problem, ES6 defines a u flag for regular expressions, which stands for Unicode
//  When `u` flag set: Switches modes to work on characters, not code units
//  The regular expression should no longer get confused about surrogate pairs in strings and should behave as expected

var text = '𠮷'

console.log(text.length) // 2
console.log(/^.$/.test(text)) // false
console.log(/^.$/u.test(text)) // true

// COUNTING CODE POINTS
// ********************
//  Although this approach works, it’s not very fast, especially when applied to long strings
//  Try to minimize counting code points whenever possible

function codePointLength (text) {
  let result = text.match(/[\s\S]/gu)
  return result ? result.length : 0
}
console.log(codePointLength('abc')) // => 3
console.log(codePointLength('𠮷bc')) // => 3

// NOTE: Attempting to use the 'u' flag in JavaScript engines that aren’t compatible with ES6 throws a syntax error
// Here, we test for its support

function hasRegExpU () {
  try {
    // The constructor will throw an error if u isn’t supported.
    let pattern = new RegExp('.', 'u')
    return true
  } catch (e) {
    return false
  }
}

// OTHER STRING CHANGES
// ********************

// Methods for Identifying Substrings
//  Historially, `indexOf()` has been used to identify strings inside other strings.

//  3 New Methods in ES6:
//    - str.includes(txt):    Returns true if the given `txt` is found anywhere
//                            within the `str`. Returns false if not.
//    - str.startsWith(txt):  Returns true if the given `txt` is found at the
//                            beginning of the `str`. It returns false if not.
//    - str.endsWith(txt):    Returns true if the given `txt` is found at the end
//                            of the `str`. It returns false if not.
//
// Each methods accept two arguments:
//    - Text to search for (txt)
//    - An optional index from which to start the search: Help minimizes the amount
//      of the string being searched.

const msg = 'Hello world!'

console.log(msg.startsWith('Hello')) // => true
console.log(msg.endsWith('!')) // => true
console.log(msg.includes('o')) // => true

console.log(msg.startsWith('o')) // => false
console.log(msg.endsWith('world!')) // => true
console.log(msg.includes('x')) // => false

console.log(msg.startsWith('o', 4)) // => true
console.log(msg.endsWith('o', 8)) // => true
console.log(msg.includes('o', 8)) // => false

// LIMITATIONS
//  Each only returns a boolean value
//  If you need to find the actual position of one string within another,
//  use the `str.indexOf()` or `str.lastIndexOf()`

// `str.repeat(times)`
// *******************
//  Returns a new string containing the original string repeated the specified number of times
//  A convenience function above all else: especially useful when manipulating text
//  Particularly useful in code formatting utilities that need to create indentation levels

console.log('z'.repeat(3)) // => 'zzz'
console.log('hello'.repeat(2)) // => 'hellohello'
console.log('abc'.repeat(4)) // => 'abcabcabcabc'

// REGEXP 'y' FLAG
// ***************
//  Affects a regular expression search’s sticky property
//  It tells the search to start matching characters in a string at the position
//  specified by the regular expression’s lastIndex property
//  If there is no match at that location, then the regular expression stops matching

let text = 'hello1 hello2 hello3'
let pattern = /hello\d\s?/ // No flag
let result = pattern.exec(text)
let globalPattern = /hello\d\s?/g // With g flag
let globalResult = globalPattern.exec(text)
let stickyPattern = /hello\d\s?/y  // With y flag
let stickyResult = stickyPattern.exec(text)

console.log(result[0]) // 'hello1 '
console.log(globalResult[0]) // 'hello1 '
console.log(stickyResult[0]) // 'hello1 '

// Changing the lastIndex property
// The regular expression should start matching from the second character on all of them

pattern.lastIndex = 1 // Ignores the change
globalPattern.lastIndex = 1 // Searching forward from the second character of the string ('e')
stickyPattern.lastIndex = 1 // Doesn’t match anything

result = pattern.exec(text)
globalResult = globalPattern.exec(text)
stickyResult = stickyPattern.exec(text)

console.log(result[0]) // 'hello1 '
console.log(globalResult[0]) // 'hello2 '
console.log(stickyResult[0]) // Error! stickyResult is null

// NOTE on sticky flag 'y'
// 1. The lastIndex property is only honored when calling methods that exist on
//    the regular expression object, like the exec() and test() methods.
//    Passing the regular expression to a string method, such as match(), will
//    not result in the sticky behavior.
// 2. When using the ^ character to match the start of a string, sticky regular
//    expressions only match from the start of the string (or the start of the
//    line in multiline mode)

// To detect sticky, we can use the `.sticky` property
// This returns a boolean
// This property is read-only based on the presence of the flag and cannot be
// changed in code

let pattern = /hello\d/y
console.log(pattern.sticky) // true

// Detecting support for y flag
// This returns false if it’s unable to create a regular expression with the y flag

function hasRegExpY () {
  try {
    var pattern = new RegExp('.', 'y')
    return true
  } catch (ex) {
    return false
  }
}

// DUPLICATING REGEXP
// ******************
//  In ES5, it is possible to duplicate a regular expression

let reg = /ab/i
let regDup = new RegExp(reg)

// But if you provide the second argument to the RegExp constructor, which
// specifies the flags for the regular expression, your code won’t work

let re1 = /ab/i
let re2 = new RegExp(re1, 'g') // Throws an error in ES5: The second argument cannot be used when the first
// argument is a regular expression
// In ES2015: The second argument is allowed and overrides any flags present
// on the first argument

// REGEXP `flags` PROPERTY
// **********************
//  A new property that allows to return existing flags
//  With ES5, the text of the RegExp can be accessed with `regexp.source`
//  But flags were not easily accessible until ES6 `regexp.flags`
//  Both properties are prototype accessor properties with only a getter assigned, making them read-only
//  Returns the string representation of any flags applied to a regular expression

let re = /ab/gi
console.log(re.source) // => "ab"
console.log(re.flags) // => "gi"

// TEMPLATE LITERALS
// *****************
//  Provide syntax for creating domain-specific languages (DSLs) for working with
//  content in a safer way than the solutions available in ECMAScript 5 and earlier
//  Answer to the following features that JavaScript lacked all the way through
//  ECMAScript 5:
//    - Multiline strings
//    - Basic string formatting
//    - HTML escaping: Safer to insert into HTML

// Template Literals Basic Syntax
//  Using backticks instead of quotes
//  Escape all other backticks

let message = `Hello world!`
console.log(message) // 'Hello world!'
console.log(typeof message) // 'string'
console.log(message.length) // 12

// MULTILINE STRINGS
// *****************
//  ES5 workaround was to escape the newline character
//  But the behavior is defined as a bug and many developers recommend avoiding it

var message2 = 'Multiline \
string'
console.log(message2) // 'Multiline string'
var message3 = 'Multiline \n\
string'
console.log(message3) // 'Multiline
                      //  string'

// Another solution was to use concatenation
// Or using the `.join` method of an array of strings

var message4 = [
  'Multiline ',
  'string'
].join('\n')

let message5 = 'Multiline \n' +
    'string'

// In ES2015, we simply use template literals
//  Just include a newline where you want, and it shows up in the result
//  NOTE: All whitespace inside the backticks is part of the string
//  For better indentation, start at next line, then trim or escape first line

let message6 = `Multiline
string`

console.log(message)  // "Multiline
                      //  string"
console.log(message.length) // 16

// All whitespaces is considered part of the string
// Using str.trim() to remove the leading whitespace

let html1 = `
<div>
  <h1>Title</h1>
</div>`.trim()

// Or we can also escaping first line to remove the leading whitespace

let html2 = `\
<div>
  <h1>Title</h1>
</div>`

// EXPRESSION SUBSTITUTIONS
// ************************
//  Variables can be evaluated
//  Attempting to use an undeclared variable in a template literal throws an
//  error in both strict and non-strict modes
//  All substitutions are JavaScript expressions

let name = 'Nicholas'
console.log(`Hello, ${name}.`)  // "Hello, Nicholas."

let count = 10
let price = 0.25
let message15 = `${count} items cost $${(count * price).toFixed(2)}.`
console.log(message15)  // "10 items cost $2.50."

// It is also possible to nest template literals

let name2 = 'Nicholas'
let message22 = `Hello, ${`my name is ${name2}`}.`
console.log(message22) // "Hello, my name is Nicholas."

// TAGGED TEMPLATE
// ***************
//  Template literals can also be tagged
//  A tag is a function that is called with the processed template literal data
//  The tag is specified at the beginning of the string

let hello = tagfunc`Hello world`

// Defining a Tag function
//  The first argument is an array containing the literal strings as interpreted by JavaScript
//  Each subsequent argument is the interpreted value of each substitution

function tagfunc (literals, ...substitutions) {
    // return a string
}

// Example of Using Tags

let count = 10
let price = 0.25
let message = passThru`${count} items cost $${(count * price).toFixed(2)}.`

function passThru (literalsArr, ...substitutions) {
  console.log(literalsArr[0]) // => "" // Before the first substitution
  console.log(literalsArr[1]) // => " items cost $" // String after the first substitution and before the second
  console.log(literalsArr[2]) // => "." // String after the second substitution
  // The rest operator on substitutions result in: 10, 2.50
}

// The first item in literals is an empty string
//  This ensures that literals[0] is always the start of the string
//  literals[literals.length - 1] is always the end of the string
//  There is always one fewer substitution than literal
//  substitutions.length === literals.length - 1 is always true

// NOTE:
//  The values contained in substitutions are not necessarily strings. 
//  If an expression evaluates to a number, as in the previous example, 
//  then the numeric value is passed in. 
//  Determining how such values should output in the result is part of the tag’s job.

// Template tags also have access to raw string information
// which primarily means access to character escapes before they are transformed
// into their character equivalents.
// The first argument in a tag function is an array with an extra property called `raw`
// The `raw` property is an array containing the raw equivalent of each literal value
//  Any character escapes, including Unicode codepoint escapes, should be returned in their raw form
//  literals.raw[literals.length - 1]
