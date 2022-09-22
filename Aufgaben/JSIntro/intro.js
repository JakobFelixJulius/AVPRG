// das ist ein Kommentar - nach // wird alles irgnoriert
//------------------------------------------------//
// Variablen
let eineVariable = 1;
console.log(eineVariable);
eineVariable = true;
console.log(eineVariable);
eineVariable = "Ich bin eine Variable!";
console.log(eineVariable);

//------------------------------------------------//
// Operatoren
var foo = 1;
var bar = 2;

var foo2 = 3;
var bar2 = 4;

var result = (foo == bar);

console.log(result);

//------------------------------------------------//
// if statements
var a = 1;
var b = true;
var c = 2;
var d = 1;

if (a == b) {
    console.log("a ist gleich b");
} else {
    console.log("a ist nicht gleich b");
}
//------------------------------------------------//
// Loops
for (i = 0; i < 10; i++) {
    console.log("Ich bin for " + i);
}

var j = 0;
while (j < 10) {
    console.log("Ich bin while " + j);
    j++;
}

//------------------------------------------------//
// Funktionen

function meineErsteFunktion() {
    console.log("Ich bin eine Funktion!");
}

meineErsteFunktion();

var myButton = document.querySelector("#myButton");

myButton.addEventListener('mousedown', function(e){
    vergleichen(2, 2);

});
function vergleichen(a, b) {
    if (a == b) {
    console.log("a ist gleich b");
    document.querySelector("#myDiv").innerHTML = "cool!"

} else {
    console.log("a ist nicht gleich b");
}
}

//vergleichen("3", 3);
