// =========================================================
// AI VOICE NOTE APP
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const recordBtn = document.getElementById("recordBtn");

const recordingStatus =
    document.getElementById("recordingStatus");


// =========================================================
// SPEECH RECOGNITION
// =========================================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


// Check browser support

if (!SpeechRecognition) {

    recordingStatus.textContent =
        "Speech recognition is not supported in this browser.";

    recordBtn.disabled = true;

} else {


    // Create recognition object

    const recognition =
        new SpeechRecognition();


    // Continuous speech

    recognition.continuous = true;


    // Show temporary speech results

    recognition.interimResults = true;


    // Indian English

    recognition.lang = "en-IN";


    // =====================================================
    // VARIABLES
    // =====================================================

    let finalTranscript = "";

    let isRecording = false;


    // =====================================================
    // START RECORDING
    // =====================================================

    recordBtn.addEventListener("click", () => {

        if (!isRecording) {

            finalTranscript = "";

            recognition.start();

            isRecording = true;

            recordBtn.textContent =
                "🛑 Stop Speaking";

            recordingStatus.textContent =
                "🎙️ Listening... Speak naturally.";

            recordBtn.classList.add("recording");

        } else {

            recognition.stop();

            isRecording = false;

            recordBtn.textContent =
                "🎙️ Start Speaking";

            recordingStatus.textContent =
                "⏳ Processing your voice note...";

            recordBtn.classList.remove("recording");
        }

    });


    // =====================================================
    // SPEECH RESULT
    // =====================================================

    recognition.onresult = (event) => {

        let interimTranscript = "";


        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const transcript =
                event.results[i][0].transcript;


            if (event.results[i].isFinal) {

                finalTranscript +=
                    transcript + " ";

            } else {

                interimTranscript +=
                    transcript;
            }
        }


        // Show live transcription

        recordingStatus.innerHTML = `
            <strong>🎙️ Listening...</strong>
            <br>
            ${escapeHTML(
            finalTranscript + interimTranscript
        )}
        `;
    };


    // =====================================================
    // SPEECH ENDED
    // =====================================================

    recognition.onend = () => {

        isRecording = false;

        recordBtn.textContent =
            "🎙️ Start Speaking";

        recordBtn.classList.remove("recording");


        const text =
            finalTranscript.trim();


        if (!text) {

            recordingStatus.textContent =
                "❌ No voice note was detected.";

            return;
        }


        // Show transcription

        recordingStatus.innerHTML = `
            <strong>📝 Your Voice Note</strong>
            <br><br>
            ${escapeHTML(text)}
        `;


        // Send text to Flask

        sendTextToFlask(text);

    };


    // =====================================================
    // SPEECH ERROR
    // =====================================================

    recognition.onerror = (event) => {

        console.error(
            "Speech recognition error:",
            event.error
        );


        isRecording = false;

        recordBtn.textContent =
            "🎙️ Start Speaking";

        recordBtn.classList.remove("recording");


        if (event.error === "not-allowed") {

            recordingStatus.textContent =
                "❌ Microphone permission was denied.";

        } else {

            recordingStatus.textContent =
                "❌ Speech recognition error. Please try again.";
        }

    };

}


// =========================================================
// SEND TEXT TO FLASK
// =========================================================

async function sendTextToFlask(text) {

    try {

        recordingStatus.innerHTML = `
            <strong>🤖 Analyzing your task...</strong>
            <br><br>
            ${escapeHTML(text)}
        `;


        const response =
            await fetch("/analyze-text", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })
            });


        const result =
            await response.json();


        console.log(
            "Server response:",
            result
        );


        // =================================================
        // SUCCESS
        // =================================================

        if (result.success) {

            recordingStatus.innerHTML = `
                <strong>✅ Task processed successfully!</strong>
                <br><br>
                ${escapeHTML(text)}
            `;


            // Display AI result

            showAIResult(
                result.ai_result
            );


            // Reload task history

            loadTasks();


        } else {

            recordingStatus.innerHTML = `
                <strong>❌ Task processing failed.</strong>
                <br><br>
                ${escapeHTML(
                result.message ||
                "Something went wrong."
            )}
            `;

        }

    } catch (error) {

        console.error(
            "Request error:",
            error
        );


        recordingStatus.innerHTML = `
            <strong>❌ Connection error.</strong>
            <br><br>
            Make sure Flask is running.
        `;
    }

}


