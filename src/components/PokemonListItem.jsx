var React = require("react");
var Reflux = require("reflux");
var Actions = require("../reflux/actions.jsx");
var PokemonStore = require("../reflux/pokemon-store.jsx");
var PokemonTypeLozenge = require("./PokemonTypeLozenge.jsx");

var PokemonListItem = React.createClass({

  mixins: [ Reflux.listenTo(PokemonStore, "handlePokemonStoreChange") ],

  propTypes: {
    pokemonId: React.PropTypes.number,
    name: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      pokemonId: 0,
      name: "-"
    }
  },

  getInitialState: function() {
    return {
      hover: false,
      pokemonSelected: {}
    }
  },

  handlePokemonStoreChange: function(e, pokemonList, pokemonSelected) {
    this.setState({ pokemonSelected: pokemonSelected });
  },

  onClick: function() {
    Actions.selectPokemon(this.props.pokemonId);
  },

  onMouseEnter: function() {
    this.setState({ hover: true });
  },

  onMouseLeave: function() {
    this.setState({ hover: false });
  },

  render: function() {

    var gridItemStyle = {
      position: "relative",
      width: 180,
      height: 180,
      boxSizing: "border-box",
      float: "left",
      marginRight: 16,
      marginBottom: 32,
      textAlign: "left",
      paddingTop: 120,
      borderBottom: "solid 1px #ffffff",
      color: "#808080",
      cursor: "pointer"
    };
    var pokemonListImageStyle = {
      position: "absolute",
      top: 0,
      left: 30,
      width: 120,
      height: 120,
      filter: "grayscale(100%)",
      WebkitFilter: "grayscale(100%)",
      transition: "filter 0.4s, -webkit-filter 0.4s"
    }
    var nameStyle = {
      fontSize: 13,
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 4
    };
    var idStyle = {
      color: "#999999"
    };

    var coloredLozenges = false;
    var isSelected = this.props.pokemonId === this.state.pokemonSelected.id;
    var image = "http://pokeapi.co/media/img/" + this.props.pokemonId + ".png";

    // This list item has been moused over or selected
    if (this.state.hover || isSelected) {
      gridItemStyle.color = "#000000";
      pokemonListImageStyle.filter = "grayscale(0%)";
      pokemonListImageStyle.WebkitFilter = "grayscale(0%)";
      coloredLozenges = true;
    }

    // Add a bar at the bottom if the item has been selected
    if (isSelected) {
      gridItemStyle.borderBottom = "solid 2px #000000";
    }

    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick} style={gridItemStyle}>
        <img src={image} style={pokemonListImageStyle} />
        <div style={nameStyle}>
          <span style={idStyle}>#{this.props.pokemonId}</span> {this.props.name}
        </div>
        <PokemonTypeLozenge types={this.props.types} isColored={coloredLozenges}/>
      </div>
    );
  }

});

module.exports = PokemonListItem;
