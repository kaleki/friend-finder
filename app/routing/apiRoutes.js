var friends = require('../data/friends.js');






// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req,res){
      var match = {
          name: "",
          photo: "",
          friendDiff: 1000,

      };

      var userInput = req.body;
      var userScore = userInput.scores;
      

      var totalDiff = 0;
      for (var i = 0; i < friends.length; i++){
        totalDiff = 0;

        for (var j = 0; j < friends[i].scores.length; j++){
          
          totalDiff += Math.abs(parseInt(userScore[j]) - parseInt(friends[i].scores[j]));
        }
        if (totalDiff <= match.friendDiff){
            match.name = friends[i].name;
            match.photo = friends[i].photo;
            match.friendDiff = totalDiff;
        }
      }
      
      friends.push(userInput);
      res.json(match);
  })


 
};