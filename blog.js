const username = "divya-r-kamat";
const repo = "divya-dev-portfolio";

async function loadBlogs() {
  const container = document.getElementById("blog-container");
  container.innerHTML = "<p>Loading posts...</p>";

  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/posts`);
    const files = await res.json();

    const mdFiles = files.filter(f => f.name.endsWith(".md"));

    if (mdFiles.length === 0) {
      container.innerHTML = "<p>No blog posts found yet.</p>";
      return;
    }

    container.innerHTML = ""; // clear loading text

    for (const file of mdFiles.reverse()) { // newest on top
      const fileRes = await fetch(file.download_url);
      const text = await fileRes.text();

      const titleMatch = text.match(/^# (.+)/);
      const title = titleMatch ? titleMatch[1] : file.name.replace(".md", "");
      const preview = text.split("\n").slice(1, 4).join(" "); // first few lines

      const card = document.createElement("div");
      card.classList.add("blog-card");
      card.innerHTML = `
        <h3>${title}</h3>
        <p>${preview}...</p>
        <a class="button" href="view-post.html?file=${encodeURIComponent(file.name)}">Read more</a>
      `;
      container.appendChild(card);
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>⚠️ Failed to load blog posts. Check console for details.</p>";
  }
}

loadBlogs();
