const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log  = req.method + req.url
	console.log(now);
	console.log(log);
	fs.appendFile('server.log', log + '\r\n', (err) => {
     if(err) {
      console.log(err);
	 }	 
})
	next();
});












app.get('/', (req, res) => {
	res.send('<h1>hello express</h1>');
});
app.get('/json', (req, res) => {
	res.send({
		name: 'Mohamad',
		likes: ['memo']
	});
});
app.get('/home', (req, res) => {
	res.render('home.hbs', {
		welcomeTitle: ' hi yooo',
		current: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
res.render('about.hbs', {
pageTitle: 'About Page',
current: new Date().getFullYear()
});
}); 

app.listen(port, () => {console.log('hello ' + port)});