
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log('index is runninng');
  res.render('index', { title: 'Library Managment trial version',
	  						text:'the list of available options:'});
};