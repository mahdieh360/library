
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , book =require('./routes/book')
  , author =require('./routes/author')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql');
//SQL

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'library'
});

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//Make our db accessible to our router
app.use(function(req, res, next){
	req.db=db;
	next();
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));




db.connect();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/books', book.bookList);
app.get('/books/:title', book.bookByName);
app.post('/addbook', book.addBook);
app.delete('/books/:bookId', book.deleteBook);
app.get('/authors', author.authorList);
app.get('/authors/:authorName', author.authorByName);
//app.post('/addauthor', author.addAuthor);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
