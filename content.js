(async () => {
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));
  await wait(1000); 

  const name = document.querySelector("h1")?.innerText.trim();
  const bio = document
    .querySelector("div.text-body-medium.break-words")
    ?.innerText.trim();

  const about = document.querySelector(
    'div.inline-show-more-text--is-collapsed span[aria-hidden="true"]'
  )?.innerText.trim();

  const location = document.querySelector(
    "span.text-body-small.inline.t-black--light.break-words"
  )?.innerText.trim();

  const follower = parseInt(
    document.querySelector(
      "li.text-body-small.t-black--light.inline-block span.t-bold"
    )?.innerText.replace(/\D/g, "")
  );

  const connections = parseInt(
    document.querySelector(
      "li.text-body-small span.link-without-visited-state span.t-bold"
    )?.innerText.replace(/\D/g, "")
  );

  const payload = {
    name,
    url: window.location.href,
    about,
    bio,
    location,
    followerCount: follower ,
    connectionCount: connections ,
    bioLine: bio,
  };

  try {
    await fetch("http://localhost:3000/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
  } catch (err) {
    console.error("Failed to send data:", err);
  }

  chrome.runtime.sendMessage({ action: "OPEN_NEXT_PROFILE" });
})();
