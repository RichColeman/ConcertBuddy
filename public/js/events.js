$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
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
    $.get(`/api/attendees/${eventId}`, function(data) {
      console.log(data);
    })
  }
  
  function eventInfo() {
    let url = window.location.href;
    let eventId = url.split("events/")[1];
    $.get(`/api/events/${eventId}`, function(data) {
      console.log(data);
  })

  function initMap(latitude, longitude) {
    var myLatLng = { lat: latitude, lng: longitude };
  
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: "Hello World!"
    });
  }
  initMap();

}

});
// $(document).ready(function() {
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(function(data) {
//     $(".member-id").text(data.id);
//     $(".member-name").text(data.email);
//     console.log(data.email);
//     $(".member-fname").text(data.firstName);
//     console.log(data.firstNam);
//     $(".member-lname").text(data.lastName);
//     $(".member-zip").text(data.zipcode);
//   });
// });