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
function swapCitiesOneWay() {
  var fromOneWayCity = document.getElementById('defaultOneWayCity').innerText;
  var fromOneWayAirport = document.getElementById('defaultOneWayAirport').innerText;
  var toOneWayCity = document.getElementById('defaultOneWayCityTo').innerText;
  var toOneWayAirport = document.getElementById('defaultOneWayAirportTo').innerText;

  document.getElementById('defaultOneWayCity').innerText = toOneWayCity;
  document.getElementById('defaultOneWayAirport').innerText = toOneWayAirport;
  document.getElementById('defaultOneWayCityTo').innerText = fromOneWayCity;
  document.getElementById('defaultOneWayAirportTo').innerText = fromOneWayAirport;
}

function swapCitiesRound() {
  var fromRoundCity = document.getElementById('defaultRoundCity').innerText;
  var fromRoundAirport = document.getElementById('defaultRoundAirport').innerText;
  var toRoundCity = document.getElementById('defaultRoundCityTo').innerText;
  var toRoundAirport = document.getElementById('defaultRoundAirportTo').innerText;
  
  document.getElementById('defaultRoundCity').innerText = toRoundCity;
  document.getElementById('defaultRoundAirport').innerText = toRoundAirport;
  document.getElementById('defaultRoundCityTo').innerText = fromRoundCity;
  document.getElementById('defaultRoundAirportTo').innerText = fromRoundAirport;
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
      populateDropdown(data, 'cityOneWayDropdownFrom', 'defaultOneWayCity', 'defaultOneWayAirport', 'toggleDropdownFlight("cityOneWayDropdownFrom")', 'OneWay');
      populateDropdown(data, 'cityOneWayDropdownTo', 'defaultOneWayCityTo', 'defaultOneWayAirportTo', 'toggleDropdownFlight("cityOneWayDropdownTo")', 'OneWay');    
      populateDropdown(data, 'cityRoundDropdownFrom', 'defaultRoundCity', 'defaultRoundAirport', 'toggleDropdownFlight("cityRoundDropdownFrom")', 'Round');
      populateDropdown(data, 'cityRoundDropdownTo', 'defaultRoundCityTo', 'defaultRoundAirportTo', 'toggleDropdownFlight("cityRoundDropdownTo")', 'Round');
    })
    .catch(error => console.error('Error loading airport data:', error));
}

