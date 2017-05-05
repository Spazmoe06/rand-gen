# rand-gen
Random character generator that builds a random string. The string produced can include upper and lowercase letters numbers and special characters.

Version: 1.0.2

## Installation

1. install [npm][1]
2. `npm install rand-gen`

## Getting Started
To use `rand-gen` require it into your file and call `.gen()`.

``` js
var randGen = require('rand-gen');

var myFunction = function () {
    var randStr = randGen().gen();
    console.log(randStr);       // random string of 15 characters.
};
```
The above function will produce a random string that can include all letters a-z lower and uppercase, numbers 0-9, and special characters.

## Options

* `length` - Default length is `15` can be changed.
* `uppercase` - Default is set to `true`, your random string cannot include uppercase letters set to `false`.
* `lowercase` - Default is set to `true`, your random string cannot include lowercase letters set to `false`.
* `numbers` - Default is set to `true`, your random string cannot include numbers set to `false`.
* `spChars` - Default is set to `true`, your random string cannot include special characters set to `false`.
* `include` - If there is a character or a set of characters, you need you include them as a single string or array of individual characters.
* `exclude` - If you need to exclude a character or a set of characters pass them as a single string or array of individual characters.

### Options Usages
``` js
var randGen = require('rqand-gen');

var myFunction1 = function () {
    var randStr = randGen({
        length: 10
    }.gen();
    console.log(randStr);       // random string of 10 characters.
};

var myFunction2 = function () {
    var randStr = randGen({
        length: 20,
        spChars: false,
        numbers: false,
    }.gen();
    console.log(randStr);       // random string of 20 characters that will not have special characters or numbers.
};

var myFunction3 = function () {
    var randStr = randGen({
        length: 20,
        include: "ȦÖ",
        numbers: false,
        spChars: false
    }.gen();
    console.log(randStr);       // random string of 20 characters that will not have special characters or numbers but includes Ȧ and Ö into the pool.
};

var myFunction4 = function () {
    var randStr = randGen({
        include: "ȦÖ",
        exclude: ["A", "0"]
    }.gen();
    console.log(randStr);       // random string of 15 that includes Ȧ and Ö into the pool but removes A and 0 as options.
};
```

## Functions
To go with the optionals that can be passed in you can call individual functions that is not `.gen()` to get random characters.

### Alphabet Functions

The alphabet function are:
``` js
randGen().alphabet();
randGen().alpha.lowercase();
randGen().alpha.uppercase();
```

* `randGen().alphabet();` - Returns a string that can include upper and lower case letters.
* `randGen().alpha.lowercase();` - Returns a string that only includes lowercase letters.
* `randGen().alpha.uppercase();` - Returns a string that only includes uppercase letters.

### Number Function

The `.number()` will generate a string of numbers it can also return a base 10 integer if you pass true into the function.
#### Acceptable parameter
* `Boolean` - Passing a boolean value of true will return a base 10 integer instead of a string.
* `Number` or `String` - You may pass a number or a string representation of a number between 2 and 36 will return a string number in that base.
``` js
randGen().number(); // Will be a string of a base 10 numbers like "012345678901234"
randGen().number(true); // Will return an integer number like 123456789012345
randGen().number(16); // Will return a hexadecimal number like "123456789abcdef"
```


### Special Characters Function
The `.spChars()` will generate a string of special characters. The pool of special characters is this: "!@#$%^&*()_-+=;:{}[]\"'<>,.\/|~`?".
``` js
randGen().spChars();
```

### noDups Function
If the `.noDups()` function is called, no two of the same characters will be in the resulting string. Be sure your length does not exceed the amount of total characters in the pool. By default there are 96 characters so don't make your length 97.
``` js
randGen().noDups(); // Returns something like "asdfg1bD6m%0Vq3"
```

### Single Character Function
`.char()` will return a single random character that could be any lower or uppercase letter, any number or any special character.
``` js
randGen().char();
```


[1]: http://npmjs.org

## License MIT

MIT License

Copyright (c) 2016 Sean McCrory

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
