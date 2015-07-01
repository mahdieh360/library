// get all books
exports.bookList = function(req, res){
var db=req.db;	
db.query('select * from tbl_book join tbl_author on tbl_book.authId=tbl_author.authorId join tbl_publisher on tbl_book.pubId=tbl_publisher.publisherId', function(err, results, fields) {
		  if (err) throw err;
		  res.render('book', { title: 'BOOKS',
              books: results});		  
		//  console.log({ title: 'BOOKS',
           //            books: results});
		});

};

// fetch book by name
exports.bookByName = function(req, res){
	var db=req.db;	
	var bookTitle = req.param("title");
	var query= 'select * from tbl_book join tbl_author on tbl_book.authId=tbl_author.authorId join tbl_publisher on tbl_book.pubId=tbl_publisher.publisherId where title= "'+ bookTitle +'";';
	db.query(query, function(err, results, fields) {
			  if (err) throw err;
			  res.render('book_details', { title:bookTitle,
				                          bookDetails: results[0]});
			  
			 // console.log( results);
			});

	};
	
	
// add book 
exports.addBook = function(req, res){
	var db=req.db;	
	var bookName = req.body.bookname;
	var authId = req.body.authorId;//
	var pubId = req.body.publisherId;//
	console.log(req.body);
	var query= 'insert into tbl_book (title, authId, pubId) values ("'+bookName+ '",'+authId + ',' + pubId +');';
	db.query(query, function(err, results, fields) {
			  if (err) {
		            // If it failed, return error
		            res.send("There was a problem adding the information to the database.");
		        }
		        else {
		            // And forward to success page
		            res.redirect("books");
		        }
			});
	
};

//delete book 
exports.deleteBook = function(req, res){
	
	var db=req.db;	
	var bookId = req.param("bookId");
	var query= 'delete from tbl_book where bookId='+bookId+';';
	db.query(query, function(err, results, fields) {
			  if (err) {
		            // If it failed, return error
		            res.send("There was a problem adding the information to the database.");
		        }else {
		            // And forward to success page
		          //  res.redirect("authors");
		        }
			});
}
	
	
	
	
	
