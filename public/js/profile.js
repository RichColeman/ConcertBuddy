$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-id").text(data.id);
    $(".member-name").text(data.email);
    $(".member-fname").text(data.firstName);
    $(".member-lname").text(data.lastName);
    $(".member-zip").text(data.zipcode);
  });
});

// TODO rename profile.js to events.js and use this info we're retrieving to display in events.html
