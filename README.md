# react-exercise-pokedex

Yet more tinkering with ReactJS.

### Run
* npm start
* In separate terminal:
  * cd simple-express-server
  * nodemon
* Drag public/index.html into your web browser

### Issues
* PokeAPI is really slow, presumably due to the size of the data coming back.
* PokeAPI limits 300 requests to one IP address per day. So, I ended up creating an express server to cache the API data locally, which speeds things up after the initial load.
