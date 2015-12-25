# HapiJS + React + Redux starter

This is a real world(-ish) example todo app, build with:
* HapiJS
* React
* Redux
* Sequelize
* es6
* Webpack
* Babel
* Mocha + Chai + Sinon

### [Live demo](http://rkovacevic-todo.herokuapp.com/)

Usage
----

Install [Node.js](http://nodejs.org/)

### Clone and setup:
```
git clone https://github.com/rkovacevic/hapijs-starter
cd hapijs-starter
npm install
```

Start the HapiJS Server in dev mode:
```
npm run dev
```

Point your browser to `http://localhost:3000`

### Testing

To run unit tests:
```
npm run test
```
or to run tests on any file changes:
```
npm run test:watch
```
To run lint:
```
npm run lint
```

Notes
----
* It's only using babel for ES6, which is standard at this time. No ES7 gimicks.
* Tests are located next to the file they're testing, for ease of access.
* React app directory structure is organized per component / page.

License
----

MIT
