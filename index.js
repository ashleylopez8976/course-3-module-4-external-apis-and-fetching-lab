// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
async function fetchWeatherAlerts(state) {
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.classList.remove("hidden");
  try {
    const response = await fetch(weatherApi + state);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
    const display = document.getElementById("alerts-display");
    display.textContent = `${data.title} — Weather Alerts: ${data.features.length}`;

if (data.features.length === 0) {
  display.textContent = "No active alerts for this state.";
} else {
  data.features.forEach((alert) => {
    const headline = document.createElement("p");
    headline.textContent = alert.properties.headline;
    display.appendChild(headline);
  });
}
    return data;
  } catch (error) {
    console.log(error);
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  } finally {
    loadingIndicator.classList.add("hidden");
  }
}

document.getElementById("fetch-alerts").addEventListener("click", () => {
  const input = document.getElementById("state-input");
  const state = input.value.trim().toUpperCase();
  input.value = ""; // Clear the box
  if (!state) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "Enter a two-letter state abbreviation.";
  errorMessage.classList.remove("hidden");
  return;
}
if (!/^[A-Z]{2}$/.test(state)) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "Enter a two-letter state abbreviation.";
  errorMessage.classList.remove("hidden");
  return;
}
  fetchWeatherAlerts(state);
});