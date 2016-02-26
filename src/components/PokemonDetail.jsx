var React = require('react');
var Reflux = require("reflux");
var _ = require('underscore');
var Actions = require("../reflux/actions.jsx");
var PokemonStore = require("../reflux/pokemon-store.jsx");
var PokemonTypeLozenge = require("./PokemonTypeLozenge.jsx");
var PokemonMoveLozenge = require("./PokemonMoveLozenge.jsx");

var PokemonDetail = React.createClass({

    mixins: [ Reflux.listenTo(PokemonStore, "onChangePokemon") ],

    getInitialState: function() {
      return {
        pokemonSelected: {}
      }
    },

    onChangePokemon: function(event, pokemonList, pokemonSelected) {
      // ingredients: data we got back from the store
      this.setState({ pokemonSelected: pokemonSelected });
      //console.log(pokemonDetail);
    },

    render: function() {

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
        textAlign: "center"
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

      if (!this.state.pokemonSelected.name) {

        // assume there's no pokemon selected, so just return an empty div
        return (<div></div>);

      } else {

        var name = this.state.pokemonSelected.name || "",
            pokemonId = this.state.pokemonSelected.id || "",
            height = this.state.pokemonSelected.height || "",
            weight = this.state.pokemonSelected.weight || "",
            species = (this.state.pokemonSelected.species && this.state.pokemonSelected.species.name) ? this.state.pokemonSelected.species.name : "",
            types = this.state.pokemonSelected.types || [],
            moves = this.state.pokemonSelected.moves ? this.state.pokemonSelected.moves.slice(0, 3) : [];

        return (
          <div style={detailColumnStyle}>
            <img src={"http://pokeapi.co/media/img/" + this.state.pokemonSelected.id + ".png"} style={pokemonDetailImageStyle} />
            <div style={nameStyle}>{this.state.pokemonSelected.name}</div>
            <table style={detailsTableStyle}>
              <tbody>
              <tr>
                <td style={detailsTableCellStyle}>ID</td>
                <td style={detailsTableDataStyle}>{pokemonId}</td>
              </tr>
                <tr>
                  <td style={detailsTableCellStyle}>Height</td>
                  <td style={detailsTableDataStyle}>{height}</td>
                </tr>
                <tr>
                  <td style={detailsTableCellStyle}>Weight</td>
                  <td style={detailsTableDataStyle}>{weight}</td>
                </tr>
                <tr>
                  <td style={detailsTableCellStyle}>Type</td>
                  <td style={detailsTableDataStyle}><PokemonTypeLozenge types={types} isColored={true} isDetail={true}/></td>
                </tr>
                <tr>
                  <td style={detailsTableCellStyle}>Moves</td>
                  <td style={detailsTableDataStyle}><PokemonMoveLozenge moves={moves} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    }

});

module.exports = PokemonDetail;
