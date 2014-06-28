$(document).ready(function(){
	intro();
	// abtMeStatic();
});

// function abtMeStatic() {
// 	$('#wrapper').fadeOut( "slow", function() {
//     // Animation complete.
//   	});
// 	$('#container').fadeIn( "slow", function() {
// 	// Animation complete.	
// 	});
	
// 	// $('body').remove($('nav'));
// 	// $('body').remove($('.settings'));
// 	// $('body').remove($('#wrapper'));
// 	// $('#container').removeClass('invisible').addClass('visible');
// }

function intro() {
/* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */
	$.fn.scrollPath("getPath")
		// Move to 'start' element
		.moveTo(400, 50, {name: "start"})
		// Line to 'non-linear' element
		.lineTo(400, 800, {name: "non-linear"})
		// Arc down and line to 'possible'
		.arc(200, 1200, 400, -Math.PI/2, Math.PI/2, true)
		.lineTo(600, 1600, {
			callback: function() {
				highlight($(".settings"));
			},
			name: "possible"
		})
		// Continue line to 'language'
		.lineTo(1750, 1600, {
			callback: function() {
				highlight($(".sp-scroll-handle"));
			},
			name: "language"
		})
		// Arc up while rotating
		.arc(1800, 1000, 600, Math.PI/2, 0, true, {rotate: Math.PI/2 })
		// Line to 'curious'
		.lineTo(2400, 750, {
			name: "curious"
		})
		// Rotate in place
		// .rotate(3*Math.PI/2, {
		// 	name: "rotations-rotated"
		// })

		// Continue upwards to 'creativity'
		.lineTo(2400, -700, {
			name: "creativity"
		})
		// Small arc downwards
		.arc(2250, -700, 150, 0, -Math.PI/2, true)

		//Line to 'character'
		.lineTo(1350, -850, {
			name: "character"
		})
		// Arc and rotate back to the beginning.
		.arc(1300, 50, 900, -Math.PI/2, -Math.PI, true, {rotate: Math.PI*2, name: "end"});

	// We're done with the path, let's initate the plugin on our wrapper element
	$(".wrapper").scrollPath({drawPath: true, wrapAround: true});

	// Add scrollTo on click on the navigation anchors
	$("nav").find("a").each(function() {
		var target = $(this).attr("href").replace("#", "");
		$(this).click(function(e) {
			e.preventDefault();
			
			// Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
			// for extra easing functions like the one below
			$.fn.scrollPath("scrollTo", target, 1000, "easeInOutSine");
		});
	});

/* ===================================================================== */

	$(".settings .show-path").click(function(e) {
		e.preventDefault();
		$(".sp-canvas").toggle();
	}).toggle(function() {
		$(this).text("Hide Path");
	}, function() {
		$(this).text("Show Path");
	});

	$(".tweet").click(function(e) {
		open(this.href, "", "width=550, height=450");
		e.preventDefault();
	});

	// $.getJSON("http://cdn.api.twitter.com/1/urls/count.json?callback=?&url=http%3A%2F%2Fjoelb.me%2Fscrollpath",
	// 		function(data) {
	// 			if(data && data.count !== undefined) {
	// 				$(".follow .count").html("the " + ordinal(data.count + 1) + " kind person to");
	// 			}
	// 		});
}

function highlight(element) {
	if(!element.hasClass("highlight")) {
		element.addClass("highlight");
		setTimeout(function() { element.removeClass("highlight"); }, 2000);
	}
}
function ordinal(num) {
	return num + (
		(num % 10 == 1 && num % 100 != 11) ? 'st' :
		(num % 10 == 2 && num % 100 != 12) ? 'nd' :
		(num % 10 == 3 && num % 100 != 13) ? 'rd' : 'th'
	);
}
