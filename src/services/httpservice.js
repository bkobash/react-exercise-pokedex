var Fetch = require("whatwg-fetch");
var baseUrl = "http://pokeapi.co/api/v2/pokemon/";
var localUrl = "http://localhost:6069";

var service = {
  get: function(id) {
    // this will hit the server, when the server gets a response, do a .then()
    return fetch(baseUrl + id)
            .then(function(response) {
              // response.json ultimately gets returned to whoever called get()
              //console.log("RES: ", response);
              return response.json();
            });
  },
  getLocal: function() {
    return fetch(localUrl + "/pokemon")
            .then(function(response) {
              // response.json ultimately gets returned to whoever called get()
              //console.log("RES: ", response);
              return response.json();
            });
  },
  postLocal: function(pokemon) {
    return fetch(localUrl + "/pokemon", {
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(pokemon)
    }).then(function(response) {
      return response;
    });
  }
}

module.exports = service;
