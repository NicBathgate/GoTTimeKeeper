$(document).ready(function(){
	// initialize houses page to be hidden
	$(".houses").hide();

	$(".gamelink").click(toggle_tabs);
	$(".houselink").click(toggle_tabs);

	var elapsed = [];
	interval_ids = new Array();

	$(".button").click(function(event) {
		var button_text = $(this).html().split('<br', 1);
		var house = $.trim(button_text).toLowerCase();
		var running_house;
		var current = $(this).children('.current');
		var total = $(this).children('.total');
		var seconds = get_seconds($('.stopwatch').text());
		elapsed[house] = (seconds > 0) ? seconds : 0;
		
		// stop any other timer that is running first
		for(key in interval_ids) {
			// stop timer
			clearInterval(interval_ids[key]);
			// update total for any buttons that were running
			if(interval_ids[key]){
				var running_house = $.trim(key).toLowerCase();
				var _btn = $(".button." + running_house);
				var _current = $(".current." + running_house);
				var _total = $(".total." + running_house);
				var new_total = Math.floor(get_seconds(_current.text())) + Math.floor(get_seconds(_total.text()));
				_total.text(get_elapsed_time_string(new_total));

				_btn.removeClass("active");
			}
			interval_ids[key] = false;
		}

		// start the timer that was clicked IF not already running
		if(!interval_ids[house] && house != running_house) {
			$(this).addClass("active");

			interval_ids[house] = setInterval(function() {
			  elapsed[house] = elapsed[house] + 1;
			  current.text(get_elapsed_time_string(elapsed[house]));
			}, 1000);
		}

	});

	
	// switch between houses and game tabs
	function toggle_tabs(){
		$(".game").toggle();
		$(".houses").toggle();
		$('.gamelink').parent('dd').toggleClass('active');
		$('.houselink').parent('dd').toggleClass('active');
	}

	// Convert seconds into timecode for display
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

	// Convert display timecode into seconds
	function get_seconds(elapsed_time_string) {
		var time_a = String(elapsed_time_string).split(':');
		return parseInt(time_a[0]*60*60) + parseInt(time_a[1]*60) + parseInt(time_a[2]);
	}

});

/*
	elapsed['baratheon'] = (t_baratheon > 0) ? t_baratheon : 0;
	elapsed['stark'] = (t_stark > 0) ? t_stark : 0;
	elapsed['lannister'] = (t_lannister > 0) ? t_lannister : 0;
	elapsed['martell'] = (t_martell > 0) ? t_martell : 0;
	elapsed['tyrell'] = (t_tyrell > 0) ? t_tyrell : 0;
	elapsed['greyjoy'] = (t_greyjoy > 0) ? t_greyjoy : 0;
	var _StopWatch = new StopWatch();
	var c_baratheon = get_seconds($('.current .baratheon').text());
	var t_baratheon = get_seconds($('.total .baratheon').text());
	var c_stark = get_seconds($('.current .stark').text());
	var t_stark = get_seconds($('.total .stark').text());
	var c_lannister = get_seconds($('.current .lannister').text());
	var t_lannister = get_seconds($('.total .lannister').text());
	var c_martell = get_seconds($('.current .martell').text());
	var t_martell = get_seconds($('.total .martell').text());
	var c_tyrell = get_seconds($('.current .tyrell').text());
	var t_tyrell = get_seconds($('.total .tyrell').text());
	var c_greyjoy = get_seconds($('.current .greyjoy').text());
	var t_greyjoy = get_seconds($('.total .greyjoy').text());
*/