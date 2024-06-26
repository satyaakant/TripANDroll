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
  
  
  
  ///popup
  // Function to toggle visibility of city dropdown
  
  function openPopup() {
    $('#popup').modal('show');
  }
  function toggleDropdown() {
    var dropdown = document.getElementById('cityDropdownFrom');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
  
  // Function to initialize the room dropdown and listeners
  function initializeRoomDropdown() {
    document.getElementById('pills-hotel-tab').addEventListener('click', function() {
      displayHotelContainer(true);
      displayFlightContainer(false);
    });
  
    document.getElementById('pills-flight-tab').addEventListener('click', function() {
      displayHotelContainer(false);
      displayFlightContainer(true);
    });
  
    document.getElementById('applyRooms').addEventListener('click', applyRoomDetails);
    addInitialRoom(); // Add the initial room setup
  }
  
  // Function to display or hide hotel container
  function displayHotelContainer(show) {
    var hotelContainer = document.querySelector('.hotel-container');
    hotelContainer.style.display = show ? 'block' : 'none';
  }
  
  // Function to display or hide flight container
  function displayFlightContainer(show) {
    var flightContainer = document.querySelector('.flight-container');
    flightContainer.style.display = show ? 'block' : 'none';
  }
  
  // Function to add a room dynamically
  function addRoom() {
    var roomData = document.getElementById('roomData');
    var roomDiv = document.createElement('div');
    roomDiv.className = 'room-details';
    roomDiv.innerHTML = `
          <div>
              <label>Adults:</label>
              <input type="number" value="2" min="1">
          </div>
          <div>
              <label>Children:</label>
              <button onclick="addChildInput(this.parentNode)">Add Child</button>
          </div>
          <div class="children-inputs"></div>
      `;
    roomData.appendChild(roomDiv);
  }
  
  // Function to add child input fields under a specific room
  function addChildInput(parentDiv) {
    var childInputDiv = document.createElement('div');
    childInputDiv.innerHTML = `
          <label>Child Age:</label>
          <input type="number" min="0" max="17" value="0">
          <button onclick="removeElement(this.parentNode)">Remove</button>
      `;
    parentDiv.querySelector('.children-inputs').appendChild(childInputDiv);
  }
  
  // Function to remove an element (general utility)
  function removeElement(element) {
    element.parentNode.removeChild(element);
  }
  
  // Function to apply room details
  function applyRoomDetails() {
    var rooms = document.querySelectorAll('.room-details');
    var totalAdults = 0, totalChildren = 0;
    rooms.forEach(room => {
      totalAdults += parseInt(room.querySelector('input[type="number"]:first-child').value);
      var childrenInputs = room.querySelectorAll('.children-inputs input');
      childrenInputs.forEach(input => {
        totalChildren += parseInt(input.value);
      });
    });
  
    updateRoomSummary(totalAdults, totalChildren);
  }
  
  // Function to update the summary of rooms, adults, and children
  function updateRoomSummary(adults, children) {
    var summary = document.getElementById('defaultInfo');
    summary.textContent = `Rooms: ${adults}, Adults: ${adults}, Children: ${children}`;
  }
  
  // Call to initialize room dropdown on document load
  document.addEventListener('DOMContentLoaded', function() {
    initializeRoomDropdown();
  });
  
  