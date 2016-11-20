"use strict";

const randGen = require("../lib/rand-gen");

const test = function () {
    // randGen().alphabet();
    // randGen({
    //     length: 17
    // }).alpha.lowercase();
    // randGen().alpha.uppercase();
    // randGen({length: 25}).number();
    // randGen().spChars();

    // const smallLength = randGen({length: 12})
    // smallLength.alphabet();
    // smallLength.alpha.lowercase();

    // randGen().number();
    console.log(randGen.version);
    console.log(randGen().number());
    console.log(randGen({length: 10}).number());
    console.log(randGen({length: 25}).number());
    console.log(randGen().number());
    console.log(randGen().spChars());
    console.log(randGen().alphabet());
    console.log(randGen().alpha.lowercase());
    console.log(randGen().alpha.uppercase());
    console.log(randGen({
        include: ["a", "Ȧ", "b", "Ö"]
    }).gen());
    console.log(randGen().gen());
    console.log(randGen({
        length: 30,
        spChars: false
    }).isogram());
    console.log(randGen({length: 1}).gen());
    console.log(randGen().char());
    // randGen().doesNotExist();
};
test();