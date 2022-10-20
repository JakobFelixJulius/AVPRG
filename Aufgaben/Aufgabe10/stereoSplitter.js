let context = new AudioContext();
let sound = new Audio("../sounds/stereoSound.wav");
let isPlaying = false;
let stereoSwitched = false;
let playStopButton = document.querySelector("#playStopButton");
let source = context.createMediaElementSource(sound);
let splitter = context.createChannelSplitter(2);
let merger = context.createChannelMerger(2);
let gainLeft = context.createGain();
let gainRight = context.createGain();

gainLeft.gain.value = 0.5;
gainRight.gain.value = 0.5;

source.connect(splitter);
splitter.connect(gainLeft, 0, 0);
splitter.connect(gainRight, 1, 0);
gainLeft.connect(merger, 0, 0);
gainRight.connect(merger, 0, 1);
merger.connect(context.destination);

document.querySelector("#stereoSlider").addEventListener("input", function(e) {
    gainLeft.gain.value = 0.5 - (e.target.value / 200);
    gainRight.gain.value = 0.5 + (e.target.value / 200);;
});

document.querySelector("#switchStereoButton").addEventListener("click", function(e) {
    gainLeft.disconnect();
    gainRight.disconnect();

    if (!stereoSwitched) {
        gainLeft.connect(merger, 0, 1);
        gainRight.connect(merger, 0, 0);
    } else {
        gainLeft.connect(merger, 0, 0);
        gainRight.connect(merger, 0, 1);
    }

    stereoSwitched = !stereoSwitched;
});






playStopButton.addEventListener("click", function (e) {
    if (isPlaying) {
        sound.pause();
        playStopButton.innerHTML = "Play";
    } else {
        sound.play();
        playStopButton.innerHTML = "Stop";
    }

    isPlaying = !isPlaying;
});

sound.addEventListener("ended", function (e) {
    isPlaying = false;
    playStopButton.innerHTML = "Play";
});
