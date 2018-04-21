$(document).ready(function(){
    //set variables
    let topics = ["Michael Scott", "Nick Miller", "Dwight Schrute", "Jon Snow", "Walter White",
              "Winston Bishop", "Ron Swanson", "Leslie Knope", "Stewie",];

    let stillImage = "";
    let animateImage = "";
    
    //function to create buttons
    let createBtn = function(){    
        $("#character-buttons").empty();
        for ( i = 0; i < topics.length; i++){
            let button = $("<button>");
            $(button).text(topics[i]);
            $(button).attr("data-character", topics[i]);
            $(button).addClass("btn btn-primary");
            $("#character-buttons").append(button);
        }

    }     

    //function for subimt button, also prevents user from entering in the same name and entering a blank
    let submit = function(){
     
        $("#user-submit").on("click", function() {
      event.preventDefault(); 
          
       let userInput = $("#user-input").val();
        
       if (userInput === ""){
            return false;
          }
        if (topics.includes(userInput)){
            return false;
        }  
          else {
           topics.push(userInput);
          }
        createBtn();
        createGif();
        console.log(topics);

        });
    };
        //function for on click to create the gifs
        $(document).on("click", ".btn-primary", function(){
            event.preventDefault()
            $("#gifs-div").empty()
            let character = $(this).attr("data-character");
            let apikey = "ie2JqShoMvOoMubSVC804f1XIXieGCBg"    
            let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character 
            + "&api_key=" + apikey + "&limit=10";
        
            $.ajax({
                url: queryURL,
                method: "GET"
            })
        
            .then(function(response) {
                console.log(queryURL);
                console.log(response);
        
                let results = response.data;
                for (var i = 0; i < results.length; i++) {
                    console.log(`result ${i} ----`);
                    console.log(results[i]);
                    

                    let stillImage = results[i].images.fixed_height_still.url;
                    let animateImage = results[i].images.fixed_height.url;
                    let characterDiv = $("<div>");
        
                    let p = $("<p>").text("Rating: " + results[i].rating).addClass("rating");
        
                    let characterImage = $("<img>");
                    characterImage.attr("src", stillImage);
                    characterImage.attr("data-still", stillImage)
                    characterImage.attr("data-animate", animateImage);
                    characterImage.attr("data-state", "still")
                    characterImage.addClass("gif");
                    
                    characterDiv.addClass("img-div");
                    characterDiv.append(p);
                    characterDiv.append(characterImage);
                    console.log(`${i} === `);
                    console.log(characterDiv);
                    $("#gifs-div").append(characterDiv);
                    
                };

            
            });
    });
        //function for on clicking the gif to change from still to animate and back to still.
        $(document).on("click", ".gif", function() {
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
              } if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                  }
                         
        });
        
    //call for createBtn and submit function
    createBtn();
    submit();
});
