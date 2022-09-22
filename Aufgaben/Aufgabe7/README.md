# Setzt einen Equalizer um. Erstellt dafür eine Website, die eine Audio Datei abspielt. Implementiert einen BiquadFilter, bei dem man Frequency, Type, Detune, Quality und Gain über Slider (siehe Aufgabe 6) einstellen kann.

Eine Live-Demo der Aufgabe werdet ihr hier finden: https://jakobsudau.github.io/AVPRG/Aufgaben/Aufgabe7/index.html

Tipp: Nutzt die BiquadFilterNode, das HTML select Element für das DropDown-Menü (siehe Aufgabe 5), das HTML Input Element von type=range für die Slider (siehe Aufgabe 4) und erstellt den Sound wie in Aufgabe 4.

Beispielcode: erstellt eine BiquadFilterNode
```
let context = new AudioContext();
let sound  = new Audio("path/to/your/sound.wav");
let source = context.createMediaElementSource(sound);
let filter = context.createBiquadFilter();
source.connect(filter);
filter.connect(context.destination);

filter.type = "lowpass";
filter.frequency.value = 500;
filter.detune.value = 30;
filter.Q.value = 1;
filter.gain.value = 25;

sound.play();
```