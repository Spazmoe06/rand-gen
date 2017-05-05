"use strict";

const randGen = require("../lib/rand-gen");
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const allDefaultsChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=;:{}[]\"'<>,.\\/|~`?";

describe("Test rand-gen", () => {
    describe("gen function", () => {
        it("should create a string", (done) => {
            const randString = randGen().gen();
            randString.should.be.a("string");
            done();
        });
        it("should have a default length of 15 characters", (done) => {
            const randString = randGen().gen();
            randString.should.have.lengthOf(15);
            done();
        });
        it("should be able to change the length to 25 characters", (done) => {
            const randString = randGen({length: 25}).gen();
            randString.should.have.lengthOf(25);
            done();
        });
        it("should be able to change the length to 5 characters", (done) => {
            const randString = randGen({length: 5}).gen();
            randString.should.have.lengthOf(5);
            done();
        });
        it("should be able to include characters as string and exclude all other characters", (done) => {
            const randString = randGen({
                include: "ȦÖ",
                exclude: allDefaultsChars
            }).gen();
            const hasȦorÖ = (/([ȦÖ]).*?/).test(randString);
            const foundDefaultChars = (/([a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);
            randString.should.have.lengthOf(15);
            hasȦorÖ.should.equal(true);
            foundDefaultChars.should.equal(false);
            done();
        });
        it("should be able to change option spChars to off", (done) => {
            const randString = randGen({
                length: 50,
                spChars: false
            }).gen();
            const foundSpChars = (/([\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);
            const foundOtherChars = (/([a-zA-Z0-9]).*?/).test(randString);

            foundSpChars.should.equal(false);
            foundOtherChars.should.equal(true);
            done();
        });
        it("should be able to change option numbers to off", (done) => {
            const randString = randGen({
                length: 50,
                numbers: false
            }).gen();
            const foundNumbers = (/([0-9]).*?/).test(randString);
            const foundOtherChars = (/([a-zA-Z\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            foundNumbers.should.equal(false);
            foundOtherChars.should.equal(true);
            done();
        });
        it("should be able to change option uppercase to off", (done) => {
            const randString = randGen({
                length: 50,
                uppercase: false
            }).gen();
            const foundUppercase = (/([A-Z]).*?/).test(randString);
            const foundOtherChars = (/([a-z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            foundUppercase.should.equal(false);
            foundOtherChars.should.equal(true);
            done();
        });
        it("should be able to change option lowercase to off", (done) => {
            const randString = randGen({
                length: 50,
                lowercase: false
            }).gen();
            const foundLowercase = (/([a-z]).*?/).test(randString);
            const foundOtherChars = (/([A-Z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            foundLowercase.should.equal(false);
            foundOtherChars.should.equal(true);
            done();
        });

    });
    describe("number function", () => {
        it("should only contain numbers between 0-9", (done) => {
            const randString = randGen().number();
            const foundNumbers = (/([0-9]).*?/).test(randString);
            const foundOtherChars = (/([a-zA-Z\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            foundNumbers.should.equal(true);
            foundOtherChars.should.equal(false);
            done();
        });
        it("should be a string by default", (done) => {
            const randString = randGen().number();
            randString.should.be.a("string");
            done();
        });
        it("should be able to return a number type", (done) => {
            const randNumber = randGen().number(true);
            randNumber.should.be.a("number");
            done();
        });
        it("should return a number with a radix of 2", (done) => {
            const  randString = randGen().number(2);

            const foundNumbers = (/([0-1]).*?/).test(randString);
            const foundOtherChars = (/([a-zA-Z2-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            randString.should.be.a("string");
            randString.should.have.lengthOf(15);
            foundNumbers.should.equal(true);
            foundOtherChars.should.equal(false);

            done();
        });
        it("should return a number with a radix of 16", (done) => {
            const  randString = randGen().number(16);

            const foundNumbers = (/([0-9a-f]).*?/).test(randString);
            const foundOtherChars = (/([g-zA-Z\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            randString.should.be.a("string");
            randString.should.have.lengthOf(15);
            foundNumbers.should.equal(true);
            foundOtherChars.should.equal(false);

            done();
        });
        it("should return a number with a radix of 36", (done) => {
            const  randString = randGen().number(16);

            const foundNumbers = (/([0-9a-z]).*?/).test(randString);
            const foundOtherChars = (/([A-Z\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            randString.should.be.a("string");
            randString.should.have.lengthOf(15);
            foundNumbers.should.equal(true);
            foundOtherChars.should.equal(false);

            done();
        });
        it("should throw an error if a radix is less than 2", (done) => {
            assert.throws(randGen().number.bind(randGen().number, 1), Error, "Radix for the number can not be greater than 36 or less than 2");
            done();
        });
        it("should throw an error if a radix is greater than 36", (done) => {
            assert.throws(randGen().number.bind(randGen().number, 37), Error, "Radix for the number can not be greater than 36 or less than 2");
            done();
        });
        it("should throw an error if a letter is detected in the function parameter", (done) => {
            assert.throws(randGen().number.bind(randGen().number, "1a"), Error, "Invalid parameter type. Please pass a boolean value or number between 2 and 36.");
            done();
        });
        it("should throw an error if the function parameter is of the wrong type", (done) => {
            assert.throws(randGen().number.bind(randGen().number, []), Error, "Invalid parameter type. Please pass a boolean value or number between 2 and 36.");
            done();
        });
    });
    describe("alphabet function", () => {
        it("should only contain contain the alphabet, not special characters or numbers", (done) => {
            const randString = randGen().alphabet();
            const foundAlphabet = (/([a-zA-Z]).*?/).test(randString);
            const foundOtherChars = (/([0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            randString.should.be.a("string");
            foundAlphabet.should.equal(true);
            foundOtherChars.should.equal(false);
            done();
        });
    });
    describe("alpha.lowercase function", () => {
        it("should only contain lowercase letters, not special characters, numbers, or uppercase letters", (done) => {
            const randString = randGen().alpha.lowercase();
            const foundLowercase = (/([a-z]).*?/).test(randString);
            const foundOtherChars = (/([A-Z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            randString.should.be.a("string");
            foundLowercase.should.equal(true);
            foundOtherChars.should.equal(false);
            done();
        });
    });
    describe("alpha.uppercase function", () => {
        it("should only contain uppercase letters, not special characters, numbers, or lowercase letters", (done) => {
            const randString = randGen().alpha.uppercase();
            const foundUpperCase = (/([A-Z]).*?/).test(randString);
            const foundOtherChars = (/([a-z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);

            randString.should.be.a("string");
            foundUpperCase.should.equal(true);
            foundOtherChars.should.equal(false);
            done();
        });
    });
    describe("spChars function", () => {
        it("should only contain special characters, not numbers or letters from alphabet", (done) => {
            const randString = randGen().spChars();
            const foundSpChars = (/([\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?/).test(randString);
            const foundOtherChars = (/([a-zA-Z0-9]).*?/).test(randString);

            foundSpChars.should.equal(true);
            foundOtherChars.should.equal(false);
            done();
        });
    });
    describe("noDups function", () => {
        it("should not contain any repeating values", (done) => {
            const randString = randGen({length: 50}).noDups();
            const foundRepeat = (/([a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\;\:\{\}\[\]\"\'<\>\,\.\\\/\|\~\`\?]).*?\1/).test(randString);

            foundRepeat.should.equal(false);
            done();
        });
        it("should not allow the strings length to be larger then the pool of characters, should throw error", (done) => {
            expect(function () {
                randGen({length: 110}).noDups();
            }).to.throw(Error, "Invalid length for non duplicate string (110 chars). Length option cannot be greater than the total number of characters in the pool (94 chars).");
            done();
        });
    });
    describe("char function", () => {
        it("should return a single character", (done) => {
            const randString = randGen().char();
            randString.should.have.lengthOf(1);
            done();
        });
    });
});