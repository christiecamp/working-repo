var restaurantAppend = document.getElementById("restaurantLocal");
var addressBox = document.getElementById("address");
var addressButton = document.getElementById("confirmButton");
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

      localStorage.setItem("restaurants" + i, JSON.stringify(results[i].name));
      //   heres where you need to append and store to memory
    }
    for (var i = 0; i < localStorage.length; i++) {
      var item = [localStorage.getItem("restaurants" + i)];
      restaurantAppend.append(item + ", ");
    }
  }
}
addressButton.addEventListener("click", () => {
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

// function to append where we need if we need
// function appendLoc() {
//   for (var i = 0; i < localStorage.length; i++) {
//     var item = localStorage.getItem("restaurants" + i);
//     restaurantAppend.append(item);
//   }
// }
// appendLoc();
