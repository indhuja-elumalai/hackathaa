// Font Size Mapping
const fontSizeMap = {
    small: "16px",
    medium: "18px",
    large: "24px"
};

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received: ", request.action, request.size);  // Debug
    if (request.action === "changeFontSize") {
        document.body.style.fontSize = fontSizeMap[request.size];
        console.log("Font size changed to: ", fontSizeMap[request.size]);  // Debug
    }

    if (request.action === "toggleContrast") {
        if (request.enabled) {
            document.body.style.filter = "contrast(1.5)";
            document.body.style.backgroundColor = "#000";
            document.body.style.color = "#fff";
        } else {
            document.body.style.filter = "none";
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
        }
    }
});
