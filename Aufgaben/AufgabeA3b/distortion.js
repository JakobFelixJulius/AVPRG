distortion.curve = makeDistortionCurve(6);
distortion.oversample = "4x";


document.querySelector("#distortionSlider").addEventListener("input", function(e){
    distortion.curve = makeDistortionCurve(this.value*5);
    document.querySelector("#distortionOutput").innerHTML = this.value*5;
});

function makeDistortionCurve(amount) {
    let n_samples = 44100,
        curve = new Float32Array(n_samples);

    let test = [];

    for (i = 0; i < n_samples; i++ ) {
        let x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + (amount * Math.abs(x)));
    }

    return curve;
};
