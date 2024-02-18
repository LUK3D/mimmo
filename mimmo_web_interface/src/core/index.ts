import Artyom from 'artyom.js/source/artyom';

enum MimmoCommands{
    MIMMO,
    START,
    STOP,
    MESSAGE,
};


function analyzeVolumeLevel() {

    let isSpeaking = false;
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            var audioContext = new AudioContext();
            var analyser = audioContext.createAnalyser();
            var source = audioContext.createMediaStreamSource(stream);

            source.connect(analyser);

            // Define threshold for detecting silence
            var silenceThreshold = 25.0;
            // Define duration threshold in milliseconds
            var silenceDurationThreshold = 200;

            var timer:any;

            analyser.fftSize = 256;
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);


            function checkVolume() {
                analyser.getByteFrequencyData(dataArray);
                var average = getAverageVolume(dataArray);
                if (average < silenceThreshold) {
                    // Start a timer to check for silence duration
                    // clearTimeout(timer);
                    timer = setTimeout(function () {
                        // Trigger event for silence detected
                        
                        if(isSpeaking ){
                            console.log("User stopped speaking: ", average);
                            //@ts-ignore
                            window.chrome.webview.postMessage({"command": MimmoCommands.STOP});
                        }
                           

                            // if(!isSpeaking){
                            //     console.log("AVG: ", lastAvg1, "|", lastAvg2);

                            // }
                       
                        isSpeaking = false;
                        clearTimeout(timer);
                        
                    }, silenceDurationThreshold);
                } else {

                    

                    clearTimeout(timer);
                    if(!isSpeaking){
                        //@ts-ignore;
                        window.chrome.webview.postMessage({"command": MimmoCommands.START});
                    }
                    isSpeaking = true;
                    // console.log("AVARAGE:", average)
                    console.warn("User is Speaking", average);
                    // Cancel the timer if sound is detected
                    
                }
           
            }

            function getAverageVolume(array:Uint8Array) {
                var values = 0;
                var average;

                var length = array.length;

                for (var i = 0; i < length; i++) {
                    values += array[i];
                }

                average = values / length;
                return average;
            }

            // Check volume level continuously
            setInterval(checkVolume, 300); // Adjust interval as needed
        })
        .catch(function(err) {
            console.error('Error accessing microphone:', err);
        });
}


export const mimmoStart = ()=>{
    const Mimmo = new Artyom();

    // Mimmo.say("Hello World !");

    // Add command (Short code artisan way)
    Mimmo.on([
        "ok",
        "OK",
    ]).then((i:any) => {
      console.warn(i);
    });
    Mimmo.on([
        "ei mimo",
        "ei, mimo",
        "hey mimo",
        "Ei, mínimo",
        "Ei, mínimo.",
        "ei me",
        "Ei me",
        "ei meu irmão",
        "Ei meu irmão",
        "Ei meu irmão.",
    ]).then((i:any) => {
        //@ts-ignore
        window.chrome.webview.postMessage({"command":MimmoCommands.MIMMO});
    //   alert("MIMMO COMMAND!");
    });

    Mimmo.redirectRecognizedTextOutput((text:any)=>{
        //@ts-ignore
        window.chrome.webview.postMessage({"command":MimmoCommands.MESSAGE, "message": text});
    })


     Mimmo.initialize({
        lang: "pt-BR", // GreatBritain english
        continuous: true, // Listen forever
        soundex: true,// Use the soundex algorithm to increase accuracy
        debug: true, // Show messages in the console
        executionKeyword: "and do it now",
        listen: true, // Start to listen commands !

        // If providen, you can only trigger a command if you say its name
        // e.g to trigger Good Morning, you need to say "Jarvis Good Morning"
        // name: "ei mimo" 

    }).then(() => {
        console.log("Artyom has been succesfully initialized");
        analyzeVolumeLevel();
    }).catch((err) => {
        console.error("Artyom couldn't be initialized: ", err);
    });

}