/**	
	* Template Name: Kevin
	* Version: 1.0	
	* Template Scripts
	* Author: MarkUps
	* Author URI: http://www.markups.io/

	Custom JS
	
	1. FIXED MENU
	2. FEATURED SLIDE ( TYPED SLIDER )
	3. SKILL PROGRESS BAR
	4. MENU SMOOTH SCROLLING
	5. MOBILE MENU CLOSE  
	6. PORTFOLIO GALLERY
	7. PORTFOLIO POPUP VIEW ( IMAGE LIGHTBOX )
	8. CLIENT TESTIMONIALS ( SLICK SLIDER )
	9. BUTTON SMOOTH SCROLL ( VIEW MY WORK )
	
**/



(function( $ ){


	/* ----------------------------------------------------------- */
	/*  2. FIXED MENU
	/* ----------------------------------------------------------- */


	jQuery(window).bind('scroll', function () {

    if ($(window).scrollTop() > 100) {

        $('#mu-header').addClass('mu-fixed-nav');
        
	    } else {
	        $('#mu-header').removeClass('mu-fixed-nav');
	    }
	});

		
	/* ----------------------------------------------------------- */
	/*  2. FEATURED SLIDE (TYPED SLIDER)
	/* ----------------------------------------------------------- */

		var typed = new Typed('#typed', {
		    stringsElement: '#typed-strings',
		    typeSpeed: 30,
			backSpeed: 40,
			backDelay: 300,
		    startDelay: 500,
		    loop: true,
		    loopCount: Infinity
		});

		
	/* ----------------------------------------------------------- */
	/*  3. SKILL PROGRESS BAR
	/* ----------------------------------------------------------- */

		$('.mu-skill-progress-bar').appear(function() {

		 	$('.mu-html5-bar').LineProgressbar({
				percentage: 95,
				triggerOnce: true
			});

			$('.mu-css-bar').LineProgressbar({
				percentage: 90,
				triggerOnce: true
			});

			$('.mu-photoshop-bar').LineProgressbar({
				percentage: 85,
				triggerOnce: true
			});

			$('.mu-wordpress-bar').LineProgressbar({
				percentage: 80,
				triggerOnce: true
			});

			$('.mu-jquery-bar').LineProgressbar({
				percentage: 55,
				triggerOnce: true
			});

		});



	/* ----------------------------------------------------------- */
	/*  4. MENU SMOOTH SCROLLING
	/* ----------------------------------------------------------- */ 

		//MENU SCROLLING WITH ACTIVE ITEM SELECTED

		// Cache selectors
		var lastId,
		topMenu = $(".mu-menu"),
		topMenuHeight = topMenu.outerHeight()+13,
		// All list items
		menuItems = topMenu.find('a[href^=\\#]'),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function(e){
		  var href = $(this).attr("href"),
		      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+22;
		  jQuery('html, body').stop().animate({ 
		      scrollTop: offsetTop
		  }, 1500);
		  e.preventDefault();
		});

		// Bind to scroll
		jQuery(window).scroll(function(){
		   // Get container scroll position
		   var fromTop = $(this).scrollTop()+topMenuHeight;
		   
		   // Get id of current scroll item
		   var cur = scrollItems.map(function(){
		     if ($(this).offset().top < fromTop)
		       return this;
		   });
		   // Get the id of the current element
		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";
		   
		   if (lastId !== id) {
		       lastId = id;
		       // Set/remove active class
		       menuItems
		         .parent().removeClass("active")
		         .end().filter("[href=\\#"+id+"]").parent().addClass("active");
		   }           
		});


	/* ----------------------------------------------------------- */
	/*  5. MOBILE MENU CLOSE 
	/* ----------------------------------------------------------- */ 

		jQuery('.mu-menu').on('click', 'li a', function() {
		  $('.in').collapse('hide');
		});


	/* ----------------------------------------------------------- */
	/*  6. ALBUM GALLERY FILTER CONTROLS
	/* ----------------------------------------------------------- */ 
	
	$(function(){
		gallery_controls();
		$.getJSON( "assets/db/albums.json", function( data ) {
			var albums = [];
			
			$.each( data, function (key, val) {
				if (Number.isInteger(parseInt(key))) {
					albums.push( "<li data-filter='" + parseInt(key) + "'>" + val["title"] + "</li>" );
				}
			});
		
			document.getElementById("filter-options").innerHTML = "<li data-filter=\"all\" class=\"active\">All</li>" + albums.join("");
			
			$('.filtr-container').filterizr();

			$('.mu-simplefilter li').click(function() {
		        $('.mu-simplefilter li').removeClass('active');
		        $(this).addClass('active');
		
			});
		});
	});

	/* ----------------------------------------------------------- */
	/*  7. ALBUM GALLERY CONTROLS ( IMAGE LIGHTBOX )
	/* ----------------------------------------------------------- */ 
function gallery_controls() {

		$(function() {
		$.getJSON( "assets/db/albums.json", function( data ) {
			var albums = [];

			var album_list = [];

			$.each( data, function (key, val) {

				if (Number.isInteger(parseInt(key)) && val["is_active"]==1) {
					
					albums.push( "<div class='col-sm-6 col-md-4 filtr-item' data-category='" + parseInt(key) + "'>" );
					albums.push( "<div class='mu-item-thumbonail'>" );
					albums.push( "<img class='img-responsive' src='assets/" + val["slug"] + ".jpg' alt='" + val["title"] + "'>" );
					albums.push( "</div>" );
					albums.push( "<div class='mu-filter-item-content'>" );
					albums.push( "<h1 class='mu-filter-item-title'>" + val["title"] + "</h2>" );
					albums.push( "<h4 class='mu-filter-item-title'>" + val["sub_title"] + "</h4>" );
					albums.push( "<span class='mu-header-dot' style='background-color: white'></span>" );
					albums.push( "<h4 class='mu-filter-item-title'>Released: " + album_date(val["release_date"]) + "</h5>" );
					albums.push( "<h4 class='mu-filter-item-title'>" + val["tracks"] + " tracks (" + format_album_time(val["total_length"]) + ")</h5>" );
					albums.push( "<h5 class='mu-filter-item-title'>&copy; " + val["label"] + "</h5>" );
					albums.push( "<a class='mu-filter-imglink' href='assets/" + val["slug"] + ".jpg' title='" + val["title"] + "'" + "id='" + key + "'><i class='fa fa-info-circle'></i></a>" );
					albums.push( "<span class='list-track' id='" + key + "'><i class='fa fa-question-circle'></i></span>" );
					albums.push( "</div>" );
					albums.push( "</div>" );
						
					album_list[key] = key;
				}

			});

			document.getElementsByClassName("filtr-container")[0].innerHTML = albums.join("");
			
			$('.mu-filter-imglink').magnificPopup({
				type: 'image',
				mainClass: 'mfp-fade',
				gallery:{
				  enabled:true
				}
			  });
		});
	});
}

$(document).ready(function() {
	setTimeout(function() {	
		$(".list-track").click( function() {
			var list = create_track_listing ( this.id );
			var table = create_track_table( list );
		});

	}, 100);

});

function album_date ( date_string ) {
	var options = { year: 'numeric', month: 'long', day: 'numeric' }
	var d = new Date(date_string);

	return d.toLocaleDateString("en-US", options);
}

function format_album_time ( t ) {
	
	//Calculate Hours
	full_hours = Math.floor(t / 3600);
	hours = (t/3600) - full_hours;

	//Calculate Minutes
	full_minutes = Math.floor(hours * 60);
	minutes = (hours * 60) - full_minutes;

	//Calculate Seconds
	full_seconds = Math.floor(minutes * 60);
	
	full_hours = (full_hours > 0) ? ( full_hours + ":" ) : "";
	full_minutes = (full_minutes < 10) ? ("0" + full_minutes + ":") : full_minutes + ":";
	full_seconds = (full_seconds < 10) ? ("0" + full_seconds) : full_seconds;

	return full_hours + full_minutes + full_seconds;
}

function format_track_time ( t ) {
	
	full_hours = Math.floor(t / 3600);	
	hours = (t/3600) - full_hours;

	full_minutes = Math.floor(hours * 60);
	minutes = (hours * 60) - full_minutes;

	full_seconds = Math.floor(minutes * 60);

	full_hours = (full_hours = 0) ? ( "" ) : full_hours + ":";
	full_minutes = (full_minutes < 10) ? ("0" + full_minutes + ":") : full_minutes + ":";
	full_seconds = (full_seconds < 10) ? ("0" + full_seconds) : full_seconds;

	return full_hours + full_minutes + full_seconds;
}

function create_track_listing ( album_number ) {
	$.getJSON( "assets/db/album_songs.json", function( data ) {
		var track_list = [];
		$.each( data, function (key, val) {
			if ( val["album_id"] = album_number ) {
				track_list.push(val["song_id"]);
			}
		});
		return track_list;
	});
}

function create_track_table ( track_list ) {
	console.log(track_list);
	$.getJSON( "assets/db/songs.json", function ( data ) {
		var songs = [];
		
		var i = 0;
		$.each( data, function (key, val) {
			if (key = track_list[i]) {
				songs[i] = val;
			}
		});
		console.log( songs );
	});
}

		/*$('.mu-filter-imglink').magnificPopup({
			type: 'image',
			mainClass: 'mfp-fade',
			gallery:{
			  enabled:true
			}
		  });

	/* ----------------------------------------------------------- */
	/*  8. CLIENT TESTIMONIALS (SLICK SLIDER)
	/* ----------------------------------------------------------- */

		$('.mu-testimonial-slide').slick({
		  arrows: false,
		  dots: true,
		  infinite: true,
		  speed: 500,
		  autoplay: true,
		  cssEase: 'linear'
		});


	/* ----------------------------------------------------------- */
	/*  9. BUTTON SMOOTH SCROLL ( VIEW MY WORK )
	/* ----------------------------------------------------------- */

		$('.view-my-work-btn').on('click',function (e) {
		    e.preventDefault();
		    var target = this.hash,
		    $target = $(target);
		    $('html, body').stop().animate({
		        'scrollTop': $target.offset().top
		    }, 1000, 'swing', function () {
		        window.location.hash = target;
			});
		});



	
})( jQuery );
