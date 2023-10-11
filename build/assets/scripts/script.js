// biggest container tied to user holds all nights in
document.getElementById("alsoSneaky").style.display = "none";
let bigContainer = [];
if (localStorage.getItem("user")) {
  bigContainer = JSON.parse(localStorage.getItem("user"));
}

let displayEl = document.getElementById("create-night-in");
displayEl.style.display = "none";

let deleteBtn = document.getElementById("delete-night");

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

var targetOutput = document.getElementById("target");
for (i = 0; i < bigContainer.length; i++) {
  var listEl = document.createElement("li");
  var titleEl = document.createElement("p");
  titleEl.textContent = bigContainer[i].title;
  var resEl = document.createElement("p");
  resEl.textContent = bigContainer[i].res;
  var movieEl = document.createElement("p");
  movieEl.textContent = bigContainer[i].movie;
  listEl.appendChild(titleEl);
  listEl.appendChild(resEl);
  listEl.appendChild(movieEl);

  targetOutput.appendChild(listEl);
}

// saves the title, movies, restaurant as an array to local

function saveNight() {
  // var dataTransfer = JSON.parse(localStorage.getItem("user"));
  var userValue = JSON.parse(localStorage.getItem("user"));
  console.log("this is user value", userValue);
  console.log("this is before the if statement", bigContainer);
  if (userValue !== null) {
    // bigContainer.push(userValue);
    bigContainer = userValue;
  }
  console.log("this is big container", bigContainer);
  // dataTransfer.push(titleInput.value, movieInput.value, restaurantInput.value);
  var inputData = {
    title: titleInput.value,
    movie: movieInput.value,
    res: restaurantInput.value,
  };
  bigContainer.push(inputData);
  console.log(bigContainer);
  // console.log(bigContainer);
  var bigContainerStorage = JSON.stringify(bigContainer);

  localStorage.setItem("user", bigContainerStorage);

  var listEl = document.createElement("li");
  var titleEl = document.createElement("p");
  titleEl.textContent = inputData.title;
  var resEl = document.createElement("p");
  resEl.textContent = inputData.res;
  var movieEl = document.createElement("p");
  movieEl.textContent = inputData.movie;
  listEl.appendChild(titleEl);
  listEl.appendChild(resEl);
  listEl.appendChild(movieEl);

  targetOutput.appendChild(listEl);

  // (document.getElementById("zero").innerHTML = bigContainer[0].title +  bigContainer[0] + bigContainer.);
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
    }
  }
}
// save button work
nightSaveBtn.addEventListener("click", () => {
  saveNight();
});

// movie button works.
movieButton.addEventListener("click", () => {
  // backup if movie api server is still down
  // comment out if server works
  // movieArray = [
  //   "National Treasure",
  //   " National Treasure II",
  //   " Blade",
  //   " Blade II",
  //   " The Barbie Movie",
  //   " Lilo and Stich",
  //   " Halloween",
  //   " Jeepers Creepers",
  //   " Scream",
  //   " Mirrors",
  //   " Click",
  //   " Tarzan",
  //   " Limitless",
  //   " An Extremely Goofy Movie",
  //   " The Royal Tenenbaums",
  // ];
  movieArray = [];
  movieApi();
  movieList.textContent = movieArray;
});
// address button works
addressButton.addEventListener("click", () => {
  restaurantArray = [];
  getApi(addressBox.value);

  // localStorage.clear();
});
// display night in creator
document.getElementById("create-btn").addEventListener("click", () => {
  // display night in creation
  document.getElementById("create-night-in").style.display = "block";
});
// hide night in creator
document.getElementById("pickone-return").addEventListener("click", () => {
  // this is where it hides it
  document.getElementById("create-night-in").style.display = "none";
});

// delete nights
deleteBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  // location.reload();
  while (targetOutput.firstChild) {
    targetOutput.removeChild(targetOutput.firstChild);
  }
});

// devon code
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

signupForm.addEventListener("submit", (e) => {
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

  // Check if the username already exists in local storage
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = existingUsers.some(
    (user) => user.username === signupUsername
  );

  if (userExists) {
    errorText.textContent =
      "Username already exists. Please choose a different one.";
    return;
  }

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    var signupUsername = signupUsernameInput.value;
    var signupPassword = signupPasswordInput.value;

    // Validation (you can replace this with your own validation logic)
    if (signupUsername.length < 4) {
      errorText.textContent = "Username must be at least 4 characters long.";
      return;
    }

    if (signupPassword.length < 6) {
      errorText.textContent = "Password must be at least 6 characters long.";
      return;
    }

    // Check if the username already exists in local storage
    var existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    var userExists = existingUsers.some(
      (user) => user.username === signupUsername
    );

    if (userExists) {
      errorText.textContent =
        "Username already exists. Please choose a different one.";
      errorText.style.color = "white";
      return;
    }

    // Create a new user and save it to local storage
    var newUser = { username: signupUsername, password: signupPassword };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Clear previous error message, if any
    errorText.textContent = "";

    // Clear previous error message, if any
    errorText.textContent = "";

    // Redirect or notify the user of successful signup
    document.getElementById("sneaky").style.display = "none";
  });
});
// Login logic
loginForm.addEventListener("submit", (e) => {
  document.getElementById("alsoSneaky").style.display = "block";
  // Redirect or notify the user of successful signup
  document.getElementById("sneaky").style.display = "none";
});

// Login logic
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("alsoSneaky").style.display = "block";
  document.getElementById("sneaky").style.display = "none";
  var username = usernameInput.value;
  var password = passwordInput.value;

  // Add validation to check if username and password are not empty
  if (!username || !password) {
    errorText.textContent = "Username and password are required.";
    return;
  }

  // Check if the username and password match any user in local storage
  var existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  var user = existingUsers.find(
    (user) => user.username === username && user.password === password
  );

  var user = existingUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Clear previous error message, if any
    errorText.textContent = "";

    // Redirect or notify the user of successful login
    // window.location.href = "login-success.html";
  } else {
    // Password is incorrect, display an error message
    errorText.textContent = "Incorrect username or password. Please try again.";
    errorText.style.color = "white";
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
  document.getElementById("sneaky").style.display = "none";
  document.getElementById("alsoSneaky").style.display = "block";
});
