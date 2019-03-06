
// array of our gifs
var topics = ["Bike Fail", "Pet Fail", "Bowling Fail", "Dad Fail", "Dog Fail"];

//set some global variables
var button;
// new topic that will be added via the input field
//leave blank, will be referenced later
var newTopic = "";  

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// function to create new buttons from the topics array
var buttonGenerator = function (){
	// need to remember to empty previous buttons, touched on in class.  See class video from Friday I think...
	 $("#buttonArea").empty();
	// create a for loop to loop through array and put data in buttons 
	for(i = 0; i < topics.length; i++) {
		button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-info").attr("data",topics[i]);
		$("#buttonArea").append(button);
		//adding spacing between buttons
		$("#buttonArea button").after(" ");
	};
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//create a jquery onlick button that gives us our gifs

$("#buttonArea").on("click", ".btn", function(){
			//remember from class, the $(this).attr("data"); gets the data from what's clicked...
			var thing = $(this).attr("data");
			//below we need to use the queryURL we've been working on the past few days...very familiar
			console.log(thing);
  		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=OcILPYeyOGKLWu6P0Iz7AePmXHPLkGNb&q=" + thing + "&limit=10&offset=0&rating=G&lang=en";
					//My API																				
			//https://api.giphy.com/v1/gifs/search?api_key=OcILPYeyOGKLWu6P0Iz7AePmXHPLkGNb&q=bike fail&limit=10&offset=0&rating=G&lang=en
//our $.ajax call, touched on a lot in class...
  		$.ajax({
  			url: queryURL,
  			method: "GET" 
//the .done method with response...
  		}).done(function(response){
  			console.log(response);
				//create a variable results that will hold our data so we can access it easier 
				//we 
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
          		// a div is dynamically created to hold each of our results
	          	var topicDiv = $("<div>");
				 
							//create <p> to display our ratings and append later
							// Under every gif, display its rating (PG, G, so on).
							//we did this in class today...
	 			var p = $("<p>");
	 			p.text(results[i].rating);
	 			var p = $("<p>").text("Rating: " + results[i].rating);

	 			// add a CSS style to create colored borders around the gifs
	 			//var topicImage = $("<img>").addClass("blackBorder");
								var topicImage = $("<img>");
	 			// add states of animate and still which will be toggled 
	 			topicImage.attr("src", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-animate", results[i].images.fixed_height.url)
	 			topicImage.attr("data-state", "still")
	 			topicImage.addClass("gif");
	 			
	 			// image is appended to the div created in for loop
	 			topicDiv.append(topicImage);
	 			// rating is appended to the div below the gif below (append) image
	 			topicDiv.append(p); 			
	 			// new images will be placed at the beginning (top) of the containing gif area
	 			$("#gifArea").prepend(topicDiv);
 			}
  		})
  })


// When the user clicks one of the still GIPHY images, and it animates. 
//When the user clicks the gif again, it stops playing.
$("#gifArea").on("click", ".gif", function(event){
	//use this to prevent page from reloading and losing data
	event.preventDefault();
	$("#buttonArea").empty();
	// gets the current state of the clicked gif 
	var state = $(this).attr("data-state");
	
	// according to the current state gifs toggle between animate and still 
	//learned this in class on Monday, 3/4/19...refer to class video...
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})
   

// The form takes the value from the input box and adds it into the topics  array. The buttonGenerator function is called that takes each topic in the array remakes the buttons on the page.


$(".submit").on("click", function(event){
	event.preventDefault();

	console.log("submit");
	// sets inputted value to newTopic 
	newTopic = $("#topic-input").val();
	// new topic is added to the topics array 
	topics.push(newTopic);
	console.log(topics);
	// call the function that creates the new button
	buttonGenerator();
});


buttonGenerator();
 