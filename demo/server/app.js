var ws_server = require('ws').Server,
	wss = new ws_server({
		port:8001
	});
wss.on('connection', function(ws){
	console.log('client connected');
	ws.on('message', function(msg){
		console.log(msg);
	})
})