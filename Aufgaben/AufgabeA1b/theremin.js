var context = new AudioContext(),
    oscillator,
    mousedown = false,
    gainNode = context.createGain();

gainNode.connect(context.destination);

document.addEventListener("mousedown", function(e) {
    mousedown = true;

    oscillator = context.createOscillator();
    oscillator.connect(gainNode);

    calculateFrequencyAndGain(e);

    oscillator.start(context.currentTime);
});

document.body.addEventListener("mousemove", function(e) {
    if (mousedown) {
        calculateFrequencyAndGain(e);
    }
});

document.addEventListener("mouseup", function(e) {
    mousedown = false;

    if (oscillator) {
        oscillator.stop(context.currentTime);
        oscillator.disconnect();
    }
});

function calculateFrequencyAndGain(e) {
    var maxFrequency = 2000,
        minFrequency = 20,
        maxGain = 1,
        minGain = 0;

    // oscillator.frequency.value =
    //    ((e.clientX / window.innerWidth) * maxFrequency) + minFrequency;
    // gainNode.gain.value =
    //    1 - ((e.clientY / window.innerHeight) * maxGain) + minGain;

    // fix for click sound bug:
    oscillator.frequency.setTargetAtTime(
        ((e.clientX / window.innerWidth) * maxFrequency)
        + minFrequency, context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(
        1 - ((e.clientY / window.innerHeight) * maxGain)
        + minGain, context.currentTime, 0.01);
}

// for error handling when mouse leaves viewport
document.addEventListener("mouseleave", function (event) {

    if (event.clientY <= 0 || event.clientX <= 0
        || (event.clientX >= window.innerWidth
        || event.clientY >= window.innerHeight)) {
        mousedown = false;
        if (oscillator) {
            oscillator.stop(context.currentTime);
            oscillator.disconnect();
        }
    }
});