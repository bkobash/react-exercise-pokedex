var React = require('react');
var Reflux = require("reflux");
var _ = require('underscore');
var Actions = require("../reflux/actions.jsx");
var PokemonStore = require("../reflux/pokemon-store.jsx");
var PokemonListItem = require("./PokemonListItem.jsx");

var PokemonList = React.createClass({

    mixins: [ Reflux.listenTo(PokemonStore, "onChangePokemon") ],

    getInitialState: function() {
      return {
        pokemonList: [],
        pokemonSort: "id-lowest",
        searchValue: ""
      }
    },

    pokemonList: [], // local pokemon list to filter, etc.

    componentWillMount: function() {
      Actions.getPokemonList();
    },

    onChangePokemon: function(event, pokemonList, pokemonSelected) {
      this.setState({ pokemonList: pokemonList });
      //console.log(pokemonSelected);
    },

    onSortPokemon: function(e) {
      this.setState({ pokemonSort: e.target.dataset.sortby });
    },

    onSearchPokemon: function(e) {
      this.setState({ searchValue: e.target.value });
    },

    onRandomPokemon: function(e) {
      var randomPokemon = this.pokemonList[Math.floor(Math.random() * this.pokemonList.length)].id;
      Actions.selectPokemon(randomPokemon);
    },

    render: function() {

        this.pokemonList = this.state.pokemonList;

        // sort the pokemon list
        switch (this.state.pokemonSort) {
          case "alpha-az":
            this.pokemonList = _.sortBy(this.pokemonList, "name");
            break;
          case "alpha-za":
            this.pokemonList = _.sortBy(this.pokemonList, "name").reverse();
            break;
          case "id-lowest":
            this.pokemonList = _.sortBy(this.pokemonList, "id");
            break;
          case "id-highest":
            this.pokemonList = _.sortBy(this.pokemonList, "id").reverse();
            break;
        }

        // filter the pokemon list down
        this.pokemonList = _.filter(this.pokemonList, function(item) {
          return item.name.substr(0, this.state.searchValue.length) == this.state.searchValue;
        }.bind(this));

        var columnHeaderStyle = {
          backgroundColor: "#ffffff",
          borderBottom: "solid 1px #cccccc",
          padding: "16px 0",
          marginRight: 32
        };
        var gridContainerStyle = {
          position: "absolute",
          top: 66,
          bottom: 0,
          width: 640,
          padding: "32px 0",
          overflow: "auto"
        };
        var searchBoxStyle = {
          float: "right"
        }
        var randomButtonStyle = {
          marginLeft: 8
        }

        var listItems = this.pokemonList.map(function(item) {
            return (<PokemonListItem key={item.id} pokemonId={item.id} name={item.name} types={item.types} />);
        });

        return (
          <div>
            <div style={columnHeaderStyle} className="form-inline">
              <input type="text" className="form-control" style={searchBoxStyle} placeholder="Search" value={this.state.searchValue} onChange={this.onSearchPokemon} />
              <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#" data-sortby="alpha-az" onClick={this.onSortPokemon}>Alphabetical A-Z</a></li>
                  <li><a href="#" data-sortby="alpha-za" onClick={this.onSortPokemon}>Alphabetical Z-A</a></li>
                  <li><a href="#" data-sortby="id-lowest" onClick={this.onSortPokemon}>Lowest Number First</a></li>
                  <li><a href="#" data-sortby="id-highest" onClick={this.onSortPokemon}>Highest Number First</a></li>
                </ul>
              </div>
              <div className="btn-group" style={randomButtonStyle}>
                <button type="button" className="btn btn-default" onClick={this.onRandomPokemon}>
                  Random
                </button>
              </div>
            </div>
            <div style={gridContainerStyle}>
              {listItems}
            </div>
          </div>
        );
    }

});

module.exports = PokemonList;
