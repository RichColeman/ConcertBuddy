$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    $.get("/api/myevents/" + data.id).then(function(event) {
      $(".eventWall").empty();
      let rowsToAdd = [];
      for (let i = 0; i < event.length; i++) {
        rowsToAdd.push(createNewRow(event[i]))
      }
      $(".eventWall").prepend(rowsToAdd);
    });
  });
});


function createNewRow(concert) {
  let newInputRow = $(
    [
      `<div class="card text-white bg-dark mb-3" style="width: 18rem;">`,
      `<div class="card-body">`,
      `<h5 class="card-title">${concert.artist}</h5>`,
      `<p class="card-text">Playing at the ${concert.venue} in ${concert.city}</p>`,
      `<p class="card-text">${concert.date}</p>`,
      `<input type='text' class='edit' style='display: none;'>`,
      "<button class='event btn btn-secondary'>Check Event!</button>",
      `</div>`,
      `</div>`
    ].join("")
  );
  newInputRow.find("button.event").data("info", concert);
  newInputRow.data("info", concert);
  return newInputRow;
}

$(document).on("click", "button.event", function() {
    event.stopPropagation();
  let concertId = $(this).data("info");
  window.location.href = "/events/" + concertId.id;
});