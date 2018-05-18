var result = document.querySelector('.result');
var button = document.querySelector('.button');

button.onclick = generateRUT;
generateRUT();

function generateRUT() {
    var rndArray = new Uint32Array(2);

    while (true) {
        window.crypto.getRandomValues(rndArray);
        var rndNumStr = (rndArray[0] * rndArray[1]).toString().substr(0, 11);
        if (parseInt(rndNumStr.substr(2, 6)) > 0 && parseInt(rndNumStr.substr(0, 2)) > 0 && parseInt(rndNumStr.substr(0, 2)) < 22) break;
    }

    var a = [];

    for (var i = 0; i < 11; i++) a[i] = parseInt(rndNumStr.charAt(i));

    a[8] = 0;
    a[9] = 0;

    var factor = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var c = [];
    var obtainedResult = 0;

    for (var i = 0; i < a.length; i++) {
        c[i] = a[i] * factor[i];
        obtainedResult += c[i];
    };

    var modEleven = obtainedResult % 11;
    var checkDigit = 11 - modEleven;
    var number = 0;
    var ten = 10;

    if (checkDigit < ten) {
        var number = checkDigit;
        var exponent = 11;
        for (var i = 0; i < a.length - 1; i++) {
            number += a[i] * Math.pow(ten, exponent);
            exponent = exponent - 1;
        };
        number += a[a.length - 1] * ten;
    };

    if (checkDigit === 11) {
        var exponent = 11;
        for (var i = 0; i < a.length - 1; i++) {
            number += a[i] * Math.pow(ten, exponent);
            exponent = exponent - 1;
        };
        number += a[a.length - 1] * ten;
    };

    if (checkDigit === ten) {
        var exponent = 10;
        for (var i = 0; i < a.length - 2; i++) {
            number += a[i] * Math.pow(ten, exponent);
            exponent = exponent - 1;
        };
        number += a[a.length - 2] * 10 + a[a.length - 1];
    };

    result.innerHTML = number;
}