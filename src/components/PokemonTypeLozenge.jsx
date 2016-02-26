var React = require("react");

var PokemonTypeLozenge = React.createClass({

  propTypes: {
    types: React.PropTypes.array,
    isColored: React.PropTypes.bool,
    isDetail: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      types: [],
      isColored: false,
      isDetail: false
    }
  },

  render: function() {

    return (
      <div>{this.props.types.map(function(type) {
          var typeStyle = {
            fontSize: 12,
            color: "#ffffff",
            marginRight: 4,
            marginLeft: 0,
            padding: "4px 8px",
            backgroundColor: "#cccccc",
            borderRadius: 2,
            transition: "background-color 0.2s"
          };
          if (this.props.isColored) {
            switch(type.type.name) {
              case "grass":
                typeStyle.backgroundColor = "#9bcc50";
                break;
              case "poison":
                typeStyle.backgroundColor = "#b97fc9";
                break;
              case "fire":
                typeStyle.backgroundColor = "#fd7d24";
                break;
              case "flying":
                typeStyle.backgroundColor = "#3dc7ef";
                break;
              case "water":
                typeStyle.backgroundColor = "#4592c4";
                break;
              case "bug":
                typeStyle.backgroundColor = "#739e45";
                break;
              case "normal":
                typeStyle.backgroundColor = "#a4acaf";
                break;
              case "electric":
                typeStyle.backgroundColor = "#edd447";
                break;
              case "ground":
                typeStyle.backgroundColor = "#aa974a";
                break;
            }
          }
          if (this.props.isDetail) {
            typeStyle.marginRight = 0;
            typeStyle.marginLeft = 4;
          }
          return (<span key={type.type.name} style={typeStyle}>{type.type.name}</span>);
      }.bind(this))}</div>
    );
  }

});

module.exports = PokemonTypeLozenge;
