let concerts = [];

function concertRows() {
  console.log("success")
  $(".eventWall").empty();
  let rowsToAdd = [];
  console.log(concerts)
  for (let i = 0; i < concerts.length; i++) {
    rowsToAdd.push(createNewRow(concerts[i]));
  }
  $(".eventWall").prepend(rowsToAdd);
}

function createNewRow(concert) {
  let newInputRow = $(
    [
      "<li class='list-group-item concert-item'>",
      "<span>",
      concert.artist,
      concert.venue,
      concert.Date,
      concert.City,
      concert.Time,
      "</span>",
      "<input type='text' class='edit' style='display: none;'>",
      "<button class='attend btn btn-primary'>Attend</button>",
      "</li>"
    ].join("")
  );
  newInputRow.find("button.attend").data("info", concert);
  newInputRow.data("info", concert);
  return newInputRow;
}

function toggleAttendance(event) {
  event.stopPropagation();
  let selectConcert = $(this).data("info");
  attendEvent(selectConcert);
}

function attendEvent(concert) {
  $.ajax({
    method: "POST",
    url: "/api/events",
    data: concert
  }).then((event) =>{
    console.log(event);
    let eventid = event.id;
    console.log(eventid);
    window.location.href = "/events/" + eventid;
  });
}

$(".bandSearch").on("click", function(event) {
  if ($("#Artist").is(":checked")) {
  event.preventDefault();
  console.log("hi")
  let artistSearch = $("#bandInput").val().trim();
  console.log(artistSearch);
  $.get(`/api/songkick/artist/${artistSearch}`, function(data) {
  console.log(data);
  concerts = data;
  console.log(concerts)
  concertRows();
  });
}
if ($("#Zip").is(":checked")) {
  event.preventDefault();
  console.log("hi")
  let zipSearch = $("#bandInput").val().trim();
  console.log(zipSearch);
  $.get(`/api/songkick/city/${zipSearch}`, function(data) {
  console.log(data);
  concerts = data;
  console.log(concerts)
  concertRows();
})
}
});

$(document).on("click", "button.attend", toggleAttendance);