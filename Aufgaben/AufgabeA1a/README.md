# Erstellt eine Drum Machine mit 4 Feldern, durch einen Mausklick auf das jeweilige Feld wird ein Sound abgespielt.

Eine Live-Demo der Aufgabe werdet ihr hier finden: https://jakobsudau.github.io/AVPRG/Aufgaben/AufgabeA1a/index.html

Tipp: Nutzt das HTML Div Element für die Felder, nutzt AudioBufferSourceNodes oder MediaElementSourceNodes für die verschiedenen Sounds (Achtung: eine AudioBufferSourceNode kann nur einmal abgespielt werden!), sowie addEventListener() Funktionen


Beispielcode: erstellt ein HTML Sound Element sowie eine dazugehörige MediaElementSourceNode
```
let context = new AudioContext();
let sound = new Audio("path/to/your/sound.wav");
let soundNode = context.createMediaElementSource(sound);
soundNode.connect(context.destination);
sound.play();
```

Beispielcode: erstellt eine AudioBufferSourceNode
Achtung: fetch funktionieren nicht lokal, ihr müsst also entweder die Live-Server Extension in Visual Studio Code nutzen
```
let context = new AudioContext();
fetch("path/to/your/sound.wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            let sourceBufferNode = context.createBufferSource();
            sourceBufferNode.buffer = audioBuffer;
            sourceBufferNode.connect(context.destination);
            sourceBufferNode.start(context.currentTime);
        })
        .catch(console.error);
```