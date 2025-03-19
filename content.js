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
      document.querySelectorAll("*").forEach((el) => {
        el.style.fontSize = fontSizeMap[request.size];
    });
    
        console.log("Font size changed to: ", fontSizeMap[request.size]);  // Debug
    }
  
    if (request.action === "toggleContrast") {
        if (request.enabled) {
            document.documentElement.style.filter = "contrast(1.5)";
            document.documentElement.style.backgroundColor = "#000";
            document.documentElement.style.color = "#fff";
            
            // Ensure all elements inherit the high contrast mode
            document.querySelectorAll("*").forEach((el) => {
                el.style.backgroundColor = "black";
                el.style.color = "white";
            });
        } else {
            document.documentElement.style.filter = "none";
            document.documentElement.style.backgroundColor = "";
            document.documentElement.style.color = "";
            
            // Reset all elements to default styles
            document.querySelectorAll("*").forEach((el) => {
                el.style.backgroundColor = "";
                el.style.color = "";
            });
        }
    }      
   
    if (request.action === "readAloud") {
      readPageAloud();
    }
  });
  
  
  // Read Page Aloud Function
  function readPageAloud() {
    const content = document.body.innerText;
    if (content) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 1; // Normal speech rate
      speechSynthesis.speak(utterance);
      console.log("Reading page aloud...");
    }
  }