/* jshint esversion: 6 */ // => This line is for JSHint

// Better Unicode Support:

// In EcmaScript 5:
//    - UTF-16:
//        All string properties and methods, like the length property and
//        the charAt() method, were based on these 16-bit code units.
//    - Limitation of UTF-16:
//        Not enough to cover every single character codes in the world.
//        There are just too much code-points to cover.
//        Basic Multilingual Plane (BMP): First 2^16 code-points, using a single
//        16-bit code unit.
//        Supplementary Plane: Everything beyond the BMP, using the surrogate pairs.
//    - Any single character in a string can be either one code unit for BMP
//      characters, giving a total of 16 bits, or two units for supplementary
//      plane characters, giving a total of 32 bits.
//    - All string operations and methods work on 16-bit code-units: Unexpected
//      results from strings that use surrogate pairs (2 x 16-bit).
var text = "𠮷"; // This is using a surrogate pair
console.log(text.length);           // 2 (2 x 16-bit)
console.log(/^.$/.test(text));      // false: A regular expression trying to
                                    // match a single character fails because it
                                    // thinks there are two characters.
console.log(text.charAt(0));        // ""
console.log(text.charAt(1));        // ""
console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271

// In EcmaScript 6: Still UTF-16, with improvements
//  UTF-16 string encoding address problems like these.
//  Standardizing string operations based on this character encoding.
//  JavaScript can support functionality designed to work specifically with
//  surrogate pairs.

// codePointAt() Method:
//  Retrieves the Unicode code point that maps to a given position in a string.
//  Accepts the code unit position rather than the character position.
//  Returns an integer value.
//  Returns the same value as the charCodeAt() method unless it operates on
//  non-BMP characters.
var text = "𠮷a";

console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
console.log(text.charCodeAt(2));    // 97
console.log(text.codePointAt(0));   // 134071
console.log(text.codePointAt(1));   // 57271
console.log(text.codePointAt(2));   // 97
//  Calling the codePointAt() method on a character is the easiest way to
//  determine if that character is represented by one or two code points.
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
console.log(is32Bit("𠮷"));         // true
console.log(is32Bit("a"));          // false

// String.fromCodePoint() Method:
//  Produces a single-character string from a given code point.
//  This is the reverse of codePointAt().
//  A more complete version of the String.fromCharCode() method.
console.log(String.fromCodePoint(134071));  // "𠮷"

// normalize() Method:
//  Different characters may be considered equivalent for the purpose of sorting
//  or other comparison-based operations.
//  Two Ways to define the relationship:
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
//    - Normalization Form Canonical Composition ("NFC")
//    - Normalization Form Canonical Decomposition ("NFD")
//    - Normalization Form Compatibility Composition ("NFKC")
//    - Normalization Form Compatibility Decomposition ("NFKD")
//
//  Just keep in mind that when comparing strings, both strings must be
//  normalized to the same form.
var normalized = values.map(function(text) {
  return text.normalize();
});

normalized.sort(function(first, second) {
  if (first < second) {
    return -1;
  }
  else if (first === second) {
    return 0;
  }
  else {
    return 1;
  }
});

values.sort(function(first, second) {
  var firstNormalized = first.normalize("NFD"),
      secondNormalized = second.normalize("NFD");
  if (firstNormalized < secondNormalized) {
    return -1;
  }
  else if (firstNormalized === secondNormalized) {
    return 0;
  }
  else {
    return 1;
  }
});

// RegExp "u" Flag:
//  Regular expressions assume 16-bit code units, where each represents a single
//  character. To address this problem, ES6 defines a u flag for regular
//  expressions, which stands for Unicode.
//  When u flag set: Switches modes to work on characters, not code units.
//  The regular expression should no longer get confused about surrogate pairs
//  in strings and should behave as expected.
var text = "𠮷";

console.log(text.length);           // 2
console.log(/^.$/.test(text));      // false
console.log(/^.$/u.test(text));     // true

// Counting Code-points:
//  Although this approach works, it’s not very fast, especially when applied to
//  long strings.
//  Try to minimize counting code points whenever possible.
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}
console.log(codePointLength("abc"));    // 3
console.log(codePointLength("𠮷bc"));   // 3

// Note: Attempting to use the "u" flag in JavaScript engines that aren’t
// compatible with ECMAScript 6 throws a syntax error.
// Here, we test for its support.
function hasRegExpU() {
  try {
    // The constructor will throw an error if u isn’t supported.
    var pattern = new RegExp(".", "u");
    return true;
  }
  catch(e) {
    return false;
  }
}

// Methods for Identifying Substrings:
//  Historially, indexOf() has been used to identify strings inside other strings.
//  3 Methods in ES6:
//    - String.includes():    Returns true if the given text is found anywhere
//                            within the string. Returns false if not.
//    - String.startsWith():  Returns true if the given text is found at the
//                            beginning of the string. It returns false if not.
//    - String.endsWith():    Returns true if the given text is found at the end
//                            of the string. It returns false if not.
//
// Each methods accept two arguments:
//    - Text to search for
//    - An optional index from which to start the search: Minimizes the amount
//      of the string being searched.
var msg = "Hello world!";

console.log(msg.startsWith("Hello"));       // true
console.log(msg.endsWith("!"));             // true
console.log(msg.includes("o"));             // true

console.log(msg.startsWith("o"));           // false
console.log(msg.endsWith("world!"));        // true
console.log(msg.includes("x"));             // false

console.log(msg.startsWith("o", 4));        // true
console.log(msg.endsWith("o", 8));          // true
console.log(msg.includes("o", 8));          // false

// Limitation:
//  Each only returns a boolean value.
//  If you need to find the actual position of one string within another,
//  use the String.indexOf() or String.lastIndexOf().

// String.repeat(times) Method:
//  Returns a new string containing the original string repeated the specified
//  number of times.
//  A convenience function above all else: especially useful when manipulating
//  text.
//  Particularly useful in code formatting utilities that need to create
//  indentation levels.
console.log("x".repeat(3));         // "xxx"
console.log("hello".repeat(2));     // "hellohello"
console.log("abc".repeat(4));       // "abcabcabcabc"















