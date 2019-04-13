function playImage() {
  let state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).data("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr('src', $(this).data("data-still"));
    $(this).attr("data-state", "still");
  }
};

$("button").on("click", function () {
  let person = $(this).attr("data-person");
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=GuDZZy16trs4Vhj28anjJPi2PQJJ0Nvq&Limit=10";
   
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response)
      let results = response.data;

      for (let i = 0; i < results.length; i++) {
        let gifDiv = $("<div>");
        let rating = results[i].rating;
        let p = $("<p>").text("Rating: " + rating);

        let imgElement = $("<img>");
        imgElement.attr("src", results[i].images.fixed_height.url);

        let animatedImageURL = results[i].images.fixed_height.url;
        let stillImageURL = results[i].images.fixed_height_still.url;
        let gifImage = $("<img>")
          .attr("src", stillImageURL)
          .attr("data-data-animate", animatedImageURL)
          .attr("data-data-still", stillImageURL)
          .attr("data-state", "still")
          .on("click", playImage);

        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);
        $("#image-location").prepend(gifDiv);
      }

    });
});

