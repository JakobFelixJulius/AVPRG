let context = new AudioContext();
let oscillators = [];
let buttons = document.getElementsByClassName("button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousedown", function(){startNote(i)});
    buttons[i].addEventListener("mouseup", function(){stopNote(i)});
}

function startNote(arrayIndex) {
    oscillators[arrayIndex] = context.createOscillator();
    oscillators[arrayIndex].frequency.value = 440;
    oscillators[arrayIndex].connect(context.destination);
    oscillators[arrayIndex].start();
}

function stopNote(arrayIndex) {
    oscillators[arrayIndex].stop();
}