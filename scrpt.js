// Initialize the map and set the initial view to Nigeria's coordinates
var map = L.map("map").setView([4.8627, 8.3307], 10);
let currentImageIndex = 0;
//

//

// Load OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Custom icons
var marketIcon = L.icon({ iconUrl: "images/maplogo.png", iconSize: [35, 41] });
var newLocationIcon = L.icon({
  iconUrl: "images/maplogo.png",
  iconSize: [35, 41],
});
var cameroonIcon = L.icon({
  iconUrl: "images/maplogo.png",
  iconSize: [35, 41],
});

//data
var infrastructureData = [
  {
    location: [4.8627, 8.3307],
    title: "Port Market",
    description:
      "Port View .++The Port has a large area and can handle many ships and goods. ++",
    icon: marketIcon,
    imageUrls: "images/outskirt3.jpeg",
  },
  {
    location: [4.8127, 8.235],
    title: "Akwa Ibon Beach Side",
    description:
      "The river between the two beaches can enhance transaction and interstate relation. ++",
    icon: newLocationIcon,
    imageUrls: "images/outskirt.jpeg", //["images/akwaibaomwatterside.jpeg", "images/akwibomwaterside2.jpeg"], // Multiple images
  },
  {
    location: [4.156, 9.2632],
    title: "Cameroon Beach",
    description:
      "The port Market in Calabar can be a spot for travelers heading to Cameroon which will cause lot of ease for Them. ++",
    icon: cameroonIcon,
    imageUrls: "images/Camerooniage2.jpg", // ["images/Camerooniage2.jpg", "images/Cameroonimages3.jpg"], // Multiple images
  },
];

//

// Function to open the sidebar and populate it with data
function openSidebar(data) {
  // Show the sidebar
  document.getElementById("sidebar").style.display = "block";

  // Set the title and initial image
  document.getElementById("sidebar-title").innerText = data.title;
  document.getElementById("sidebar-image").src = data.imageUrls;

  // Split the description on full stop or '++' and show it in separate paragraphs
  var descriptionParts = data.description.split(/[.++]/).filter(Boolean); // Filter out empty parts
  var descriptionHTML = descriptionParts
    .map((part) => `<p>${part.trim()}</p>`)
    .join(""); // Generate HTML

  // Set the description in the sidebar
  document.getElementById("sidebar-description").innerHTML = descriptionHTML;

  // Store the current data for the image array to cycle through
  currentImageData = data;
  currentImageIndex = 0; // Reset index when a new location is clicked
}

function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
}

// Add event listener to the close button
document
  .getElementById("close-sidebar")
  .addEventListener("click", closeSidebar);

// Add markers to the map and bind tooltips for each marker
infrastructureData.forEach(function (data) {
  var marker = L.marker(data.location, { icon: data.icon })
    .addTo(map)
    .on("click", function () {
      openSidebar(data); // Show the sidebar on marker click
    });

  // Bind the title as a tooltip to the marker
  marker.bindTooltip(data.title, { permanent: false, direction: "top" });
});

// Draw lines between locations
var beachMarketLocation = [4.8627, 8.3307];
var newLocation = [4.8127, 8.235];
var cameroonLocation = [4.156, 9.2632];

// Dotted line from Beach Market to the new location
L.polyline([beachMarketLocation, newLocation], {
  color: "blue",
  weight: 2,
  dashArray: "11, 11",
  opacity: 0.8,
}).addTo(map);

// Dotted line from new location to Cameroon
L.polyline([beachMarketLocation, cameroonLocation], {
  color: "blue",
  weight: 2,
  dashArray: "11, 11",
  opacity: 0.8,
}).addTo(map);

// Toggle sidebar visibility
document.getElementById("toggle-button").addEventListener("click", function () {
  var sidebar = document.getElementById("sidebar");
  var buttonIcon = document.getElementById("toggle-button").firstElementChild;
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block";
    buttonIcon.classList.replace("fa-bars", "fa-times"); // Change icon to 'X' when sidebar is open
  } else {
    sidebar.style.display = "none";
    buttonIcon.classList.replace("fa-times", "fa-bars"); // Change back to 'bars' icon when sidebar is closed
  }
});
