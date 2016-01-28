var express = require('express');
var router = express.Router();

var clip = require('../modules/videoclipper');
var filehandler = require('../modules/filehandler');

var auth = require('basic-auth');

/* GET home page. */
router.get('/', function(req, res, next) {

	var user = auth(req);

	console.log(user);
	filehandler.list(user).then(function(rsp){
		res.render('index', { title: user.name.charAt(0).toUpperCase() + user.name.slice(1) + ' Home Video Splicer', 'files': rsp.data, 'family': user.name });
        
	},function(reason) {
		res.render('index', { title: 'There was an error', 'files': [] });
	})
  
});

/* GET home page. */
router.post('/slicefile', function(req, res, next) {
	var filename = req.body.filename,
	timestart = req.body.timestart,
	duration = req.body.duration,
    family = req.body.family;
	
	clip.slice( filename,timestart,duration,family ).then(function( rsp ) {
		res.json(rsp);
	}, function( reason ) {
		res.json(reason);
	})
});

module.exports = router;
