const textarea = document.getElementById("expandable");

// Adjust height based on content
textarea.addEventListener("input", function () {
  this.style.height = "auto"; // Reset height to calculate the new height
  this.style.height = this.scrollHeight + "px"; // Set new height based on scrollHeight
});

const apiURL = "http://127.0.0.1:8000/suggestions";

document
  .getElementById("postForm")
  .addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values from input fields
    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const body = document.getElementById("expandable").value;

    // Validate the input fields
    if (!name || !title || !body) {
      alert("Please fill out all fields.");
      return;
    }

    const suggestion = {
      name: name,
      title: title,
      body: body,
    };

    try {
      // Make the POST request to the backend API
      const response = await fetch(apiURL, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(suggestion), // Send data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Suggestion submitted successfully! Title: ${data.title}`);
        // Clear the form fields
        document.getElementById("name").value = "";
        document.getElementById("title").value = "";
        document.getElementById("expandable").value = "";
      } else {
        alert("Failed to submit suggestion.");
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      alert("An error occurred. Please try again.");
    }
  });
