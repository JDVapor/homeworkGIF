var gifs = ["Taylor Swift", "Ariana Grande", "Pokemon"];

const addButton = () => {

  $("#buttons").empty();
  for (var i = 0; i < gifs.length; i++) {
    var add = $("<button>");
    add.addClass("new-btn");
    add.attr("data-gif", gifs[i]);
    add.text(gifs[i]);
    $("#buttons").append(add);
  }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();

    var gif = $("#userInput").val().trim();
    gifs.push(gif);

    addButton();
  });

addButton();

function displayGIF() {

  var userInput = $(this).attr("data-gif");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=F8QVhw168Lq7Q9EmLDPpTnKEDRdj9jwo&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // console.log(queryURL);
    //
    // console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var gifImage = $("<img>");
      gifImage.attr("src", results[i].images.fixed_height_still.url);
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");
      gifImage.attr("class", "gif");

      gifDiv.append(gifImage);
      gifDiv.append(p);

      $("#gifs-appear-here").prepend(gifDiv);
    }

  });
}

function pauseGIF () {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

$(document).on("click", ".new-btn", displayGIF);
$(document).on("click", ".gif", pauseGIF);
