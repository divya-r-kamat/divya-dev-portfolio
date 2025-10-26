// Smart project filtering and display
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
      // Exclude forks and repos without descriptions
      if (repo.fork || !repo.description) return false;
      
      // Exclude config repos
      if (excludeRepos.some(name => repo.name.toLowerCase().includes(name.toLowerCase()))) {
        return false;
      }
      
      // Check if repo name or description contains project keywords
      const repoText = (repo.name + ' ' + repo.description).toLowerCase();
      const hasKeyword = projectKeywords.some(keyword => repoText.includes(keyword));
      
      // Include if has keywords OR has topics OR has stars
      return hasKeyword || repo.topics?.length > 0 || repo.stargazers_count > 0;
    });

    // If we found projects, display them
    if (projects.length > 0) {
      projectList.innerHTML = "";
      
      projects.slice(0, 6).forEach((repo, index) => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Get language color
        const langColor = getLanguageColor(repo.language);
        
        card.innerHTML = `
          

            
${formatRepoName(repo.name)}

            ${repo.language ? `${repo.language}` : ''}
          

          
${repo.description}


          ${repo.topics && repo.topics.length > 0 ? `
            

              ${repo.topics.slice(0, 3).map(topic => `${topic}`).join('')}
            

          ` : ''}
          

            ⭐ ${repo.stargazers_count}
            🔀 ${repo.forks_count}
          

          
            View on GitHub →
          
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

// Fallback featured projects
function showFeaturedProjects() {
  projectList.innerHTML = `
    

      

        
NLP With PyTorch

        Jupyter Notebook
      

      

        Experiments in Natural Language Processing using PyTorch to solve common NLP problems 
        with advanced and state-of-the-art deep learning techniques.
      


      

        nlp
        deep-learning
        pytorch
      

      
        View on GitHub →
      
    

    
    

      

        
Seq2Py

        Jupyter Notebook
      

      

        A transformer-based model designed to translate English text into Python code, 
        maintaining proper whitespace and indentation.
      


      

        transformers
        nlp
        code-generation
      

      
        View on GitHub →
      
    

    
    

      

        
DeepVision

        Jupyter Notebook
      

      

        Learning and experiments in Computer Vision using state-of-the-art algorithms 
        and techniques implemented with PyTorch.
      


      

        computer-vision
        deep-learning
        pytorch
      

      
        View on GitHub →
      
    

    
    

      

        
AutoTicketAssignment

        Jupyter Notebook
      

      

        An application that automates ticket assignment using NLP techniques for 
        intelligent categorization and routing.
      


      

        nlp
        automation
        ticketing-systems
      

      
        View on GitHub →
    

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
