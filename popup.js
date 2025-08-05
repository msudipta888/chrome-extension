const likeInput = document.getElementById('likeCount');
const commentInput = document.getElementById('commentCount');
const startBtn = document.getElementById('startBtn');

function validateInputs() {
  startBtn.disabled = !(likeInput.value && commentInput.value);
}

likeInput.addEventListener('input', validateInputs);
commentInput.addEventListener('input', validateInputs);

startBtn.addEventListener('click', () => {
  const likeCount = parseInt(likeInput.value);
  const commentCount = parseInt(commentInput.value);

  chrome.tabs.create({ url: "https://www.linkedin.com/feed/" }, (tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (likeCount, commentCount) => {
        window.localStorage.setItem("auto_like_count", likeCount);
        window.localStorage.setItem("auto_comment_count", commentCount);
      },
      args: [likeCount, commentCount]
    });
  });
});

