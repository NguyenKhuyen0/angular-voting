var clock;

$(document).ready(function() {

	// Grab the current date
	var currentDate = new Date();

	// Set some date in the past. In this case, it's always been since Jan 1
	var targetDate  = new Date(2019, 9, 20, 13, 30);

	// Calculate the difference in seconds between the future and current date
	var diff = targetDate.getTime() / 1000 - currentDate.getTime() / 1000;

	// Instantiate a coutdown FlipClock
	clock = $('.clock').FlipClock(diff, {
		clockFace: 'DailyCounter',
		showSeconds: false,
		clockFaceOptions: {
			countdown: true
		}
	});
});
$(document).ready(function() {
  $("#testimonial-slider").owlCarousel({
    items: 3,
    itemsDesktop:[1000,3],
    itemsDesktopSmall:[979,2],
    itemsTablet:[768, 2],
    itemsMobile:[650, 1],
    nav: true,
    autoPlay: true,
    dots: false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
        }
    }
  });
});