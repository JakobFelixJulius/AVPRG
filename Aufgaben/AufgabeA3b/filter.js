var sliders = document.getElementsByClassName("slider");
var filterSelectList = document.querySelector("#filterSelectList");
for (var i = 0; i < sliders.length; i++)
    sliders[i].addEventListener('mousemove', changeParameter, false);

filterSelectList.addEventListener("change", function(e){
    filter.type = filterSelectList.options[filterSelectList.selectedIndex].value;
});

function changeParameter() {
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
