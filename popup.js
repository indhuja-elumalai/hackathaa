// Font Size Options
const fontSizes = ["small", "medium", "large"];
let currentFontSizeIndex = 1;

// Handle Font Size Change
document.getElementById("fontSize").addEventListener("click", () => {
    currentFontSizeIndex = (currentFontSizeIndex + 1) % fontSizes.length;
    const newSize = fontSizes[currentFontSizeIndex];
    document.getElementById("fontSizeStatus").textContent = newSize.charAt(0).toUpperCase() + newSize.slice(1) + " >";

    // Send message to change font size in active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("Sending message to change font size: ", newSize);  // Debug
        chrome.tabs.sendMessage(tabs[0].id, { action: "changeFontSize", size: newSize });
    });
});

// Listen for contrast toggle
document.getElementById("toggleContrast").addEventListener("change", (event) => {
    const isEnabled = event.target.checked;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleContrast", enabled: isEnabled });
    });
});
