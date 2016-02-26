var React = require('react');
var ReactDOM = require('react-dom');
var PokemonList = require('./components/PokemonList.jsx');
var PokemonDetail = require('./components/PokemonDetail.jsx');

ReactDOM.render(<PokemonList />, document.getElementById('pokemon_list'));
ReactDOM.render(<PokemonDetail />, document.getElementById('pokemon_detail'));
