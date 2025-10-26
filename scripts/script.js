<script>
  const projectList = document.getElementById("project-list");

  // Keywords that indicate a real project (not config/test repos)
  const projectKeywords = [
    'machine-learning', 'ml', 'ai', 'data', 'analysis', 'prediction', 
    'model', 'neural', 'detection', 'classification', 'forecasting',
    'nlp', 'deep-learning', 'python', 'analytics', 'visualization'
  ];

  // Repos to exclude (config repos, forks, etc.)
  const excludeRepos = ['divya-r-kamat', 'divya-dev-portfolio'];

  fetch("https://api.github.com/users/divya-r-kamat/repos?sort=updated&per_page=100")
    .then((res) => res.json())
    .then((repos) => {
      // Filter for actual projects
      const projects = repos.filter((repo) => {
        if (repo.fork || !repo.description) return false;

        if (excludeRepos.some(name => repo.name.toLowerCase().includes(name.toLowerCase()))) {
          return false;
        }

        const repoText = (repo.name + ' ' + repo.description).toLowerCase();
        const hasKeyword = projectKeywords.some(keyword => repoText.includes(keyword));

        return hasKeyword || (repo.topics && repo.topics.length > 0) || repo.stargazers_count > 0;
      });

      // If we found projects, display them
      if (projects.length > 0) {
        projectList.innerHTML = "";

        projects.slice(0, 6).forEach((repo, index) => {
          const card = document.createElement("div");
          card.className = "project-card";
          card.style.animationDelay = `${index * 0.1}s`;

          const langColor = getLanguageColor(repo.language);

          card.innerHTML = `
            <div class="project-header">
              <h3>${formatRepoName(repo.name)}</h3>
              <span class="language" style="color:${langColor}">${repo.language || ''}</span>
            </div>
            <p>${repo.description}</p>
            ${repo.topics && repo.topics.length > 0 ? `
              <div class="topics">
                ${repo.topics.slice(0, 3).map(topic => `<span class="topic">${topic}</span>`).join('')}
              </div>
            ` : ''}
            <div class="stats">
              ⭐ ${repo.stargazers_count} &nbsp; 🔀 ${repo.forks_count}
            </div>
            ${repo.html_url}View on GitHub →</a>
          `;
          projectList.appendChild(card);
        });
      } else {
        // Fallback: show featured projects manually
        showFeaturedProjects();
      }
    })
    .catch((error) => {
      console.error("Error loading projects:", error);
      showFeaturedProjects();
    });

  // Helper function to format repo names
  function formatRepoName(name) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Helper function for language colors
  function getLanguageColor(language) {
    const colors = {
      'Python': '#3572A5',
      'JavaScript': '#f1e05a',
      'Java': '#b07219',
      'R': '#198CE7',
      'Jupyter Notebook': '#DA5B0B',
      'HTML': '#e34c26',
      'CSS': '#563d7c'
    };
    return colors[language] || '#8b8b8b';
  }

  // Fallback featured projects (Top 4 pinned from GitHub)
  function showFeaturedProjects() {
    projectList.innerHTML = `
      <div class="project-card">
        <h3>NLP With PyTorch</h3>
        <span class="language" style="color:#DA5B0B">Jupyter Notebook</span>
        <p>Experiments in Natural Language Processing using PyTorch to solve common NLP problems with advanced and state-of-the-art deep learning techniques.</p>
        <div class="topics">
          <span class="topic">nlp</span>
          <span class="topic">deep-learning</span>
          <span class="topic">pytorch</span>
        </div>
        <a href="https://github.com/divya-r-kamat" target="_blank">View on GitHub →</a>
      </div>

      <div class="project-card">
        <h3>Seq2Py</h3>
        <span class="language" style="color:#DA5B0B">Jupyter Notebook</span>
        <p>A transformer-based model designed to translate English text into Python code, maintaining proper whitespace and indentation.</p>
        <div class="topics">
          <span class="topic">transformers</span>
          <span class="topic">nlp</span>
          <span class="topic">code-generation</span>
        </div>
        <a href="https://github.com/divya-r-kamat" target="_blank">View on GitHub →</a>
      </div>

      <div class="project-card">
        <h3>DeepVision</h3>
        <span class="language" style="color:#DA5B0B">Jupyter Notebook</span>
        <p>Learning and experiments in Computer Vision using state-of-the-art algorithms and techniques implemented with PyTorch.</p>
        <div class="topics">
          <span class="topic">computer-vision</span>
          <span class="topic">deep-learning</span>
          <span class="topic">pytorch</span>
        </div>
        <a href="https://github.com/divya-r-kamat" target="_blank">View on GitHub →</a>
      </div>

      <div class="project-card">
        <h3>AutoTicketAssignment</h3>
        <span class="language" style="color:#DA5B0B">Jupyter Notebook</span>
        <p>An application that automates ticket assignment using NLP techniques.</p>
        <div class="topics">
          <span class="topic">nlp</span>
          <span class="topic">automation</span>
          <span class="topic">ticketing-systems</span>
        </div>
        <a href="https://github.com/divya-r-kamat" target="_blank">View on GitHub →</a>
      </div>
    `;
  }

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
</script>
