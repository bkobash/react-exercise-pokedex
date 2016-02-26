var React = require("react");
var Reflux = require("reflux");
var Actions = require("../reflux/actions.jsx");
var PokemonStore = require("../reflux/pokemon-store.jsx");
var PokemonTypeLozenge = require("./PokemonTypeLozenge.jsx");

var PokemonListItem = React.createClass({

  mixins: [ Reflux.listenTo(PokemonStore, "onChangePokemon") ],

  propTypes: {
    pokemonId: React.PropTypes.number,
    name: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      pokemonId: 0,
      name: "asdf"
    }
  },

  getInitialState: function() {
    return {
      hover: false,
      pokemonSelected: {}
    }
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

  onChangePokemon: function(event, pokemonList, pokemonSelected) {
    this.setState({ pokemonSelected: pokemonSelected });
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
      borderBottom: "solid 1px #999999",
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
      transition: "filter 0.2s, -webkit-filter 0.2s"
    }
    var nameStyle = {
      fontSize: 12,
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 4
    };
    var idStyle = {
      color: "#999999"
    };
    var coloredLozenges = false;

    if (this.state.hover || (this.props.pokemonId == this.state.pokemonSelected.id)) {
      gridItemStyle.color = "#000000";
      pokemonListImageStyle.filter = "grayscale(0%)";
      pokemonListImageStyle.WebkitFilter = "grayscale(0%)";
      coloredLozenges = true;
    }

    if (this.props.pokemonId == this.state.pokemonSelected.id) {
      gridItemStyle.borderBottom = "solid 2px #000000";
    }

    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick} style={gridItemStyle}>
        <img src={"http://pokeapi.co/media/img/" + this.props.pokemonId + ".png"} style={pokemonListImageStyle} />
        <div style={nameStyle}><span style={idStyle}>#{this.props.pokemonId}</span> {this.props.name}</div>
        <PokemonTypeLozenge types={this.props.types} isColored={coloredLozenges}/>
      </div>
    );
  }

});

module.exports = PokemonListItem;
