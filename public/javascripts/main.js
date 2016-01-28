$(function() {
    
    // var now = moment();
    
//     moment.duration({
//     seconds: 2,
//     minutes: 2,
//     hours: 2,
//     days: 2,
//     weeks: 2,
//     months: 2,
//     years: 2
// });
    
    // console.log(now);

	$('#submit').on('click', function() {
		var _this = $(this);
        
        var timestart = $('#timestartnew').val().split(':').reverse();
        var timestop = $('#timestop').val().split(':').reverse();
        
        var timestartobj = moment.duration({
            seconds: (timestart[0]) ? timestart[0] : 00,
            minutes: (timestart[1]) ? timestart[1] : 00,
            hours: (timestart[2]) ? timestart[2] : 00
        });
        
        var timestopobj = moment.duration({
            seconds: (timestop[0]) ? timestop[0] : 00,
            minutes: (timestop[1]) ? timestop[1] : 00,
            hours: (timestop[2]) ? timestop[2] : 00
        });
        
        var timeStartInSeconds = timestartobj.asSeconds();
        var duration = timestopobj.asSeconds() - timeStartInSeconds;
        
		 _this.prop("disabled",true);
		 $('#resultlink').html('<p>Transcoding running. Link will populate here.</p>');
		$.ajax({
			method: "POST",
			url: "slicefile",
			data: { 
				filename: $('#filename option:selected').val(),
				timestart: timeStartInSeconds,
				duration: duration,
                family: $('#family').val()
			},
			dataType: 'json'
		})
		.error(function(){
			window.alert('There was a problem with the ajax request. Please email iammoen@gmail.com');
		})
		.done(function(response) {
			console.log(response);
			_this.prop("disabled",false);
			if (response.success == true) {
				console.log(response.data);
				$('#resultlink').html('<p>Right click link and choose Save Link As</p><a target="_blank" href="videos/' + response.data +'">' + response.data+ '</a>');
			} else {
				$('#resultlink').html('THERE WAS AN ERROR WITH TRANSCODING. EMAIL iammoen@gmail.com and tell me');
			}
		});
	})
});