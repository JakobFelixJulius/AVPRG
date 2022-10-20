let convolverSelectList = document.querySelector("#convolverSelectList");

loadImpulseResponse("cave");

convolverSelectList.addEventListener("change", function(e){
    let name = convolverSelectList.options[convolverSelectList.selectedIndex].value;
    loadImpulseResponse(name);
});

function loadImpulseResponse(name){
    let request = new XMLHttpRequest();
    request.open("GET",  ("/impulseResponses/" + name + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        let undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (convolver) {convolver.disconnect(); }
            convolver = context.createConvolver();
            convolver.buffer = buffer;
            convolver.normalize = true;

            filter.connect(convolver);
            convolver.connect(context.destination);
        });
    };
    request.send();
}
