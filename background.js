chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'getActiveTabTitle') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const title = tabs[0]?.title || '';
      sendResponse({ title });
    });
    
    return true;
  }
});
