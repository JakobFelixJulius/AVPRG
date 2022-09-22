# Setzt einen Distortion Effekt mit Hilfe eines Waveshapers um. Erstellt dafür eine Website, die eine Audio Datei abspielt. Über einen Slider kann man die Intensität der Distortion einstellen.

Eine Live-Demo der Aufgabe werdet ihr hier finden: https://jakobsudau.github.io/AVPRG/Aufgaben/Aufgabe8/index.html

Tipp: Nutzt die WaveShaperNode, das HTML Input Element von type=range für die Slider (siehe Aufgabe 6) und erstellt den Sound wie in Aufgabe 6. Die Funktion zur Berechnung einer Sigmoid Kurve findet ihr in dem Beispielcode in dieser README.

Beispielcode: erstellt eine WaveShaperNode
```
let context = new AudioContext();
let sound = new Audio("path/to/your/sound.wav");
let source = context.createMediaElementSource(sound);
let distortion = context.createWaveShaper();

source.connect(distortion);
distortion.connect(context.destination);

distortion.curve = makeDistortionCurve(200);
distortion.oversample = "4x";

sound.play();
```

Beispielcode: Funktion zur Berechnung einer Sigmoid Kurve (Parameter: Integer mit der Stärke der Sigmoid-Funktion, Return: ein Array mit allen Werten der Sigmoid-Funktion von -1 bis 1, das return value ist ein Array mit n_samples Anzahl von Werten)
```
function makeDistortionCurve(amount) {    
    let n_samples = 44100,
        curve = new Float32Array(n_samples);
    
    for (var i = 0; i < n_samples; ++i ) {
        var x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + (amount * Math.abs(x)));
    }
    
    return curve;
};
```