export async function fetchJsonData() {
  try {
    const response = await fetch('../data.json'); // Path to your JSON file
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json(); // Parses the response body as JSON
    return jsonData;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

