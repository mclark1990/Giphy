$(document).ready(function(){

    let topics = ["Michael Scott", "Nick Miller", "Dwight Schrute", "Jon Snow", "Walter White",
              "Winston Bishop", "Ron Swanson", "Leslie Knope", "Stewie",];

    let stillImage = "";
    let animateImage = "";

    let createBtn = function(){    
        $("#character-buttons").empty();
        for ( i = 0; i < topics.length; i++){
        let button = $("<button>");
        $(button).text(topics[i]);
        $(button).attr("data-character", topics[i]);
        $(button).addClass("btn btn-primary");
        //$(button).addClass("gif");
        $("#character-buttons").append(button);
        }

    }     


    let submit = function(){
     $("#user-submit").on("click", function() {
      event.preventDefault(); 
          
        //alert("working");
       let userInput = $("#user-input").val();
       //let userSearch = [];
       //for ( i = 0; i < topics.length; i++){
        //topics.push(userInput);
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

        //button.text(userInput);
        //button.addClass("btn btn-default");
        //$("#character-buttons").append(button);
       //} 
    });
    };

    let createGif = function(){
        $(".btn-primary").on("click", function(){
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
                if (results[i].rating !== "r" && results[i].rating !== "pg-13"){

                let stillImage = results[i].images.fixed_width_still.url;
                let animateImage = results[i].images.fixed_width.url;
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
                $("#gifs-div").append(characterDiv);
                }
            };

        
        });

               
        });
        /*$(".gif").on("click", function() {
            alert("working");
            let state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                  } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                      }
                             
            });*/

    };

        $(document).on("click", ".gif", function() {
        //alert("working");
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
              } if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                  }
                         
        });
        

    createBtn();
    submit();
    $(document).on("click", createGif());
});
