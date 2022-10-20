var context = new AudioContext();
var sound = new Audio("../sounds/sound.wav");
var source = context.createMediaElementSource(sound);
var convolver = context.createConvolver();
var isPlaying = false;
sound.loop = true;


loadImpulseResponse("room");

document.querySelector("#selectList").addEventListener("change", function (e) {
    var name = e.target.options[e.target.selectedIndex].value;
    loadImpulseResponse(name);
});

function loadImpulseResponse(name) {
    fetch("../sounds/impulseResponses/" + name + ".wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            if (convolver) {convolver.disconnect(); }
            convolver = context.createConvolver();
            convolver.buffer = audioBuffer;
            convolver.normalize = true;

            source.connect(convolver);
            convolver.connect(context.destination);
        })
        .catch(console.error);
}

document.querySelector("#playStopButton").addEventListener("click", function (e) {
    if (isPlaying) {
        sound.pause();
        e.target.innerHTML = "Play";
    } else {
        sound.play();
        e.target.innerHTML = "Stop";
    }
    isPlaying = !isPlaying;
});

sound.addEventListener("ended", function (e) {
    isPlaying = false;
    document.querySelector("#playStopButton").innerHTML = "Play";
});
