export async function fetchJsonData() {
  try {
    const response = await fetch('/bootstrap_makeover/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json(); // Parses the response body as JSON
    return jsonData;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