// Populate dropdown with city and airport information
function populateDropdown(data, dropdownId, cityId, airportId, toggleFunction, tripType) {
  const cityDropdown = document.getElementById(dropdownId);
  cityDropdown.innerHTML = `
    <span class="ms-3">${dropdownId.includes("From") ? "From" : "To"}:</span><br>
    <div>
      <input style="width:90%" class="ms-3" type="text" id="searchInput${dropdownId.includes("From") ? "From" : "To"}${tripType}" placeholder="Search City" onkeyup="filterCitiesFlight('${dropdownId}', 'searchInput${dropdownId.includes("From") ? "From" : "To"}${tripType}')">
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
// function toggleBookingForm(type) {
//   const bookingForm = document.getElementById(`bookingForm${type}`);
//   bookingForm.style.display = bookingForm.style.display === 'none' ? 'block' : 'none';
// }

document.addEventListener("DOMContentLoaded", function() {
  generateButtons('adults', 11);
  generateButtons('children', 8);
  generateButtons('infants', 4);
  loadAirports();
});

function generateButtons(section, count) {
  const containerOneWay = document.getElementById(`${section}OneWay`);
  const containerRound = document.getElementById(`${section}Round`);
  
  for (let i = 0; i < count; i++) {
    const buttonOneWay = document.createElement('button');
    buttonOneWay.textContent = i;
    buttonOneWay.className = 'btn btn-outline-primary';
    buttonOneWay.onclick = function() { setActive(buttonOneWay, section, 'OneWay'); updateTravelers(section); };
    containerOneWay.appendChild(buttonOneWay);

    const buttonRound = document.createElement('button');
    buttonRound.textContent = i;
    buttonRound.className = 'btn btn-outline-primary';
    buttonRound.onclick = function() { setActive(buttonRound, section, 'Round'); updateTravelers(section); };
    containerRound.appendChild(buttonRound);
  }
}

function setActive(button, section, type) {
  const buttons = document.querySelectorAll(`#${section}${type} button`);
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

function updateTravelers(section) {
  let totalOneWay = 0;
  let totalRound = 0;

  const sectionsOneWay = ['adultsOneWay', 'childrenOneWay', 'infantsOneWay'];
  const sectionsRound = ['adultsRound', 'childrenRound', 'infantsRound'];

  sectionsOneWay.forEach(section => {
    const activeButton = document.querySelector(`#${section} .active`);
    if (activeButton) {
      totalOneWay += parseInt(activeButton.textContent);
    }
  });

  sectionsRound.forEach(section => {
    const activeButton = document.querySelector(`#${section} .active`);
    if (activeButton) {
      totalRound += parseInt(activeButton.textContent);
    }
  });

  const numTravellersOneWay = document.getElementById('numTravellersOneWay');
  const numTravellersRound = document.getElementById('numTravellersRound');
  numTravellersOneWay.textContent = totalOneWay;
  numTravellersRound.textContent = totalRound;
  numTravellersOneWay.nextElementSibling.textContent = totalOneWay === 1 ? ' Traveller' : ' Travellers';
  numTravellersRound.nextElementSibling.textContent = totalRound === 1 ? ' Traveller' : ' Travellers';
}


function updateTravelClass(selectedClass, button) {
  const travelClassButtonsOneWay = document.querySelectorAll('#travelClassButtonsOneWay button');
  const travelClassButtonsRound = document.querySelectorAll('#travelClassButtonsRound button');
  travelClassButtonsOneWay.forEach(btn => btn.classList.remove('active'));
  travelClassButtonsRound.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  document.getElementById('travelClassOneWay').textContent = selectedClass;
  document.getElementById('travelClassRound').textContent = selectedClass;
}

function updateDisplay() {
  const bookingFormOneWay = document.getElementById('bookingFormOneWay');
  const bookingFormRound = document.getElementById('bookingFormRound');
  bookingFormOneWay.style.display = 'none';
  bookingFormRound.style.display = 'none';
}

// Travel & class dropdown
function toggleBookingFormOneWay() {
  const bookingFormOneWay = document.getElementById('bookingFormOneWay');
  if (!event.target.closest("#bookingFormOneWay")) {
    bookingFormOneWay.style.display = bookingFormOneWay.style.display === 'none' ? 'block' : 'none';
  }
}
function toggleBookingFormRound() {
  const bookingFormRound = document.getElementById('bookingFormRound');
  bookingFormRound.style.display = bookingFormRound.style.display === 'none' ? 'block' : 'none'; 
}

//one way date display
// document.addEventListener('DOMContentLoaded', function() {
//   const h4Element = document.getElementById('dateDisplay');
//   const spanElement = document.querySelector('.date-selector');
//   const inputElement = document.getElementById('departureDateOneWay');
//   const dateContainer = document.getElementById('dateContainer');

//   // Show the input element on click of the div
//   dateContainer.addEventListener('click', function() {
//     inputElement.style.display = 'inline'; // Display the input
//     inputElement.focus(); // Focus on the input
//   });

//   // Update the date display when a date is selected
//   inputElement.addEventListener('change', function() {
//     const selectedDate = new Date(this.value);
//     const day = selectedDate.getDate();
//     const month = selectedDate.toLocaleString('default', { month: 'short' });
//     const year = selectedDate.getFullYear();

//     h4Element.textContent = day;
//     spanElement.textContent = `${month}'${year}`;
//     inputElement.style.display = 'none'; // Hide the input after selection
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  // Toggle for the Rooms & Guests dropdown
  const toggleButton = document.getElementById('dropdownMenuButton1');
  toggleButton.addEventListener('click', function(event) {
      const dropdown = document.getElementById('roomDropdown');
      // Toggle the visibility
      dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'block' : 'none';
      event.stopPropagation(); // Stop the event from propagating
  });

  // Listen for clicks outside the dropdown to close it
  document.addEventListener('click', function(event) {
      const dropdown = document.getElementById('roomDropdown');
      if (!dropdown.contains(event.target) && dropdown.style.display === 'block') {
          dropdown.style.display = 'none';
      }
  });

  // Prevent clicks inside the dropdown from closing it
  document.getElementById('roomDropdown').addEventListener('click', function(event) {
      event.stopPropagation();
  });
});

function addRoom() {
  const roomDetails = document.getElementById('roomDetails');
  const roomNumber = document.querySelectorAll('#roomCardsContainer .room-card').length + 1;
  roomDetails.innerHTML = `
      <div>
          <h5>Room ${roomNumber}</h5>
          <label>Adults:</label>
          <input type="number" id="adultsInput${roomNumber}" min="1" value="1" class="form-control">
          <label>Children:</label>
          <input type="number" id="childrenInput${roomNumber}" min="0" value="0" class="form-control">
          <button class="btn btn-success mt-2" onclick="applyRoomDetails(${roomNumber})">Apply Room</button>
      </div>
  `;
}

function applyRoomDetails(roomNumber) {
  const adultsInput = document.getElementById(`adultsInput${roomNumber}`);
  const childrenInput = document.getElementById(`childrenInput${roomNumber}`);
  const adults = adultsInput.value;
  const children = childrenInput.value;

  const roomCardsContainer = document.getElementById('roomCardsContainer');
  const roomCard = document.createElement('div');
  roomCard.className = 'room-card';
  roomCard.innerHTML = `
      <h5>Room ${roomNumber}</h5>
      <p>Adults: ${adults}</p>
      <p>Children: ${children}</p>
  `;
  roomCardsContainer.appendChild(roomCard);

  // Clear inputs for new room details
  document.getElementById('roomDetails').innerHTML = '';
}

function updateDefaultInfo() {
  const rooms = document.querySelectorAll('#roomCardsContainer .room-card');
  let totalAdults = 0, totalChildren = 0;
  rooms.forEach(room => {
      totalAdults += parseInt(room.querySelector('p:nth-child(2)').textContent.split(': ')[1]);
      totalChildren += parseInt(room.querySelector('p:nth-child(3)').textContent.split(': ')[1]);
  });

  const defaultInfo = document.getElementById('defaultInfo');
  defaultInfo.textContent = `Rooms: ${rooms.length}, Adults: ${totalAdults}, Children: ${totalChildren}`;

  // Close the dropdown after applying changes
  document.getElementById('roomDropdown').style.display = 'none';
}



