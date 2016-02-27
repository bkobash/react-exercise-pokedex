var React = require("react");

var PokemonMoveLozenge = React.createClass({

  propTypes: {
    moves: React.PropTypes.array,
    isColored: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      moves: [],
      isColored: false
    }
  },

  render: function() {
    var moveId = 0;
    return (
      <div>{this.props.moves.map(function(move) {
          var moveStyle = {
            fontSize: 12,
            fontWeight: "normal",
            color: "#ffffff",
            marginLeft: 4,
            marginBottom: 4,
            padding: "4px 8px",
            backgroundColor: "#cccccc",
            borderRadius: 2,
            transition: "background-color 0.2s",
            display: "inline-block",
            whiteSpace: "nowrap"
          };
          moveId++;
          return (<span key={moveId} style={moveStyle}>{move.move.name}</span>);
      }.bind(this))}</div>
    );
  }

});

module.exports = PokemonMoveLozenge;
