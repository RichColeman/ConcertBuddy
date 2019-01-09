let concerts = [];

function concertRows() {
  $(".eventWall").empty();
  $(".loading").html(`<h2>Loading Concerts...</h2>`)
  let rowsToAdd = [];
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
    let eventid = event.id;
    window.location.href = "/events/" + eventid;
  });
}

$(".bandSearch").on("click", function (event) {
  if ($("#Artist").is(":checked")) {
    event.preventDefault();
    let artistSearch = $("#bandInput").val().trim();
    $.get(`/api/songkick/artist/${artistSearch}`, function (data) {
      concerts = data;
      concertRows();
    });
  }
  if ($("#Zip").is(":checked")) {
    event.preventDefault();
    let zipSearch = $("#bandInput").val().trim();
    $.get(`/api/songkick/city/${zipSearch}`, function (data) {
      concerts = data;
      concertRows();
    })
  }
});

$(document).on("click", "button.attend", toggleAttendance);