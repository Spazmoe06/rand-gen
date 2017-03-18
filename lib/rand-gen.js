"use strict";

const packageJSON = require("../package.json"),
    crypto = require("crypto"),
    extend = require('util')._extend,
    defaultCharacters = {
        alphaLower: "abcdefghijklmnopqrstuvwxyz",
        alphaUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numeric: "0123456789",
        spChars: "!@#$%^&*()_-+=;:{}[]\"'<>,.\\/|~`?",
        include: ""
    },
    defaultSettings = {
        length: 15,
        uppercase: true,
        lowercase: true,
        numbers: true,
        spChars: true,
        allowRepeats: true,
        isogram: false
    };

let characterObj = {},
    settingParams = {},
    randGen,
    _dedupInclude,
    _excludeChars,
    _getRandomBytes,
    _escapeRegExp,
    _reset,
    _setParams,
    _useableChars,
    _gen;

_useableChars = function () {
    let combinedChars = "";
    if (settingParams.lowercase) {
        combinedChars += characterObj.alphaLower;
    }
    if (settingParams.uppercase) {
        combinedChars += characterObj.alphaUpper;
    }
    if (settingParams.numbers) {
        combinedChars += characterObj.numeric;
    }
    if (settingParams.spChars) {
        combinedChars += characterObj.spChars;
    }
    if (characterObj.include.length > 0) {
        combinedChars += characterObj.include;
    }
    return combinedChars;
};

_dedupInclude = function (includChars) {
    const ica = typeof includChars === "string" ? includChars.split("") : includChars,
        al = characterObj.alphaLower,
        au = characterObj.alphaUpper,
        n = characterObj.numeric,
        sp = characterObj.spChars;
    let i,
        includeStr = "";
    for (i = 0; i < includChars.length; i++) {
        const v = ica[i];
        if (al.indexOf(v) === -1 && au.indexOf(v) === -1 && n.indexOf(v) === -1 && sp.indexOf(v) === -1 ) {
            includeStr += v;
        }
    }
    return includeStr;
};
_escapeRegExp = function (str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};
_excludeChars = function (excludeChars) {
    const eca = typeof excludeChars === "string" ? excludeChars.split("") : excludeChars;

    let al = characterObj.alphaLower,
        au = characterObj.alphaUpper,
        n = characterObj.numeric,
        sp = characterObj.spChars;
    let i;
    for(i = 0; i < excludeChars.length; i++) {
        const v = eca[i];
        let rep = new RegExp(_escapeRegExp(v), "g");
        if (al.indexOf(v) > -1) {
            al = al.replace(rep, "");
            characterObj.alphaLower = al;
        } else if (au.indexOf(v) > -1) {
            au = au.replace(rep, "");
            characterObj.alphaUpper = au;
        } else if (n.indexOf(v) > -1) {
           n = n.replace(rep, "");
           characterObj.numeric = n;
        } else if (sp.indexOf(v) > -1) {
            sp = sp.replace(rep, "");
            characterObj.spChars = sp;
        }
    }
};

_getRandomBytes = function (charCount) {
    settingParams.maxByte = 256 - (256 % charCount);
    const buffLen = Math.ceil((settingParams.length - 1) * 256 / (settingParams.maxByte));
    return crypto.randomBytes(256);
};
_reset = function () {
    settingParams = extend({}, defaultSettings);
    characterObj =  extend({}, defaultCharacters);
};
_setParams = function (params) {
    try {
        if (params) {
            let paramsKeyArray = Object.keys(params),
                i,
                y;
            for (i = 0; i < paramsKeyArray.length; i++) {
                let paramsKey = paramsKeyArray[i];
                if (settingParams.hasOwnProperty(paramsKey)) {
                    if (typeof settingParams[paramsKey] === typeof params[paramsKey]) {
                        settingParams[paramsKey] = params[paramsKey];
                    } else {
                        // param value is of the wrong type, exit loop early and error
                        throw 'Parameter "' + paramsKey + '" value is the wrong type';
                    }
                } else if (paramsKey === "include" && params[paramsKey].length > 0) {
                    characterObj.include = _dedupInclude(params[paramsKey]);
                } else if (paramsKey === "exclude" && params[paramsKey].length > 0) {
                    _excludeChars(params[paramsKey]);
                }else {
                    // parameter does not exist, exit loop early and error
                    throw 'Parameter "' + paramsKey + '" does not exist.';
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
};
_gen = function () {
    const characters = _useableChars();
    let ranStr = "",
        len = settingParams.length;
    while (len > 0) {
        const byteArray = _getRandomBytes(characters.length);
        let i;
        for (i = 0; i < byteArray.length && len > 0; i++) {
            let byte = byteArray.readUInt8(i);
            if (byte < settingParams.maxByte) {
                ranStr += characters[Math.ceil(byte % characters.length)];
                len -= 1;
            }
        }
    }
    return ranStr;
};
module.exports = exports = randGen = function scope (params) {
    try {
        // Call reset to make sure each call to rand-gen is in a known state.
        _reset();
        _setParams(params);

        const numberOnly = function (toInt) {
            settingParams.uppercase = false;
            settingParams.lowercase = false;
            settingParams.spChars = false;
            let genNumber = _gen();
            if (toInt) {
                genNumber = parseInt(genNumber, 10);
            }
            return genNumber;
        };
        const specialCharsOnly = function () {
            settingParams.uppercase = false;
            settingParams.lowercase = false;
            settingParams.numbers = false;
            return _gen();
        };
        const alphabetOnly = function () {
            settingParams.numbers = false;
            settingParams.spChars = false;
            return _gen();
        };
        const lowercaseOnly = function () {
            settingParams.uppercase = false;
            settingParams.numbers = false;
            settingParams.spChars = false;
            return _gen();
        };
        const uppercaseOnly = function () {
            settingParams.lowercase = false;
            settingParams.numbers = false;
            settingParams.spChars = false;
            return _gen();
        };
        const singleChar = function () {
            settingParams.length = 1;
            return _gen();
        };
        // An isogram is a series of characters that do not have the same two character in it.
        const isogram = function () {
                const charLen = _useableChars().length,
                    settingLen = settingParams.length;
                let len = settingLen,
                    retStr = "";
                if (charLen >= settingLen) {
                    settingParams.length = 1;
                    while (len > 0) {
                        let char = _gen();
                        retStr += char;
                        _excludeChars(retStr);
                        len--;
                    }
                    return retStr;
                } else {
                    const err = new Error("Invalid length for isogram (" + settingLen + " chars). Length option cannot be greater than the total number of characters in the pool (" + charLen + " chars).");
                    throw err;
            }
        };
        const generate = function () {
            return _gen();
        };
        const funcCalls = {
            alpha: {
                lowercase: lowercaseOnly,
                uppercase: uppercaseOnly
            },
            alphabet: alphabetOnly,
            number: numberOnly,
            spChars: specialCharsOnly,
            isogram: isogram,
            char: singleChar,
            gen: generate
        };
        return funcCalls;
    } catch (e) {
        return "Error: " + e;
    }
};
// Call require("ran-gen").version;
randGen.version = "v" + packageJSON.version;
