var http = require('http')
  , faye = require('faye');
 
var Logger = {
	incoming: function(message, callback) {
		console.log(message);
		console.log('====================');
 
		callback(message);
	}
};
 
 var server = http.createServer(function(request, response) {
 response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : 'http://localhost:9090'});
  response.write('Hello, non-Bayeux request');  
  response.end();
});
 
var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 60});
bayeux.addExtension(Logger);
bayeux.attach(server);
bayeux.listen(4567);
console.log('Server is running on', '127.0.0.1', ':', 4567);