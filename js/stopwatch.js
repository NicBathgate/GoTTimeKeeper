
$(document).ready(function(){  

	function StopWatch() {

		var startTime = null; 
		var stopTime = null; 
		var running = false; 

		this.running = function(){
			return running;
		}

		function getTime() {
			var day = new Date();
			return day.getTime();
		}

		this.start = function(){ 
			if (running == true)
			    return;
			else if (startTime != null) 
			    stopTime = null; 

			running = true;    
			startTime = getTime();
		}

		this.stop = function(){ 
			if (running == false)
			    return;    

			stopTime = getTime();
			running = false; 
		}

		this.duration = function(){
			if(startTime == null || stopTime == null)
			   return null;
			else  
			   return (stopTime - startTime) / 1000;
		}

	}

	function get_elapsed_time_string(total_seconds) {
		function pretty_time_string(num) {
		return ( num < 10 ? "0" : "" ) + num;
		}

		var hours = Math.floor(total_seconds / 3600);
		total_seconds = total_seconds % 3600;

		var minutes = Math.floor(total_seconds / 60);
		total_seconds = total_seconds % 60;

		var seconds = Math.floor(total_seconds);

		// Pad the minutes and seconds with leading zeros, if required
		hours = pretty_time_string(hours);
		minutes = pretty_time_string(minutes);
		seconds = pretty_time_string(seconds);

		// Compose the string for display
		var currentTimeString = hours + ":" + minutes + ":" + seconds;

		return currentTimeString;
	}

	function get_seconds(string) {
		var time_a = String(string).split(':');
		return time_a[0]*60*60 + time_a[1]*60 + time_a[2];
	}

	var _StopWatch = new StopWatch();

	var interval_id = null;
	var seconds = get_seconds($('.stopwatch').text());
	if(seconds > 0)	var elapsed_seconds = seconds;
	else var elapsed_seconds = 0;
	$(".start").click(function(event) {
		if(_StopWatch.running()){
			_StopWatch.stop();
			clearInterval(interval_id);
			$(".start").removeClass("illuminate");
			$(".mstopwatch").html(_StopWatch.duration());
		} else {
			_StopWatch.start();
			$(".start").addClass("illuminate");
			interval_id = setInterval(function() {
			  elapsed_seconds = elapsed_seconds + 1;
			  $('.stopwatch').text(get_elapsed_time_string(elapsed_seconds));
			}, 1000);
		}
	});

	//_StopWatch.stop();

});
