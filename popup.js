// ====== For Blind Users ======
// Text-to-Speech (Read Aloud)
document.getElementById("readText").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                let text = document.body.innerText;
                let speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
            }
        });
    });
});

// Voice Commands (Control webpage with voice)
document.getElementById("voiceCommand").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                recognition.onresult = function(event) {
                    let command = event.results[0][0].transcript.toLowerCase();
                    if (command.includes("increase font")) {
                        document.body.style.fontSize = "larger";
                    } else if (command.includes("contrast")) {
                        document.body.classList.toggle("high-contrast");
                    } else {
                        alert("Command not recognized: " + command);
                    }
                };
                recognition.start();
            }
        });
    });
});

// Translate Page
document.getElementById("translateText").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let currentUrl = tabs[0].url;
        let translateUrl = "https://translate.google.com/translate?sl=auto&tl=en&u=" + encodeURIComponent(currentUrl);
        chrome.tabs.create({ url: translateUrl });
    });
});

// ====== For Deaf Users ======
// Auto-enable Subtitles (Experimental)
document.getElementById("generateCC").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                document.querySelectorAll('video').forEach(video => {
                    let track = video.addTextTrack('subtitles', 'English', 'en');
                    track.mode = 'showing';
                });
            }
        });
    });
});

// Transcribe Audio to Text (Basic Log Only)
document.getElementById("transcribeAudio").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                console.log("Basic transcription started. Full audio transcription is not supported in this version.");
            }
        });
    });
});

// ====== For Non-Verbal Users ======
// Voice Typing (Speech-to-Text on Input Fields)
document.getElementById("voiceTyping").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                recognition.onresult = function(event) {
                    if (document.activeElement && document.activeElement.tagName === "INPUT") {
                        document.activeElement.value += event.results[0][0].transcript;
                    }
                };
                recognition.start();
            }
        });
    });
});

// ====== For Others ======
// Increase Font Size
document.getElementById("increaseFont").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                document.body.style.fontSize = 'larger';
            }
        });
    });
});

// High Contrast Mode
document.getElementById("toggleContrast").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                document.body.classList.toggle('high-contrast');
            }
        });
    });
});

// Enable Keyboard Navigation (content.js logic loaded)
document.getElementById("enableNavigation").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});
