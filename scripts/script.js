// Fetch projects dynamically from your GitHub profile
const projectList = document.getElementById("project-list");

fetch("https://api.github.com/users/divya-r-kamat/repos?sort=updated")
  .then((res) => res.json())
  .then((repos) => {
    repos
      .filter((r) => !r.fork && r.description) // Only main repos with descriptions
      .slice(0, 6) // Show top 6
      .forEach((repo) => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
        `;
        projectList.appendChild(card);
      });
  })
  .catch(() => {
    projectList.innerHTML =
      "<p>Unable to load projects right now. Check back later!</p>";
  });
