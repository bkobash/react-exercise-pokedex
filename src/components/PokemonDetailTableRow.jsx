var React = require('react');
var PokemonTypeLozenge = require("./PokemonTypeLozenge.jsx");
var PokemonMoveLozenge = require("./PokemonMoveLozenge.jsx");

var PokemonDetailTableRow = React.createClass({

    propTypes: {
      label: React.PropTypes.string,
      dataValue: React.PropTypes.string,
      dataList: React.PropTypes.array
    },

    getDefaultProps: function() {
      return {
        label: "",
        dataValue: null,
        dataList: []
      }
    },

    render: function() {

      var detailsTableCellStyle = {
        padding: "4px 0",
        verticalAlign: "top",
        fontSize: 14
      }
      var detailsTableDataStyle = {
        padding: "4px 0",
        verticalAlign: "top",
        textAlign: "right",
        fontWeight: "bold"
      }

      var dataValue;
      if (this.props.label == "Type") {
        dataValue = (<PokemonTypeLozenge types={this.props.dataList.slice(0, 3)} isColored={true} isDetail={true}/>);
      } else if (this.props.label == "Moves") {
        dataValue = (<PokemonMoveLozenge moves={this.props.dataList.slice(0, 3)} />);
      } else {
        dataValue = this.props.dataValue;
      }

      return (
        <tr>
          <td style={detailsTableCellStyle}>{this.props.label}</td>
          <td style={detailsTableDataStyle}>{dataValue}</td>
        </tr>
      );
    }

});

module.exports = PokemonDetailTableRow;
