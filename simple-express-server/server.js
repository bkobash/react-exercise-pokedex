var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser({limit: '5mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var pokemonList = [];

app.get('/pokemon', function(req, res) {
    res.send(pokemonList);
});

app.post('/pokemon', function(req, res) {
    var pokemon = req.body;
    console.log(req.body);
    pokemonList.push(pokemon);
    res.status(200).send("Successfully posted pokemon");
});

app.listen(6069);
