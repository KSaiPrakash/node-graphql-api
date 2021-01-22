// const { ApolloServer } = require('apollo-server');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema/schema');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/** The ApolloServer constructor requires two parameters: your schema
    definition and your set of resolvers. */
const server = new ApolloServer({ typeDefs, resolvers });

/** add middleware to apollo server  */
server.applyMiddleware({app})
/** add middleware  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/** adding cors to all incoming requests from client */
app.use(cors());

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.use((req, res) => {
  res.status(200);
  res.send('Hello!');
  res.end();
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  /** handle specific listen errors with friendly messages */
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**  The `listen` method launches a web server. */
app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
)
app.on('error', onError);
app.on('listening', onListening);
