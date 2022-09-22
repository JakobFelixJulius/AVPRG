# Erstellt eine Website, die eine kurze Audiodatei mit Reverb abspielt. Über ein Dropdown-Menü kann man zwischen 4 verschiedenen Reverb Einstellungen auswählen.

Eine Live-Demo der Aufgabe werdet ihr in der nächsten Session hier finden: https://jakobsudau.github.io/AVPRG/Aufgaben/Aufgabe5/index.html

Tipp: Nutzt die ConvolverNode, das HTML select Element für das DropDown-Menü und erstellt den Sound wie in Aufgabe 6. die Impuse Response File muss über einen XMLHttpRequest in einen Buffer geladen werden.

Beispielcode: erstellt eine ConvolverNode, lädt die Impulse Response File über einen XMLHttpRequest (wie bei der AudioBufferSourceNode)
```
let context = new AudioContext();
let sound = new Audio("path/to/your/sound.wav");
let source = context.createMediaElementSource(sound);
let convolver = context.createConvolver();

source.connect(convolver);
convolver.connect(context.destination);

fetch("impulseResponses/church.wav")
     .then(response => response.arrayBuffer())
     .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
     .then(audioBuffer => {
          convolver.buffer = buffer;
          convolver.normalize = true;
     })
     .catch(console.error);
     
sound.play();
```