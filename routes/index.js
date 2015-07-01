
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Library Managment trial version',
	  						text:'the list of available options:'});
};