var fs = require('fs');
var Q = require('q');
var config = require('./config.js');


function list() {
  var deferred = Q.defer();
  
  fs.readdir(config.pathToOriginals, function(err, files) {

    if ( err ) {
      deferred.reject( {'success': false, 'msg': 'error with reading folder', 'err': err } );
    }

    if (files == undefined) {
        deferred.reject( {'success': false, 'msg': 'no files found in directory' } );
    } else {
        deferred.resolve( {
            'success': true,
            'msg': 'video folder read correctly',
            'data': files.filter(function(file) { return file.substr(-4) === '.mp4'; })
        })
    }
  })


  return deferred.promise;
}

function checkIfFileExists(filename, callback) {
  fs.stat(__dirname + '/../public/videos/' + filename, function(err, stat) {
    if(err == null) {
      callback(true);
    } else {
      callback(false);
    }
  })
}


module.exports = {
    list: list,
    checkIfFileExists: checkIfFileExists
};