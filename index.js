var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path')

app.set('port', 3333)
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index')
})

var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'))
  console.log("Server is running on " + (process.env.NODE_ENV || "development") + " mode")
});
