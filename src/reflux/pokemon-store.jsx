var HTTP = require("../services/httpservice");
var Reflux = require("reflux");
var Actions = require("./actions.jsx");

var PokemonStore = Reflux.createStore({

  listenables: [Actions], // things PokemonStore should listen to are in Actions

  pokemonList: [],
  pokemonSelected: {},

  pokemonAlreadyExists: function(id) {
    var exists = false;
    for (var i = 0; i < this.pokemonList.length; i++) {
      if (id == this.pokemonList[i].id) {
        exists = true;
        break;
      }
    }
    return exists;
  },

  getPokemonList: function() { // use the same name ("getPokemon") that's in Actions
    if (!this.pokemonList) {
      this.pokemonList = [];
    }
    HTTP.getLocal()
      .then(function(json) {
        this.pokemonList = json;
        this.fireUpdate();

        for (var id = 1; id < 31; id++) { // just grabbing pokemon IDs 1-30
          if (this.pokemonAlreadyExists(id)) {
            //console.log("Already exists");
          } else {
            HTTP.get(id)
              .then(function(json) {
                this.pokemonList.push(json); // this.pokemon is a local property of PokemonStore
                HTTP.postLocal(json);
                this.fireUpdate();
              }.bind(this)); // have to add bind() to make sure scope for this.setState() is correct
          }
        }

      }.bind(this));

  },

  selectPokemon: function(id) {
    for (var i = 0; i < this.pokemonList.length; i++) {
      if (id == this.pokemonList[i].id) {
        this.pokemonSelected = this.pokemonList[i];
        break;
      }
    }
    this.fireUpdate();
  },

  fireUpdate: function() { // triggered whenever we want to have the data refreshed

    // this.trigger() is reserved keyword in Reflux.
    // following arguments are the data we want to pass back to components that listen for updates
    this.trigger("change", this.pokemonList, this.pokemonSelected);
  }

});

module.exports = PokemonStore;
