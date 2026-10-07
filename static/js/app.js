console.log("NEW APP.JS LOADED");
let recognition;
let isListening = false;
let fullTranscript = "";

const recordBtn = document.getElementById("recordBtn");
const recordingStatus = document.getElementById("recordingStatus");

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;


if (!SpeechRecognition) {

    recordingStatus.textContent =
        "❌ Speech recognition is not supported in this browser.";

    recordBtn.disabled = true;

} else {

    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";


    recognition.onstart = function () {

        isListening = true;
        fullTranscript = "";

        recordBtn.textContent = "⏹️ Stop Speaking";

        recordingStatus.textContent =
            "🔴 Listening... Speak now.";

        showTranscript("");
    };


    recognition.onresult = function (event) {

        let text = "";

        for (let i = 0; i < event.results.length; i++) {

            text += event.results[i][0].transcript + " ";
        }

        fullTranscript = text.trim();

        console.log("Recognized text:", fullTranscript);

        showTranscript(fullTranscript);
    };


    recognition.onerror = function (event) {

        console.error(
            "Speech recognition error:",
            event.error
        );

        recordingStatus.textContent =
            "❌ Speech recognition error: " + event.error;
    };

    recognition.onend = function () {

        console.log("Recognition ended.");
        console.log("Final transcript:", fullTranscript);

        if (isListening) {

            try {
                recognition.start();
            } catch (error) {
                console.log("Recognition restart:", error);
            }

        } else {

            recordBtn.textContent = "🎙️ Start Speaking";

            if (fullTranscript.trim() === "") {

                recordingStatus.textContent =
                    "⚠️ No voice note was detected.";

            } else {

                recordingStatus.textContent =
                    "⏳ Sending voice note to AI assistant...";

                sendTextToFlask();
            }
        }
    };


    recordBtn.addEventListener("click", function () {

        if (!isListening) {

            try {
                recognition.start();

            } catch (error) {

                console.error(error);
            }

        } else {

            isListening = false;

            recognition.stop();
        }
    });
}


function showTranscript(text) {

    let transcription =
        document.getElementById("transcription");


    if (!transcription) {

        transcription =
            document.createElement("div");

        transcription.id = "transcription";

        transcription.style.marginTop = "25px";
        transcription.style.padding = "20px";
        transcription.style.background = "#f8fafc";
        transcription.style.borderRadius = "12px";
        transcription.style.textAlign = "left";
        transcription.style.lineHeight = "1.6";
        transcription.style.fontSize = "17px";

        recordingStatus.parentNode.appendChild(
            transcription
        );
    }


    transcription.innerHTML = `
        <strong>📝 Your Voice Note</strong>
        <p>${text || "Start speaking..."}</p>
    `;
}


async function sendTextToFlask() {

    if (!fullTranscript) {

        recordingStatus.textContent =
            "⚠️ No voice note was detected.";

        return;
    }


    try {

        const response = await fetch("/analyze-text", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: fullTranscript
            })
        });


        const result = await response.json();
        if (response.ok) {
            console.log("Flask response:", result);

            recordingStatus.textContent =
                "✅ AI analyzed your voice note!";

            showAIResult(result.ai_result);
        } else {
            recordingStatus.textContent =
                "❌ " + result.message;
        }


    } catch (error) {

        console.error(
            "Connection error:",
            error
        );

        recordingStatus.textContent =
            "❌ Could not connect to Flask.";
    }
}
function showAIResult(aiResult) {

    let aiBox = document.getElementById("aiResult");

    if (!aiBox) {

        aiBox = document.createElement("div");

        aiBox.id = "aiResult";

        aiBox.style.marginTop = "25px";
        aiBox.style.padding = "20px";
        aiBox.style.background = "#eef2ff";
        aiBox.style.borderRadius = "12px";
        aiBox.style.textAlign = "left";
        aiBox.style.lineHeight = "1.7";
        aiBox.style.fontSize = "16px";

        recordingStatus.parentNode.appendChild(aiBox);
    }

    aiBox.innerHTML = `
        <h3>🤖 AI Task Analysis</h3>
        <p>${aiResult.replace(/\n/g, "<br>")}</p>
    `;
}