$(function() {

	$('#submit').on('click', function() {
		var _this = $(this);
		 _this.prop("disabled",true);
		 $('#resultlink').html('<p>Transcoding running. Link will populate here.</p>');
		$.ajax({
			method: "POST",
			url: "slicefile",
			data: { 
				filename: $('#filename option:selected').val(),
				timestart: $('#timestart').val(),
				duration: $('#duration').val()
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