
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Library Management trial version',
	  						text:'the list of available options:'});
};