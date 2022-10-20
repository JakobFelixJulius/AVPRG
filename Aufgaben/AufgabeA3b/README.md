# Arbeitet an dem Synthesizer weiter. Implementiert einen zweiten Oscillator, der gleichzeitig mit dem ersten spielt und setzt eine einfache AR-Hüllkurve über zwei Slider (Attack, Release) um sowie einen LFO (Tremolo) über einen Oscillator mit Gain. Erweitert den Synthesizer zusätzlich um einen Reverb Hall (Convoler), Distortion (Waveshaper), und einen Filter (BiquadFilter) mit den entsprechenden UI (siehe vorherige Aufgaben).

Eine Live-Demo der Aufgabe werdet ihr hier finden: https://jakobsudau.github.io/AVPRG/Aufgaben/AufgabeA3/index.html

Tipp: Nutzt für die AR-Hüllkurve die Funktion exponentialRampToValueAtTime/linearRampToValueAtTime. Nutzt für den LFO die OscillatorNode sowie eine GainNode, welche zu dem Gain Parameter der Velocity GainNodes connected wird. 

Tipp: Versucht mit Schleifen, Funktionen, zweidimensionalen Arrays, etc. zu arbeiten, um Code-Redundanz zu vermeiden.

Tipp: Guckt in die Aufgaben 4, bis 13 - ihr könnt das aller meiste an Code (Javascript sowie HTML DOM Elemente) kopieren und müsst die Nodes (ConvolverNode, WaveshaperNode, BiquadFilterNode) nur in euren Audio Graphen einbinden, ähnlich wie in der Hausaufgabe A2.

Beispielcode für einen LFO:

```
var lfo = context.createOscillator();
var lfoGain = context.createGain();

lfoGain.gain.value = 0.05;
lfo.frequency.value = 6;

lfo.start();
lfo.connect(lfoGain);

lfoGain.connect(targetGainNode.gain);

// nun wird die Lautstärke der Target GainNode beeinflusst
```