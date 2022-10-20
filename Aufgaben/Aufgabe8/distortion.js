var context = new AudioContext(),
    sound = new Audio("../sounds/guitar.wav"),
    source = context.createMediaElementSource(sound),
    distortion = context.createWaveShaper(),
    isPlaying = false,
    playStopButton = document.querySelector("#playStopButton");


sound.loop = true;
distortion.curve = makeDistortionCurve(0);
distortion.oversample = "4x";

source.connect(distortion);
distortion.connect(context.destination);

document.querySelector("#distortionSlider").addEventListener("input", function (e) {
    document.querySelector("#distortionOutput").innerHTML = this.value;
    distortion.curve = makeDistortionCurve(Number(this.value));
});

function makeDistortionCurve(amount) {
    var n_samples = 44100,
        curve = new Float32Array(n_samples),
        test = [],
        i;

    for (i = 0; i < n_samples; i++) {
        var x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + (amount * Math.abs(x)));
    }

    return curve;
}

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
