const blogList = document.getElementById("blog-list");

// Define your posts here manually (or auto-generate later)
const posts = [
  {
    title: "My Journey into Data Science",
    file: "machine-learning-journey.md",
    date: "2025-10-20",
    summary: "How I transitioned into Data Science and what I learned along the way."
  },
  {
    title: "Advanced Tab Manager",
    file: "tab-manager.md",
    date: "2025-10-10",
    summary: " Tab overload is a common problem for developers, researchers, and just about anyone who spends their day online."
  }
];

// Display posts
posts.forEach(post => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <h3>${post.title}</h3>
    <p class="summary">${post.summary}</p>
    <p class="date">${new Date(post.date).toDateString()}</p>
    <a href="view-post.html?file=${encodeURIComponent(post.file)}" class="btn-outline">Read More</a>
  `;
  blogList.appendChild(card);
});
