var express = require('express');
var router = express.Router();

var clip = require('../modules/videoclipper');
var filehandler = require('../modules/filehandler');

var auth = require('basic-auth');

/* GET home page. */
router.get('/', function(req, res, next) {
	// var user = auth(req);

	filehandler.list().then(function(rsp){
		res.render('index', { title: 'Moen Home Video Splicer', 'files': rsp.data });
	},function(reason) {
		res.render('index', { title: 'There was an error', 'files': [] });
	})
  
});

/* GET home page. */
router.post('/slicefile', function(req, res, next) {
	var filename = req.body.filename,
	timestart = req.body.timestart,
	duration = req.body.duration;
	
	clip.slice( filename,timestart,duration ).then(function( rsp ) {
		res.json(rsp);
	}, function( reason ) {
		res.json(reason);
	})
});

module.exports = router;
