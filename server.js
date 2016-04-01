var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use (bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var Gpio = require('onoff').Gpio;
var leds = [new Gpio(12, 'out'), 
	new Gpio(16, 'out'),
	new Gpio(6, 'out'),
	new Gpio(13, 'out')]

app.get('/', function (req, res) {
	res.render('test_page.html');
	console.log('got a request!!');
	for (var i = 0; i< 4; i++){
		leds[i].write(0);
	}
	console.log('done writing!!')
});

app.get('/ng', function (req, res) {
	res.sendfile('./public/index.html');
	console.log('sending index!!')
});

app.get('/clockApp.js', function (req, res) {
	res.sendfile('./public/clockApp.js');
	console.log('sending js!!')
});


app.get('/on', function (req, res) {
	res.send('Hello Abba!');
	console.log('got a request!!');
	for (var i = 0; i< 4; i++){
		leds[i].write(1);
	}
	console.log('done writing!!')
});

app.post('/lights', function(req, res) {
	console.log(req.body);
	if(req.body["light_val"]){
		leds[req.body["light_id"]].writeSync(1);
	}else{
		leds[req.body["light_id"]].writeSync(0);
	}
	console.log("done");
	res.send("success");
});


app.listen(3000, function (){
	console.log('Example app listening on port 3000!')

});