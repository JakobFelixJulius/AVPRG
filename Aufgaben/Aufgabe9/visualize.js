navigator.mediaDevices.getUserMedia({ audio: true, video: false})
    .then(function(stream) {
        let context = new AudioContext();
        let liveInput = context.createMediaStreamSource(stream);
        let analyser = context.createAnalyser();

        analyser.fftSize = 2048;

        liveInput.connect(analyser);

        let array = new Uint8Array(analyser.frequencyBinCount);

        setInterval(function(){
            analyser.getByteFrequencyData(array);
            let volume = getAverageVolume(array);
            document.querySelector("#outputLabel").innerHTML = volume + " dB";
        }, 75);
});

function getAverageVolume(array) {
    var values = 0;

    for (var i = 0; i < array.length; i++)
        values += array[i];

    return values / array.length;
}