$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    $(".member-fname").text(data.firstName);
    //in case we want to show these in the future
    // $(".member-id").text(data.id);
    // $(".member-lname").text(data.lastName);
    // $(".member-zip").text(data.zipcode);
  });

  function eventAttendees() {
    let url = window.location.href;
    let eventId = url.split("events/")[1];
    let usersGoing = [];
    $.get(`/api/attendees/${eventId}`, function (users) {
      users.forEach(user => {
        usersGoing.push(user.firstName);
      });
      usersGoing.forEach(user => {
        let userDiv = $("<div>");
        userDiv.html(`<h3> ${user} is going.</h3>`)
        $(".users").append(userDiv);
      });
    })
  };

  function eventInfo() {
    let url = window.location.href;
    let eventId = url.split("events/")[1];
    $.get(`/api/events/${eventId}`, function (concert) {
      let concertDiv = $("<div>");
      let headlineDiv = $("<div>");
      let modalDiv = $("<h5>");
      modalDiv.addClass("modal-title");
      concertDiv.html(`<h3> ${concert.artist} is playing at the ${concert.venue} in ${concert.city}. Check out who's going then head to the chat. </h3>`)
      $(".concert-data").append(concertDiv);
      headlineDiv.html(`<h2>Congrats, <span class="member-fname"></span>. <br> You're one step closer to finding your
      ConcertBuddy for the ${concert.artist} show.</h2><br><br>`);
      $(".headline").append(headlineDiv);
      modalDiv.html(`Chat for ${concert.artist} at ${concert.venue}</h5>`);
      $(".modal-header").prepend(modalDiv);
      initMap(+concert.Latitude, +concert.Longitude)
    })

    function initMap(latitude, longitude) {
      var myLatLng = {
        lat: latitude,
        lng: longitude
      };

      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ],
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Hello World!"
      });
    }

  }

  eventAttendees();
  eventInfo();
});