// =========================================================
// SHOW AI RESULT
// =========================================================

function showAIResult(aiResult) {


    let aiBox =
        document.getElementById("aiResult");


    // Create result box if it doesn't exist

    if (!aiBox) {

        aiBox =
            document.createElement("div");

        aiBox.id = "aiResult";

        aiBox.className =
            "ai-result-box";


        recordingStatus.parentNode.appendChild(
            aiBox
        );
    }


    // Determine source

    const source =
        aiResult.source ||
        "AI";


    let sourceLabel;


    if (source === "Smart Fallback") {

        sourceLabel =
            "🛟 Smart Fallback";

    } else {

        sourceLabel =
            "✨ Gemini AI";
    }


    // =====================================================
    // DISPLAY RESULT
    // =====================================================

    aiBox.innerHTML = `

        <h3>
            🤖 AI Task Analysis
        </h3>

        <p class="ai-source">
            ${sourceLabel}
        </p>

        <div class="ai-result-content">

            <p>

                <strong>
                    📝 Task:
                </strong>

                ${escapeHTML(
        aiResult.task ||
        "Not specified"
    )}

            </p>


            <p>

                <strong>
                    📅 Deadline:
                </strong>

                ${escapeHTML(
        aiResult.deadline ||
        "Not specified"
    )}

            </p>


            <p>

                <strong>
                    🔥 Priority:
                </strong>

                ${escapeHTML(
        aiResult.priority ||
        "Medium"
    )}

            </p>


            <p>

                <strong>
                    📂 Category:
                </strong>

                ${escapeHTML(
        aiResult.category ||
        "General"
    )}

            </p>


            <p>

                <strong>
                    💡 Suggestion:
                </strong>

                ${escapeHTML(
        aiResult.suggestion ||
        "No suggestion"
    )}

            </p>

        </div>
    `;
}


// =========================================================
// LOAD SAVED TASKS
// =========================================================

async function loadTasks() {

    const taskHistory =
        document.getElementById(
            "taskHistory"
        );


    if (!taskHistory) {

        return;
    }


    try {

        const response =
            await fetch("/tasks");


        const tasks =
            await response.json();


        // No tasks

        if (!tasks.length) {

            taskHistory.innerHTML = `
                <div class="empty-state">
                    <p>
                        No tasks yet.
                        Start speaking to create one.
                    </p>
                </div>
            `;

            return;
        }


        // =================================================
        // CREATE TASK CARDS
        // =================================================

        taskHistory.innerHTML =
            tasks.map(task => `

                <div class="saved-task">

                    <h3>
                        ${escapeHTML(
                task.task ||
                "Untitled Task"
            )}
                    </h3>


                    <div class="task-details">

                        <span>
                            📅
                            ${escapeHTML(
                task.deadline ||
                "No deadline"
            )}
                        </span>


                        <span>
                            🔥
                            ${escapeHTML(
                task.priority ||
                "Medium"
            )}
                        </span>


                        <span>
                            📂
                            ${escapeHTML(
                task.category ||
                "General"
            )}
                        </span>

                    </div>


                    <p>

                        💡
                        ${escapeHTML(
                task.suggestion ||
                "No suggestion"
            )}

                    </p>


                    <small>

                        Created:
                        ${escapeHTML(
                task.created_at ||
                ""
            )}

                    </small>

                </div>

            `).join("");


    } catch (error) {

        console.error(
            "Could not load tasks:",
            error
        );


        taskHistory.innerHTML = `
            <p>
                Unable to load saved tasks.
            </p>
        `;
    }

}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");


    return div.innerHTML;
}


// =========================================================
// LOAD TASKS WHEN PAGE OPENS
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTasks();

    }
);