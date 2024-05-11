function showHotel() {
  document.getElementById('hotelContainer').style.display = 'block'; // Show hotel container
  document.getElementById('flightContainer').style.display = 'none';  // Hide flight container
}

function showFlight() {
  document.getElementById('hotelContainer').style.display = 'none';   // Hide hotel container
  document.getElementById('flightContainer').style.display = 'block'; // Show flight container
}

function showContainer(containerId) {
  var containers = ['oneWayContainer', 'roundTripContainer', 'multiCityContainer'];

  // Loop through all container IDs
  containers.forEach(function(id) {
    // Check if the current container ID matches the one to show
    if (id === containerId) {
      document.getElementById(id).style.display = 'flex'; // Show the matching container
    } else {
      document.getElementById(id).style.display = 'none';  // Hide other containers
    }
  });
}

//fetching hotel data
fetch('db/hotel/india_cities.json')
  .then(response => response.json())
  .then(data => {

    const cityDropdown = document.getElementById('cityDropdownHotelFrom');
    data.forEach(city => {
      const option = document.createElement('li');
      option.classList.add('dropdown-item');
      option.textContent = city.cityName; // Using cityName from your JSON format
      option.onclick = function() {
        document.getElementById('defaultHotelCity').innerText = city.cityName; // Display cityName
        toggleDropdown();
      };
      cityDropdown.appendChild(option);
    });
  })
  .catch(error => console.error('Error loading city data:', error));


// Setup search button listener
// document.getElementById('searchButton').addEventListener('click', function() {
//   const searchQuery = document.getElementById('searchInput').value;
//   filterHotels(searchQuery);
// });

function toggleDropdown() {
  const dropdown = document.getElementById('cityDropdownHotelFrom');
  if (dropdown.style.display === 'none') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
}
function filterCities() {
  var input = document.getElementById('searchCityInputHotel');
  var filter = input.value.toUpperCase();
  var ul = document.getElementById("cityDropdownHotelFrom");
  var li = ul.getElementsByTagName('li');

  // Loop from the second element (index 1) to skip the input field
  for (var i = 1; i < li.length; i++) {
    var a = li[i].textContent || li[i].innerText; // Directly use textContent since there are no <a> tags
    if (a.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}



//flight container js
// Swap flight cities
function swapCities() {
  var fromCity = document.getElementById('defaultCity').innerText;
  var fromAirport = document.getElementById('defaultAirport').innerText;
  var toCity = document.getElementById('defaultCityTo').innerText;
  var toAirport = document.getElementById('defaultAirportTo').innerText;

  document.getElementById('defaultCity').innerText = toCity;
  document.getElementById('defaultAirport').innerText = toAirport;
  document.getElementById('defaultCityTo').innerText = fromCity;
  document.getElementById('defaultAirportTo').innerText = fromAirport;
}

// Toggle dropdown
function toggleDropdownFlight(id) {
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  dropdownMenus.forEach(menu => {
    if (menu.id === id) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    } else {
      menu.style.display = 'none';
    }
  });
}

// Filter cities
function filterCitiesFlight(dropdownId, inputId) {
  const input = document.getElementById(inputId);
  const filter = input.value.toUpperCase();
  const ul = document.getElementById(dropdownId);
  const li = ul.getElementsByTagName('li');

  for (let i = 0; i < li.length; i++) {
    const text = li[i].textContent || li[i].innerText;
    li[i].style.display = text.toUpperCase().includes(filter) ? "" : "none";
  }
}

// Load airport data from airport.json
function loadAirports() {
  fetch('db/flights/airport.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      populateDropdown(data, 'cityDropdownFrom', 'defaultCity', 'defaultAirport', 'toggleDropdownFlight("cityDropdownFrom")');
      populateDropdown(data, 'cityDropdownTo', 'defaultCityTo', 'defaultAirportTo', 'toggleDropdownFlight("cityDropdownTo")');
    })
    .catch(error => console.error('Error loading airport data:', error));
}

// Populate dropdown with city and airport information
function populateDropdown(data, dropdownId, cityId, airportId, toggleFunction) {
  const cityDropdown = document.getElementById(dropdownId);
  cityDropdown.innerHTML = `
    <span class="ms-3">${dropdownId.includes("From") ? "From" : "To"}:</span><br>
    <div>
      <input style="width:90%" class="ms-3" type="text" id="searchInput${dropdownId.includes("From") ? "From" : "To"}" placeholder="Search City" onkeyup="filterCitiesFlight('${dropdownId}', 'searchInput${dropdownId.includes("From") ? "From" : "To"}')">
    </div>
  `;

  data.forEach(airport => {
    const option = document.createElement('li');
    option.classList.add('dropdown-item');

    const cityDiv = document.createElement('div');
    cityDiv.classList.add('d-flex', 'justify-content-between', 'mt-1');

    const cityName = document.createElement('h5');
    cityName.style.marginBottom = '0';
    cityName.textContent = airport.city;

    const cityCode = document.createElement('span');
    cityCode.textContent = airport.code;

    cityDiv.appendChild(cityName);
    cityDiv.appendChild(cityCode);

    const airportName = document.createElement('small');
    airportName.style.whiteSpace = 'nowrap';
    airportName.textContent = airport.name;

    option.appendChild(cityDiv);
    option.appendChild(airportName);

    option.onclick = function() {
      document.getElementById(cityId).innerText = airport.city;
      document.getElementById(airportId).innerText = `${airport.code}, ${airport.name}`;
      eval(toggleFunction);
    };

    cityDropdown.appendChild(option);
  });
}

// Travel & class dropdown
function toggleBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.style.display = bookingForm.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", function() {
  generateButtons('adults', 11);
  generateButtons('children', 8);
  generateButtons('infants', 4);
  loadAirports();
});

function generateButtons(section, count) {
  const container = document.getElementById(section);
  for (let i = 0; i < count; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = 'btn btn-outline-primary';
    button.onclick = function() { setActive(button, section); updateTravelers(); };
    container.appendChild(button);
  }
}

function setActive(button, section) {
  const buttons = document.querySelectorAll(`#${section} button`);
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

function updateTravelers() {
  let total = 0;
  const sections = ['adults', 'children', 'infants'];
  sections.forEach(section => {
    const activeButton = document.querySelector(`#${section} .active`);
    if (activeButton) {
      total += parseInt(activeButton.textContent);
    }
  });
  const numTravellers = document.getElementById('numTravellers');
  numTravellers.textContent = total;
  numTravellers.nextElementSibling.textContent = total === 1 ? ' Traveller' : ' Travellers';
}

function updateTravelClass(selectedClass, button) {
  const travelClassButtons = document.querySelectorAll('#travelClassButtons button');
  travelClassButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  document.getElementById('travelClass').textContent = selectedClass;
}

function updateDisplay() {
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.style.display = 'none';
}
// // Assuming jQuery and Bootstrap are included
$(document).ready(function() {
  $('.dropdown-menu form').click(function(e) {
      e.stopPropagation(); // Prevent form from closing dropdown
  });

  $('form').on('submit', function(e) {
      e.preventDefault(); // Prevent actual form submission
      const rooms = $('#rooms-select').val();
      const adults = $('#adults-select').val();
      const children = $('#children-select').val();
      // Perform your action here
      alert(`Rooms: ${rooms}, Adults: ${adults}, Children: ${children}`);
      $('.dropdown').dropdown('hide'); // Hide dropdown after submission
  });
});
