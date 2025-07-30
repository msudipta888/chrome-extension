const API_BASE = 'http://localhost:3000/get/user-linkdin';

document.getElementById('start').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'START_SEQUENCE' });
  document.getElementById('start').textContent = 'Running…';
});

document.getElementById('refresh').addEventListener('click', fetchAndRender);

async function fetchAndRender() {
  const container = document.getElementById('profiles');
  container.innerHTML = '<p>Loading...</p>';
  try {
   await new Promise(res=> setTimeout(res,4000))
    const res = await fetch(API_BASE,{
        method: "GET"
    });
    const json = await res.json();
    if (!json.success) throw new Error('API error');
    const profiles = json.data;

    if (profiles.length === 0) {
      container.innerHTML = '<p>No profiles yet. Click Start!</p>';
      return;
    }

    container.innerHTML = profiles.map(p => {
      const snip = (text, len) =>
        text && text.length > len ? text.slice(0, len) + '…' : (text || '');
      return `
        <div class="card">
          <a href="${p.url}" target="_blank">${p.name}</a>
          <div class="meta">${p.location}</div>
          <div class="snippet"><strong>About:</strong> ${snip(p.about, 100)}</div>
          <div class="snippet"><strong>Bio:</strong> ${snip(p.bio, 60)}</div>
          <div class="meta">🔗 Connections: ${p.connectionCount} 👥 Followers: ${p.followerCount}</div>
        </div>`;
    }).join('');
  } catch (err) {
    container.innerHTML = `<p style="color: red;">Error loading profiles</p>`;
    console.error(err);
  }
}

fetchAndRender();
