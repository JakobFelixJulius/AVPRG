var playStopButton = document.querySelector("#playStopButton");
var isPlaying = false;

var context = new AudioContext();
var sound = new Audio("../sounds/guitar.wav");
sound.loop = true;
sound.crossOrigin = "anonymous";
var source = context.createMediaElementSource(sound);
var gain = context.createGain();
var stereoPanner = context.createStereoPanner();
var delay = context.createDelay(4.0);
var convolver = context.createConvolver();
var filter = context.createBiquadFilter();
var distortion = context.createWaveShaper();
var compressor = context.createDynamicsCompressor();
var isReverbOn = true;

loadImpulseResponse("room");

document.querySelector("#reverbButton").addEventListener("click", function (e) {
    if (isReverbOn) {
        source.connect(gain);
        gain.connect(delay);
        delay.connect(stereoPanner);
        stereoPanner.connect(filter);
        stereoPanner.connect(distortion);
        distortion.connect(filter);
        filter.connect(compressor);
        compressor.connect(context.destination);
    } else {
        console.log(document.querySelector("#reverbSelectList").value);
        loadImpulseResponse(document.querySelector("#reverbSelectList").value);
    }

    isReverbOn = !isReverbOn;
});

document.querySelector("#reverbSelectList").addEventListener("change", function (e) {
    var name = e.target.options[e.target.selectedIndex].value;
    loadImpulseResponse(name);
});

function loadImpulseResponse(name) {
    var request = new XMLHttpRequest();
    request.open("GET",  ("../sounds/impulseResponses/" + name + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (convolver) {
                filter.disconnect();
                convolver.disconnect(); 
            }
            convolver = context.createConvolver();
            convolver.buffer = buffer;
            convolver.normalize = true;

            source.connect(gain);
            gain.connect(delay);
            delay.connect(stereoPanner);
            stereoPanner.connect(filter);
            stereoPanner.connect(distortion);
            distortion.connect(filter);
            filter.connect(convolver);
            convolver.connect(compressor);
            compressor.connect(context.destination);
        });
    };
    request.send();
}

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


document.querySelector("#gainSlider").addEventListener("input", function (e) {
    var gainValue = (this.value / 10);
    document.querySelector("#gainOutput").innerHTML = gainValue + " dB";
    gain.gain.value = gainValue;
});

document.querySelector("#panningSlider").addEventListener("input", function (e) {
    var panValue = (this.value - 50) / 50;
    document.querySelector("#panningOutput").innerHTML = panValue + " LR";
    stereoPanner.pan.value = panValue;
});

document.querySelector("#delaySlider").addEventListener("input", function (e) {
    var delayValue = (this.value / 25);
    document.querySelector("#delayOutput").innerHTML = delayValue + " sec";
    delay.delayTime.value = delayValue;
});

var filterSliders = document.getElementsByClassName("filterSlider");
for (var i = 0; i < filterSliders.length; i++) {
    filterSliders[i].addEventListener('mousemove', changeFilterParameter, false);
}
var filterSelectList = document.querySelector("#filterSelectList");

filterSelectList.addEventListener("change", function (e) {
    filter.type = filterSelectList.options[filterSelectList.selectedIndex].value;
});

function changeFilterParameter() {
    switch (this.id) {
    case "frequencySlider":
        filter.frequency.value = (this.value);
        document.querySelector("#frequencyOutput").innerHTML = (this.value) + " Hz";
        break;
    case "detuneSlider":
        filter.detune.value = (this.value);
        document.querySelector("#detuneOutput").innerHTML = (this.value) + " cents";
        break;
    case "qSlider":
        filter.Q.value = (this.value);
        document.querySelector("#qOutput").innerHTML = (this.value) + " ";
        break;
    case "gainSlider":
        filter.gain.value = (this.value);
        document.querySelector("#gainOutput").innerHTML = (this.value) + " dB";
        break;
    }
}

var compressorSliders = document.getElementsByClassName("compressorSlider");
for (let i = 0; i < compressorSliders.length; i++) {
    compressorSliders[i].addEventListener("mousemove", changeCompressorParameter);
}

function changeCompressorParameter() {
    switch(this.id) {
        case "thresholdSlider":
            compressor.threshold.value = (this.value - 100);
            document.querySelector("#thresholdOutput").innerHTML = (this.value - 100) + " dB";
            break;
        case "ratioSlider":
            compressor.ratio.value = (this.value / 5);
            document.querySelector("#ratioOutput").innerHTML = (this.value / 5) + " dB";
            break;
        case "kneeSlider":
            compressor.knee.value = (this.value / 2.5);
            document.querySelector("#kneeOutput").innerHTML = (this.value / 2.5) + " degree";
            break;
        case "attackSlider":
            compressor.attack.value = (this.value / 1000);
            document.querySelector("#attackOutput").innerHTML = (this.value / 1000) + " sec";
            break;
        case "releaseSlider":
            compressor.release.value = (this.value / 1000);
            document.querySelector("#releaseOutput").innerHTML = (this.value / 1000) + " sec";
            break;
    }
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
