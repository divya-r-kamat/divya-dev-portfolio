document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("blog-container");

  try {
    const res = await fetch("posts/");
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const files = Array.from(doc.querySelectorAll("a"))
      .filter(a => a.href.endsWith(".md"))
      .map(a => a.textContent);

    if (files.length === 0) {
      container.innerHTML = "<p>No blog posts yet.</p>";
      return;
    }

    container.innerHTML = files
      .map(file => `
        <div class="blog-card">
          <h3><a href="view-post.html?file=${file}">${file.replace(".md", "")}</a></h3>
          <p>Click to read this post.</p>
        </div>
      `)
      .join("");
  } catch (err) {
    container.innerHTML = "<p>Unable to load posts.</p>";
  }
});
