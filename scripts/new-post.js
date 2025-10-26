document.getElementById("previewBtn").addEventListener("click", () => {
  const markdown = document.getElementById("markdown").value;
  document.getElementById("preview").innerHTML = marked.parse(markdown);
});

document.getElementById("publishBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("markdown").value.trim();

  if (!title || !content) {
    alert("Please enter both title and content.");
    return;
  }

  const fileName = title.toLowerCase().replace(/\s+/g, "-") + ".md";

  const token = prompt("Enter your GitHub Personal Access Token:");
  if (!token) return alert("GitHub token is required to publish.");

  const postContent = `# ${title}\n\n${content}\n\n*Posted on ${new Date().toLocaleDateString()}*`;

  const repoOwner = "divya-r-kamat";
  const repoName = "divya-dev-portfolio";

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/posts/${fileName}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Add new post: ${title}`,
      content: btoa(unescape(encodeURIComponent(postContent))),
    }),
  });

  if (res.ok) {
    alert("✅ Post published successfully!");
    window.location.href = "blog.html";
  } else {
    const data = await res.json();
    alert("❌ Error: " + (data.message || "Unable to publish post."));
  }
});
