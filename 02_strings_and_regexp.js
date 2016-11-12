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







