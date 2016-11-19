"use strict";

const ranGen = require("../lib/ran-gen");

const test = function () {
    // ranGen().alphabet();
    // ranGen({
    //     length: 17
    // }).alpha.lowercase();
    // ranGen().alpha.uppercase();
    // ranGen({length: 25}).number();
    // ranGen().spChars();

    // const smallLength = ranGen({length: 12})
    // smallLength.alphabet();
    // smallLength.alpha.lowercase();

    // ranGen().number();
    console.log(ranGen.version);
    console.log(ranGen().number());
    console.log(ranGen({length: 10}).number());
    console.log(ranGen({length: 25}).number());
    console.log(ranGen().number());
    console.log(ranGen().spChars());
    console.log(ranGen().alphabet());
    console.log(ranGen().alpha.lowercase());
    console.log(ranGen().alpha.uppercase());
    console.log(ranGen({
        include: ["a", "Ȧ", "b", "Ö"]
    }).gen());
    console.log(ranGen().gen());
    console.log(ranGen({
        length: 30,
        spChars: false
    }).isogram());
    console.log(ranGen({length: 1}).gen());
    console.log(ranGen().char());
    // ranGen().doesNotExist();
};
test();