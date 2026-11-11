console.log('Happy developing ✨')
var broj = 10; // var lol ajvar

function testvar() {
    if (true) {
        console.log(broj)
    }
}

let name = "Quandale"

alert(`Hello ${name}!`)

alert("gay nigga XDDDD")


// Земање на HTML елементите со помош на document.getElementById
const inputElement = document.getElementById("vozrastInput");
const porakaElement = document.getElementById("poraka");

// Земање на вредноста внесена во полето (претворена во број)


function proveriVozrast() {
    var vozrast = Number(inputElement.value);
    if (vozrast >= 18) {
        porakaElement.innerText = "Вие сте полнолетни!";
        porakaElement.style.color = "green";
    } else if (vozrast > 0) {
        porakaElement.innerText = "Вие сте малолетни.";
        porakaElement.style.color = "red";
    } else {
        porakaElement.innerText = "Ве молиме внесете валиден број!";
        porakaElement.style.color = "orange";
    }
}

function interpolate(max, min) {
    return function (p) {
        return min + (max - min) * p;
    }
}

let f = interpolate(1, 100)
f(.3)
