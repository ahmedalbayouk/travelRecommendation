const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const results = document.getElementById("results");

let travelData = null;


// Fetch the JSON data
fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("Travel data:", travelData);
    })
    .catch(error => {
        console.error("Error loading travel data:", error);
    });


// Search button
searchBtn.addEventListener("click", function () {

    const keyword = searchInput.value.trim().toLowerCase();

    results.innerHTML = "";

    if (keyword === "") {
        return;
    }

    if (!travelData) {
        results.innerHTML = "<p>Data is still loading...</p>";
        return;
    }

    let recommendations = [];

    if (keyword === "beach" || keyword === "beaches") {
        recommendations = travelData.beaches;
    }

    else if (keyword === "temple" || keyword === "temples") {
        recommendations = travelData.temples;
    }

    else if (keyword === "country" || keyword === "countries") {
        recommendations = travelData.countries;
    }

    else {
        results.innerHTML = "<p>No recommendations found.</p>";
        return;
    }

    displayRecommendations(recommendations);
});


// Display recommendations
function displayRecommendations(recommendations) {

    recommendations.forEach(place => {

        const card = document.createElement("div");
        card.classList.add("result-card");

        card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">

            <div class="result-content">
                <h2>${place.name}</h2>
                <p>${place.description}</p>
            </div>
        `;

        results.appendChild(card);
    });
}
// Reset button
resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    results.innerHTML = "";
});
