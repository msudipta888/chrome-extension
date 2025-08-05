function waitForElements(selector, timeout = 10000) {
  return new Promise((resolve) => {
    const interval = 200;
    let waited = 0;
    const check = () => {
      const elements = document.querySelectorAll(selector);
      if (elements.length || waited >= timeout) {
        resolve(Array.from(elements));
      } else {
        waited += interval;
        setTimeout(check, interval);
      }
    };
    check();
  });
}

(async () => {
  const likeCount = parseInt(localStorage.getItem("auto_like_count")) || 0;
  const commentCount = parseInt(localStorage.getItem("auto_comment_count")) || 0;

  if (likeCount === 0 && commentCount === 0) return;

  await new Promise(resolve => setTimeout(resolve, 5000)); 

  const posts = Array.from(document.querySelectorAll('div.feed-shared-update-v2')).slice(0, 20);
  const shuffled = posts.sort(() => 0.5 - Math.random());
    
  const likePosts = shuffled.slice(0, likeCount);
  const commentPosts = shuffled.slice(0, commentCount);

  // LIKES
  for (let post of likePosts) {
   
    const reactBtn = post.querySelector('button[aria-label*="Like"]');
    if (reactBtn && !reactBtn.classList.contains("reacted")) {
      reactBtn.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // COMMENTS
  for (let post of commentPosts) {
   
    const commentBtn = post.querySelector('button[aria-label*="Comment"]');
    if (!commentBtn) continue;
    
    commentBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    commentBtn.click();
    await new Promise(r => setTimeout(r, 2000));

    const commentForm = post.querySelector('.comments-comment-box') || 
                       post.querySelector('[data-control-name="comment_box"]') ||
                       post.querySelector('.comments-comment-texteditor');

    if (!commentForm) {
      continue;
    }

    let commentBox = commentForm.querySelector('div[role="textbox"]') || 
                     commentForm.querySelector('div[contenteditable="true"]') || 
                     commentForm.querySelector('textarea');
    
    if (!commentBox) {
      continue;
    }

    commentBox.focus();
    commentBox.innerText = "CFBR";
    commentBox.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(r => setTimeout(r, 1500));
    
    let submitBtn = null;
    const formButtons = commentForm.querySelectorAll('button');
    
    for (const btn of formButtons) {
      const btnText = btn.textContent.trim();
      const ariaLabel = btn.getAttribute('aria-label') || '';
      console.log(`"${btnText}" | disabled=${btn.disabled} | aria-label="${ariaLabel}"`);
      if (!btn.disabled && (
        btnText === "Post" || 
        btnText === "Comment" ||
        ariaLabel.includes("Post comment") ||
        ariaLabel.includes("Submit comment") ||
        btn.type === "submit"
      )) {
        submitBtn = btn;
        break;
      }
    }

    if (submitBtn) {
      submitBtn.click();
      console.log("✅ Clicked submit button");
      await new Promise(r => setTimeout(r, 1500));
    } else {
      commentBox.focus();
      commentBox.dispatchEvent(new KeyboardEvent('keydown', { 
        key: 'Enter', 
        ctrlKey: true,
        bubbles: true 
      }));
      await new Promise(r => setTimeout(r, 1500));
    }
  }
  
  localStorage.removeItem("auto_like_count");
  localStorage.removeItem("auto_comment_count");
})();
