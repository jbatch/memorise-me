var express = require('express')
var app = express();
var server = require('http').createServer(app);

var port = 3003;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.get('/', function(req, res){
	res.sendFile('public/index.html', {root: __dirname});
});

server.listen(port, function(){
	console.log('listening on port ' + port)
});
