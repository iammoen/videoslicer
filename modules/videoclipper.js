var Q = require('q');
var ffmpeg = require('fluent-ffmpeg');
var path = require('path');
var config = require('./config.js');

var filehandler = require('./filehandler.js');


function slice(filename,timestart,duration,family) {
  var deferred = Q.defer();
  var filepath = config.pathToOriginals[family],
  fileExt = path.extname(filename),
  filenameNoExt = filename.substr(0, filename.lastIndexOf('.')),
  newfilename = filenameNoExt + '_' + timestart + '-' + duration + 's' + fileExt;
  
  filehandler.checkIfFileExists(newfilename, function(rsp) {
    if (rsp == true) {
      // file exists, return path
      deferred.resolve( {'success': true, 'msg': 'file already exists, no transcoding necessary', 'data': newfilename} );
    } else {
      // file doesn't yet exists. Create with ffmpeg and deliver link
      var command = ffmpeg()
        .input(filepath + filenameNoExt + fileExt)
        .seekInput(timestart)
        .inputOptions([
          '-t ' + duration
        ])
        .output(__dirname + '/../public/videos/' + newfilename)
        .on('start', function(commandLine) {
          console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('codecData', function(data) {
          console.log('Input is ' + data.audio + ' audio ' +
            'with ' + data.video + ' video');
        })
        .on('progress', function(progress) {
          console.log('Processing: ' + progress.percent + '% done');
        })
        .on('error', function(err, stdout, stderr) {
          console.log('Cannot process video: ' + err.message);
          deferred.reject( {'success': false, 'msg': 'error with reading file', 'err': 'err' } );
        })
        .on('end', function() {
          console.log('Transcoding succeeded !');
          deferred.resolve( {'success': true, 'msg': 'transcoding successful', 'data': newfilename} );
        })
        .run();
    }
  });
  
  return deferred.promise;
}


module.exports = {
	slice: slice
};