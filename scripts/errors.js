// Display an error message
export default function displayError(message) {
  console.log("ERROR:", message);
  const weatherContainer = document.getElementById("local-weather");
  weatherContainer.innerHTML = `
    <p><strong>Error:</strong> ${message}</p>
  `;
}
