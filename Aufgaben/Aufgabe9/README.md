# Erstellt eine Website, die die Lautstärke des Mikrofon-Inputs live anzeigt. Nutzt hierfür die AnalyserNode sowie die MediaStreamAudioSourceNode.

Eine Live-Demo der Aufgabe werdet ihr hier finden: https://jakobsudau.github.io/AVPRG/Aufgaben/Aufgabe11/index.html

Tipp: Nutzt die MediaStreamAudioSourceNode, die AnalyserNode und die JavaScript Funktion window.setInterval(function, timeInterval)
Die Funktion zur Berechnung des Mittelwerts eines Arrays findet ihr in dem Beispielcode in dieser README.

Beispielcode: erstellt eine MediaStreamAudioSourceNode, Abfrage über navigator.mediaDevices
```
navigator.mediaDevices.getUserMedia({ audio: true, video: false})
.then(function(stream) {
    var context = new AudioContext();
    var liveInput = context.createMediaStreamSource(stream);
    liveInput.connect(context.destination);
});
```

Beispielcode: Benutzung der window.setInterval(function, timeInterval) Funktion
```
window.setInterval(function() {
    console.log("ich schreibe alle 1000 ms = jede Sekunde yeah!")
}, 1000);
```

Beispielcode: erstellt eine AnalyserNode, am Ende haben wir ein Array mit Frequenzdaten
```
var context = new AudioContext();
var oscillator = context.createOscillator();
var analyser = context.createAnalyser();

analyser.fftSize = 2048;
oscillator.connect(analyser);
analyser.connect(context.destination);

oscillator.start();

setInterval(function(){
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    console.log(array);
    // jetzt haben wir ein array mit den Frequenzdaten
}, 75);


// jetzt haben wir ein array mit den Frequenzdaten
```

Beispielcode: Funktion zur Berechnung des Mittelwerts eines Arrays (Parameter: ein Array, Return: ein Double)
```
function getAverageVolume(array) {
    var values = 0;
    
    for (var i = 0; i < array.length; i++)
        values += array[i];
    
    return values / array.length;
}
```