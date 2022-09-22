# Erstellt eine Website, die eine kurze Audiodatei abspielt. Über drei Slider kann man einstellen: GAIN (bis 10 dB), PANNING (stereo), DELAY (bis 4 sek.)

Eine Live-Demo der Aufgabe werdet ihr in der nächsten Session hier finden: https://jakobsudau.github.io/AVPRG/Aufgaben/Aufgabe4/index.html

Tipp: Nutzt das HTML Input Element von type=range, nutzt eine GainNode, StereoPannerNode und DelayNode. Ladet einen Sound wie in Aufgabe 5, den man über einen HTML Button Element abspielen kann.

Beispielcode: erstellt eine StereoPannerNode
```
var context = new AudioContext();
var oscillatorNode = context.createOscillator();
var stereoPanner = context.createStereoPanner();

stereoPanner.pan.value = -0.5;

oscillatorNode.connect(stereoPanner);
stereoPanner.connect(context.destination);

oscillatorNode.start(context.currentTime);
oscillatorNode.stop(context.currentTime +1);
```

Beispielcode: erstellt eine DelayNode
```
var context = new AudioContext();
var audio = new Audio("path/to/your/sound.wav");
var source = context.createMediaElementSource(audio);
var delay = context.createDelay(4.0);

delay.delayTime.value = 2.0;

source.connect(delay);
delay.connect(context.destination);

audio.play();
```

Beispielcode: erstellt eine GainNode
```
var context = new AudioContext();
var oscillatorNode = context.createOscillator();
var gainNode = context.createGain();

oscillatorNode.connect(gainNode);
gainNode.connect(context.destination);

gainNode.gain.value = 0.3;
            
oscillatorNode.start(context.currentTime);
oscillatorNode.stop(context.currentTime + 1);