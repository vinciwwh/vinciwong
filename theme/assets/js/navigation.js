async function updateNavigation() {
  // Fetch projects.json
  const response = await fetch('/projects.json');
  const projects = await response.json();

  // Get the current URL
  const currentUrl = window.location.pathname;

  // Find the current project's index
  const currentIndex = projects.findIndex((project) => project.url === currentUrl);

  // Get previous and next projects
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;

  // Update navigation buttons
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  if (prevProject) {
    prevButton.href = prevProject.url;
    document.getElementById("prevTitle").textContent = prevProject.title;
  } else {
    prevButton.style.display = "none"; // Hide if no previous project
  }

  if (nextProject) {
    nextButton.href = nextProject.url;
    document.getElementById("nextTitle").textContent = nextProject.title;
  } else {
    nextButton.style.display = "none"; // Hide if no next project
  }
}

// Call the function when the page loads
updateNavigation();
