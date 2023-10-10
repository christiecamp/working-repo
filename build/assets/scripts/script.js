
// const start_btn = document.querySelector(".start_btn button");
// const details_box = document.querySelector("details_box");


// const start_btn = document.querySelector (".start_btn button");
// const details_box = document.querySelector ("details_box");

// const next_btn = details_box.querySelector (".next_btn button")

const start_btn = document.querySelector(".start_btn button");
const details_box = document.querySelector("details_box");


// const next_btn = details_box.querySelector(".next_btn button");
// biggest container tied to user holds all nights in
let bigContainer = [];
console.log(localStorage.getItem("user"));

// restaurant stuff
let restaurantArray = [];
var restaurantDisplay = document.getElementById("restaurantLocal");
var addressBox = document.getElementById("address");
var addressButton = document.getElementById("confirmButton");
var restaurantInput = document.getElementById("foodData");
// movie stuff
let movieArray = [];
var movieList = document.getElementById("movieList");
var movieButton = document.getElementById("movieButton");
var movieInput = document.getElementById("movieData");

// title stuff
var titleInput = document.getElementById("night-title");

// save button

var nightSaveBtn = document.getElementById("nightSave");

// saves the title, movies, restaurant as an array to local

function saveNight() {
  var dataTransfer = [];

  dataTransfer.push(titleInput.value, movieInput.value, restaurantInput.value);
  // console.log(titleInput.value);
  // console.log(movieInput.value);
  // console.log(restaurantInput.value);
  bigContainer.push("$  " + dataTransfer + "  $");
  console.log(bigContainer);
}
// local storage save
function storageSave() {
  localStorage.setItem("user", bigContainer);
}

// rapidapi request

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a29c1b9a85msh88864d9b5289dfbp1a2b09jsnb041e8531c7d",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

// movie data function
function movieApi() {
  const response = fetch(
    // set to random 15 from most popular
    "https://moviesdatabase.p.rapidapi.com/titles/random?limit=15&list=most_pop_movies",
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < 15; i++) {
        movieArray.push(data.results[i].titleText.text);
        movieList.textContent = movieArray;
        console.log(movieArray[i]);
        // set movie array to display as an element text content someelement.textContent=movieArray
      }
    });
}
// geocode request
function getApi(value) {
  var apiUrl =
    "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDID4ej9YC2P8vUwpG-7MomaiOwMzJq9jk&address=";
  fetch(apiUrl + value)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.results[0].geometry.location);
      initMap(data.results[0].geometry.location);
    });
}


function initMap(latLon) {
  var position = latLon;

  map = new google.maps.Map(document.getElementById("map"), {
    center: position,
    zoom: 15,
  });

  //   infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(
    {
      location: position,
      radius: 1500, // meters
      openNow: true,
      type: ["restaurant"],
    },
    callback
  );
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // console.log(results[i].name);
      // make the array and display it so user can choose.
      restaurantArray.push(results[i].name);
      restaurantDisplay.textContent = restaurantArray;
      //   localStorage.setItem("restaurants" + i, JSON.stringify(results[i].name));
      // }
      // for (var i = 0; i < localStorage.length; i++) {
      //   var item = [localStorage.getItem("restaurants" + i)];
      //   restaurantAppend.append(item + ", ");
      // }
    }
  }
}
// save button work
nightSaveBtn.addEventListener("click", () => {
  saveNight();
  storageSave();
});

// movie button works.
movieButton.addEventListener("click", () => {
  movieArray = [];
  movieApi();
});
// address button works
addressButton.addEventListener("click", () => {
  restaurantArray = [];
  getApi(addressBox.value);

  // localStorage.clear();

  // for (var i = 0; i < localStorage.length; i++) {
  //   var item = localStorage.getItem("restaurants" + i);
  //   restaurantAppend.append(item);
  // }
  // for (var i = 0; i < localStorage.length; i++) {
  //   var item = localStorage.getItem("restaurants" + i);
  //   restaurantAppend.append(item);
  // }
});


var loginForm = document.getElementById("login-form");
var signupForm = document.getElementById("signup-form");
var usernameInput = document.querySelector(".username");
var passwordInput = document.querySelector(".password");
var signupUsernameInput = document.querySelector(".signup-username");
var signupPasswordInput = document.querySelector(".signup-password");
var loginButton = document.querySelector(".login-button");
var signupButton = document.querySelector(".signup-button");
var errorText = document.querySelector(".error-text");


// Signup logic
signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const signupUsername = signupUsernameInput.value;
    const signupPassword = signupPasswordInput.value;

    // Validation (you can replace this with your own validation logic)
    if (signupUsername.length < 4) {
        errorText.textContent = "Username must be at least 4 characters long.";
        return;
    }

    if (signupPassword.length < 6) {
        errorText.textContent = "Password must be at least 6 characters long.";
        return;
    }

// When the eye icon is clicked to toggle password visibility
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
      } else {
        password.type = "password";
        eyeIcon.classList.replace("bx-show", "bx-hide");
      }
    });
  });
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Preventing form submit
    form.classList.toggle("show-signup");
  });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();


    // Check if the username already exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some(user => user.username === signupUsername);

    if (userExists) {
        errorText.textContent = "Username already exists. Please choose a different one.";
        return;
    }

    // Create a new user and save it to local storage
    var newUser = { username: signupUsername, password: signupPassword };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Clear previous error message, if any
    errorText.textContent = "";

    // Redirect or notify the user of successful signup
    window.location.href = "signup-success.html"; 
});


// Login logic
loginForm.addEventListener("submit", e => {
    e.preventDefault();

    var username = usernameInput.value;
    var password = passwordInput.value;

    // Add validation to check if username and password are not empty
    if (!username || !password) {
        errorText.textContent = "Username and password are required.";
        return;
    }

    // Check if the username and password match any user in local storage
    var existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    var user = existingUsers.find(user => user.username === username && user.password === password);

    if (user) {
        // Clear previous error message, if any
        errorText.textContent = "";

        // Redirect or notify the user of successful login
        window.location.href = "login-success.html";
    } else {
        // Password is incorrect, display an error message
        errorText.textContent = "Incorrect username or password. Please try again.";
    }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var signupUsername = signupUsernameInput.value;
  signupPassword = signupPasswordInput.value;

  // Implement your signup logic here
  // You can add validation, create user accounts, and handle errors

  // For example, you can save the signup data to local storage for simplicity
  localStorage.setItem("signupUsername", signupUsername);
  localStorage.setItem("signupPassword", signupPassword);

});

})