// Backend API URL
const apiUrl = "http://127.0.0.1:8000/projects"; // Replace with your actual backend URL

// Fetch projects from the API
async function fetchProjects() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    renderProjects(data.projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    document.getElementById("project-list").innerHTML =
      "<li>Error loading projects. Please try again later.</li>";
  }
}

// Render the projects as clickable links with their details
function renderProjects(projects) {
  const projectsList = document.getElementById("project-list");

  // Clear any existing projects
  projectsList.innerHTML = "";

  // Add each project as a clickable link with its title and body
  projects.forEach((project, index) => {
    const listItem = document.createElement("li");

    // Create the link element for the title
    const name = document.createElement("a");
    name.href = `/project/${index}`; // You can change this to match your route logic
    name.textContent = project.title; // Display the title
    name.classList.add("project-title"); // Apply the CSS class for the title

    // Create a paragraph element to show the description
    const description = document.createElement("p");
    description.textContent = project.desc; // Display the description (assuming `desc` is the description)
    description.classList.add("project-description"); // Apply the CSS class for the description

    // Append the title link and description to the list item
    listItem.appendChild(name);
    listItem.appendChild(document.createElement("hr"));
    listItem.appendChild(description);
    listItem.appendChild(document.createElement("br"));

    // Append the list item to the projects list
    projectsList.appendChild(listItem);
  });
}

// Initialize the app by fetching the list of projects
fetchProjects();
