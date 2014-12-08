var http = require('http');
var sockjs = require('sockjs');

var connections = [];

var chat = sockjs.createServer();
chat.on('connection', function(conn) {
  connections.push(conn);
  var number = connections.length;
  conn.write(JSON.stringify({ 'type' : 'Welcome',
                              'user' :  number,
                              'message': 'Welcome to Ideapad'}));

  conn.on('data', function(message) {
    for (var ii=0; ii < connections.length; ii++) {
      connections[ii].write(JSON.stringify({ 'user' : number,
                                           'message': message}));
    }
  });
  conn.on('close', function() {
    for (var ii=0; ii < connections.length; ii++) {
    //  connections[ii].write("User " + number + " has disconnected");
    }
  });
});

var server = http.createServer();
chat.installHandlers(server, {prefix:'/chat'});
server.listen(9000, '0.0.0.0');
