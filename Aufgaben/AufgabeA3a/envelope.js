document.getElementById("attackSlider").addEventListener("input", function(e){
    attack = this.value / 100;
    document.getElementById("attackOutput").innerHTML = attack;
});

document.getElementById("releaseSlider").addEventListener("input", function(e){
    release = this.value / 100;
    document.getElementById("releaseOutput").innerHTML = release;
});

function envelopeOn(gainNode, velocity){
    gainNode.gain.linearRampToValueAtTime(0.05 + (0.33 * (velocity/127)), context.currentTime + attack);
}

function envelopeOff(gainNode, velocity){
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + attack + release);
}
