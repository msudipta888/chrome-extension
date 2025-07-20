// content.js
  const loadingIndicator = document.querySelector('.loading-indicator');
  
    document.getElementById('fetchBtn')?.addEventListener('click', () => {
   loadingIndicator.classList.add('active')     
  const titleEl = document.getElementById('title');
  chrome.runtime.sendMessage({ action: 'getActiveTabTitle' }, (response) => {
    if (response && response.title) {
        setTimeout(()=>{
      loadingIndicator.classList.remove('active')
      titleEl.textContent = response.title;
        },500)
    } else {
      titleEl.textContent = 'Unable to fetch title';
    }
  });
});


