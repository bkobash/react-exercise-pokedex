var React = require('react');
var Reflux = require("reflux");
var PokemonStore = require("../reflux/pokemon-store.jsx");
var PokemonDetailTableRow = require("./PokemonDetailTableRow.jsx");
// var PokemonTypeLozenge = require("./PokemonTypeLozenge.jsx");
// var PokemonMoveLozenge = require("./PokemonMoveLozenge.jsx");

var PokemonDetail = React.createClass({

    mixins: [ Reflux.listenTo(PokemonStore, "handlePokemonStoreChange") ],

    getInitialState: function() {
      return {
        pokemonSelected: {}
      }
    },

    handlePokemonStoreChange: function(e, pokemonList, pokemonSelected) {
      this.setState({ pokemonSelected: pokemonSelected });
    },

    render: function() {

      if (!this.state.pokemonSelected.name) {

        // assume there's no pokemon selected, so just return an empty div
        return (<div></div>);

      } else {

        var detailColumnStyle = {
          padding: 24
        };
        var pokemonDetailImageStyle = {
          margin: "0 auto 0 auto",
          display: "block",
          width: 280,
          height: 280
        };
        var nameStyle = {
          textTransform: "uppercase",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 18
        };
        var detailsTableStyle = {
          width: 240,
          margin: "24px auto",
        }
        var detailsTableCellStyle = {
          padding: "4px 0",
          verticalAlign: "top"
        }
        var detailsTableDataStyle = {
          padding: "4px 0",
          verticalAlign: "top",
          textAlign: "right",
          fontWeight: "bold"
        }

        var image = "http://pokeapi.co/media/img/" + this.state.pokemonSelected.id + ".png";

        return (
          <div style={detailColumnStyle}>
            <img src={image} style={pokemonDetailImageStyle} />
            <div style={nameStyle}>{this.state.pokemonSelected.name}</div>
            <table style={detailsTableStyle}>
              <tbody>
                <PokemonDetailTableRow label="ID" dataValue={this.state.pokemonSelected.id + ""} />
                <PokemonDetailTableRow label="Height" dataValue={this.state.pokemonSelected.height + ""} />
                <PokemonDetailTableRow label="Weight" dataValue={this.state.pokemonSelected.weight + ""} />
                <PokemonDetailTableRow label="Type" dataList={this.state.pokemonSelected.types} />
                <PokemonDetailTableRow label="Moves" dataList={this.state.pokemonSelected.moves} />
              </tbody>
            </table>
          </div>
        );
      }
    }

});

module.exports = PokemonDetail;
