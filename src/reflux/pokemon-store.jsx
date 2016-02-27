var HTTP = require("../services/httpservice");
var Reflux = require("reflux");
var Actions = require("./actions.jsx");

var PokemonStore = Reflux.createStore({

  listenables: [Actions], // things PokemonStore should listen to are in Actions

  pokemonList: [],
  pokemonSelected: {},

  pokemonAlreadyExists: function(id) {
    for (var i = 0; i < this.pokemonList.length; i++) {
      if (id == this.pokemonList[i].id) {
        return true;
        break;
      }
    }
    return false;
  },

  getPokemonList: function(pokemonLimit) { // use the same name ("getPokemonList") that's in Actions
    if (!this.pokemonList) {
      this.pokemonList = [];
    }
    HTTP.getLocal()
      .then(function(json) {

        // first, grab all the pokemon that's already on the express server
        this.pokemonList = json.slice(0, pokemonLimit);
        this.fireUpdate();

        // then, find any pokemon that's left
        for (var id = 1; id <= pokemonLimit; id++) {
          if (!this.pokemonAlreadyExists(id)) {
            // only call pokeapi if it's not on the express server
            HTTP.get(id)
              .then(function(json) {
                this.pokemonList.push(json); // add this pokemon JSON to the PokemonStore, so it can be used immediately
                HTTP.postLocal(json); // add this pokemon JSON to the express server, so it can be fetched quickly later
                this.fireUpdate();
              }.bind(this));
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

  fireUpdate: function() {
    // this.trigger() is reserved keyword in Reflux.
    // following arguments are the data we want to pass back to components that listen for updates
    this.trigger("change", this.pokemonList, this.pokemonSelected);
  }

});

module.exports = PokemonStore;
