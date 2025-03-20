// Font Size Options
const fontSizes = ["small", "medium", "large"];
let currentFontSizeIndex = 1;

// Handle Font Size Change
document.getElementById("fontSize").addEventListener("click", () => {
  currentFontSizeIndex = (currentFontSizeIndex + 1) % fontSizes.length;
  const newSize = fontSizes[currentFontSizeIndex];
  document.getElementById("fontSizeStatus").textContent =
    newSize.charAt(0).toUpperCase() + newSize.slice(1) + " >";

  // Send message to change font size in active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "changeFontSize",
      size: newSize,
    });
  });
});

// Listen for Contrast Toggle
document.getElementById("toggleContrast").addEventListener("change", (event) => {
  const isEnabled = event.target.checked;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "toggleContrast",
      enabled: isEnabled,
    });
  });
});

// Listen for Read Aloud (One-time)
document.getElementById("readAloud").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "readAloud" });
  });
});

// Track Read Aloud Status
let isReadAloudEnabled = false;
document.getElementById("toggleReadAloud").addEventListener("change", (event) => {
  isReadAloudEnabled = event.target.checked;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "toggleReadAloud",
      enabled: isReadAloudEnabled,
    });
  });
});

// Listen for Dyslexia Font Toggle
document.getElementById("toggleDyslexiaFont").addEventListener("change", (event) => {
  const isEnabled = event.target.checked;
  chrome.storage.sync.set({ dyslexiaFontEnabled: isEnabled });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "toggleDyslexiaFont",
      enabled: isEnabled,
    });
  });
});

// Restore Dyslexia Font State on Load
chrome.storage.sync.get("dyslexiaFontEnabled", (data) => {
  document.getElementById("toggleDyslexiaFont").checked =
    data.dyslexiaFontEnabled || false;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "restoreDyslexiaFont",
      enabled: data.dyslexiaFontEnabled || false,
    });
  });
});

// Listen for Translate (Speech-to-Text)
document.getElementById("translatePage").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleSpeechToText" });
  });
});
