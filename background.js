// Background script to relay messages between popup and content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeFontSize" || message.action === "toggleContrast") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["content.js"]
            });
        });
    }
});
