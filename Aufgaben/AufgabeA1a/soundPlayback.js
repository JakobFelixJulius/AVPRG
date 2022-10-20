var drumpads = document.getElementsByClassName("drumpad");
var buffers = [];
var bufferSourceNodes = [];
var context = new AudioContext();
// var sounds = [];
// var soundNodes = [];

for (let i = 0; i < drumpads.length; i++) {
    // sounds[i] = new Audio("../sounds/drumsounds/sound" + (i + 1) + ".wav");
    // soundNodes[i] = context.createMediaElementSource(sounds[i]);
    // soundNodes[i].connect(context.destination);
    
    getData(i);
    drumpads[i].addEventListener("mousedown", function (e) {playSound(i)});
}

function getData(i) {
    fetch("../sounds/drumsounds/sound" + (i + 1) + ".wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            buffers[i] = audioBuffer;
        })
        .catch(console.error);
}

function playSound(i) {
    // sounds[i].play()
    bufferSourceNodes[i] = context.createBufferSource();
    bufferSourceNodes[i].buffer = buffers[i];
    bufferSourceNodes[i].connect(context.destination);
    bufferSourceNodes[i].start(context.currentTime);
}



