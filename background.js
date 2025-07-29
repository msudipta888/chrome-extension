const LINKEDIN_URLS = [
  "https://www.linkedin.com/in/sudipta-mondal-009625255/",
  "https://www.linkedin.com/in/sahil-ansari-718186235/",
  "https://www.linkedin.com/in/ravi-kumar-a2a0a81ab/"
];
let visitedUrls = new Set();
let currentIndex = 0;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "START_SEQUENCE") {
    currentIndex = 0;
    openNextProfile();
  }

  if (msg.action === "OPEN_NEXT_PROFILE") {
    openNextProfile(); 
  }
});



function openNextProfile() {
  while (currentIndex < LINKEDIN_URLS.length) {
    const url = LINKEDIN_URLS[currentIndex];
    currentIndex++;

    if (!visitedUrls.has(url)) {
      visitedUrls.add(url);

      chrome.tabs.create({ url }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === "complete") {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["content.js"]
            });
          }
        });
      });

      break; 
    }
  }
}


 
