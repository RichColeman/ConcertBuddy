$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
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