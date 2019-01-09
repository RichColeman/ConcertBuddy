let concerts = [];

function concertRows() {
  console.log("success")
  $(".eventWall").empty();
  $(".loading").html(`<h2>Loading Concerts...</h2>`)
  let rowsToAdd = [];
  console.log(concerts)
  for (let i = 0; i < concerts.length; i++) {
    rowsToAdd.push(createNewRow(concerts[i]));
  }
  $(".eventWall").prepend(rowsToAdd);
  $(".loading").empty();
  $(".loading").html(`<h2>Find Your Concert</h2>`)
}

function createNewRow(concert) {
  let newInputRow = $(
    [
      `<div class="card text-white bg-dark mb-3" style="width: 18rem;">`,
      `<div class="card-body">`,
      `<h5 class="card-title">${concert.artist}</h5>`,
      `<p class="card-text">Playing at the ${concert.venue} in ${concert.City}</p>`,
      `<p class="card-text">${concert.Date}</p>`,
      `<input type='text' class='edit' style='display: none;'>`,
      "<button class='attend btn btn-secondary'>I'm Going!</button>",
      `</div>`,
      `</div>`
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
  }).then((event) => {
    console.log(event);
    let eventid = event.id;
    console.log(eventid);
    window.location.href = "/events/" + eventid;
  });
}

$(".bandSearch").on("click", function (event) {
  if ($("#Artist").is(":checked")) {
    event.preventDefault();
    console.log("hi")
    let artistSearch = $("#bandInput").val().trim();
    console.log(artistSearch);
    $.get(`/api/songkick/artist/${artistSearch}`, function (data) {
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
    $.get(`/api/songkick/city/${zipSearch}`, function (data) {
      console.log(data);
      concerts = data;
      console.log(concerts)
      concertRows();
    })
  }
});

$(document).on("click", "button.attend", toggleAttendance);