export async function fetchJsonData() {
  const url = new URL('../data.json', import.meta.url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}
