async function fetchJsonData() {
  try {
    const response = await fetch('./data.json'); // Path to your JSON file
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json(); // Parses the response body as JSON
    console.log(jsonData); // Use your JSON object here
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

