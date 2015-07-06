//get all authors
exports.authorList = function(req, res){
var db=req.db;	
db.query('select * from tbl_author;', function(err, authorResults, fields) {
		  if (err) throw err;
		  res.render('authorView', { title: 'AUTHORS',
                                     authorsData: authorResults
                                     }
                     );
		  
		  //console.log({ title: 'BOOKS',
                        //books: results});
		});

};

// fetch author by name
exports.authorByName = function(req, res){
	var db=req.db;	
	var authname = req.param("authorName");
	console.log(authname);
	
	var query= 'select * from tbl_book join tbl_author on tbl_book.authId=tbl_author.authorId join tbl_publisher on tbl_book.pubId=tbl_publisher.publisherId where authorName= "'+ authname +'";';
	db.query(query, function(err, results, fields) {
			  if (err) throw err;
			 
			  res.render('author_details', { authorName:authname,
				                          authorDetails: results});

			  console.log(results);
			});

	};
	
	
// add Author
exports.addAuthor= function(req,res) {
	var db=req.db;	
	var authorName = req.body.authorName;
	var query= 'insert into tbl_author (authorName) values ("'+authorName +'");';
	db.query(query, function(err, results, fields) {
			  if (err) {
		            // If it failed, return error
		            res.send("There was a problem adding the information to the database.");
		        }
		        else {
		            // And forward to success page
		            res.redirect("authors");
		        }
			});
};

//delete Author
exports.deleteAuthor = function(req, res){
	var db=req.db;
	var authorId = req.param("authorId");
	console.log(authorId);
	var query= 'delete from tbl_author where authorId='+authorId+';';
	db.query(query, function(err, results, fields) {
			  if (err) {
		            // If it failed, return error
		            res.send("There was a problem deleting the information from the database.");
		        }else {
		            // And forward to success page
		            console.log('success');
		            res.send("Success");
		        }
			});
}
