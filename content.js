// Font Size Mapping
const fontSizeMap = {
  small: "16px",
  medium: "18px",
  large: "24px",
};

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request.action);

  switch (request.action) {
    // Change Font Size
    case "changeFontSize":
      document.querySelectorAll("*").forEach((el) => {
        el.style.fontSize = fontSizeMap[request.size] || "18px";
      });
      console.log("Font size changed to:", fontSizeMap[request.size]);
      break;

    // Toggle High Contrast Mode
    case "toggleContrast":
      toggleContrastMode(request.enabled);
      break;

    // Toggle Dyslexia-Friendly Font
    case "toggleDyslexiaFont":
      toggleDyslexiaFont(request.enabled);
      break;

    // Restore Dyslexia Font on Page Load
    case "restoreDyslexiaFont":
      if (request.enabled) {
        document.body.style.fontFamily = "'OpenDyslexic', Arial, sans-serif";
        console.log("Dyslexia-friendly font restored on page load.");
      }
      break;

    // Read Page Aloud (One-time)
    case "readAloud":
      readPageAloud();
      break;

    // Toggle Continuous Read Aloud
    case "toggleReadAloud":
      request.enabled ? startReading() : stopReading();
      break;

    // Toggle Speech-to-Text with Translation
    case "toggleSpeechToText":
      startSpeechToText();
      break;
  }
});


// =Helper Functions


// Toggle High Contrast Mode
function toggleContrastMode(enabled) {
  if (enabled) {
    document.documentElement.style.filter = "contrast(1.5)";
    document.documentElement.style.backgroundColor = "#000";
    document.documentElement.style.color = "#fff";
    document.querySelectorAll("*").forEach((el) => {
      el.style.backgroundColor = "black";
      el.style.color = "white";
    });
  } else {
    document.documentElement.style.filter = "none";
    document.documentElement.style.backgroundColor = "";
    document.documentElement.style.color = "";
    document.querySelectorAll("*").forEach((el) => {
      el.style.backgroundColor = "";
      el.style.color = "";
    });
  }
}

// Toggle Dyslexia Font
function toggleDyslexiaFont(enabled) {
  if (enabled) {
    document.body.style.fontFamily = "'OpenDyslexic', Arial, sans-serif";
    document.body.style.letterSpacing = "0.12em";
    document.body.style.lineHeight = "1.6";
    document.body.style.backgroundColor = "#FFFFE0"; 
    document.body.style.fontSize = "18px"; 
    console.log("Dyslexia-friendly font applied.");
  } else {
    document.body.style.fontFamily = "";
    document.body.style.letterSpacing = "";
    document.body.style.lineHeight = "";
    document.body.style.backgroundColor = "";
    document.body.style.fontSize = "";
    console.log("Font reset to default.");
  }
}


// = Read Aloud Functions 
let isReading = false;
let utterance;

// Read Page Aloud (Once)
function readPageAloud() {
  const content = document.body.innerText;
  if (content) {
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 1; // Normal speed
    speechSynthesis.speak(utterance);
    console.log("Reading page aloud...");
  }
}

// Start Continuous Reading
function startReading() {
  if (!isReading) {
    const content = document.body.innerText;
    if (content) {
      utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
      isReading = true;
      console.log("Continuous reading started...");
    }
  }
}

// Stop Continuous Reading
function stopReading() {
  if (isReading) {
    speechSynthesis.cancel();
    isReading = false;
    console.log("Continuous reading stopped.");
  }
}

// =Speech-to-Text and Translation
function startSpeechToText() {
  console.log("Speech-to-text translation initiated...");
  // Placeholder logic for speech-to-text
  alert("Sign-language-Recognisation feature is coming soon!");
}
