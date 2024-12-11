// Backend API URL
const apiUrl = "http://127.0.0.1:8000/suggestions"; // Replace with your actual backend URL

// Fetch suggestions from the API
async function fetchSuggestions() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
    }

    const data = await response.json();
    renderSuggestions(data.suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    document.getElementById("suggestions-list").innerHTML =
      "<li>Error loading suggestions. Please try again later.</li>";
  }
}

function renderSuggestions(suggestions) {
  const suggestionsList = document.getElementById("suggestions-list");

  // Clear any existing suggestions
  suggestionsList.innerHTML = "";

  // Add each suggestion as a clickable link with its body
  suggestions.forEach((suggestion, index) => {
    const listItem = document.createElement("li");

    // Create the link element for the title
    const link = document.createElement("a");
    link.href = `/suggestion/${index}`; // You can change this to match your route logic
    link.textContent = suggestion.title; // Display the title
    link.classList.add("suggestion-title"); // Apply the CSS class for the title

    // Create a paragraph element to show the body
    const body = document.createElement("p");
    body.textContent = suggestion.body; // Display the body
    body.classList.add("suggestion-body"); // Apply the CSS class for the body

    // Create an element for the name
    const name = document.createElement("p");
    name.textContent = suggestion.name; // Display the name
    name.classList.add("suggestion-name"); // Apply the CSS class for the name

    // Append the title link and body to the list item
    listItem.appendChild(name);
    listItem.appendChild(document.createElement("hr"));
    listItem.appendChild(link);
    listItem.appendChild(body);
    listItem.appendChild(document.createElement("br"));

    // Append the list item to the suggestions list
    suggestionsList.appendChild(listItem);
  });
}

// Initialize the app
fetchSuggestions();
