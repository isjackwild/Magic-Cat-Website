//TRACKING
function track(id, action)
{
try
{
	ga('send', 'event', id, action);
}catch(e){}
}


//STARBURST
function moveStars(event)
{
	$('#starburst').css({
       left:  UTILS.getPositionFromMouseTouchEvent(event).x - 90,
       top:   UTILS.getPositionFromMouseTouchEvent(event).y - 60,
    });
}

$(document).on('mousemove touchmove', function(event){
    moveStars(event);
});

$(document).bind('mousedown touchstart',function(event){
			$("#starburst").addClass('touch');
			moveStars(event);
		});
$(document).bind('mouseup touchend',function(event){
			$("#starburst").removeClass('touch');
		});


if (Modernizr.touch) {
    $('.card').addClass("no-wobble");
}

//work here

//LOADING & WINDOW LOAD
$(window).load(function(){


	if (Modernizr.touch === false) {
		$("body").addClass("no-touch");
	}	

	setTimeout(function() {
    	$("#loading-l").addClass("touch");
    	$("#loading-r").addClass("touch");
    	$("#loading-wreath-xmas").addClass("touch");
    	$("#wrapper").addClass("touch");
    }, 1000)


	$("#loading-l").bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
    	$("#loading-l").addClass("hide");
    	$("#loading-r").addClass("hide");
    	$("#loading-wreath-xmas").addClass("hide");
	 });

});


// CLOCK & Candle!
$(document).ready(function() {

	console.log("Doc Ready");

	var date = new Date();
	var mins = date.getMinutes();
	var hours = date.getHours();
	var month = date.getMonth();
	var day = date.getDate();

	var minHand = (mins / 60)*360;
	var hourHand = (hours / 12)*360;

	var clockTime = function() {
		$('#min').css({
			'transform': "rotate("+minHand+"deg)"
		});

		$('#hour').css({
			'transform': "rotate("+hourHand+"deg)"
		});
	}

	clockTime();

	window.setInterval(function(){
		clockTime();
	}, 60000)

	
	if (month >= 0 && month <= 10) {
		$(".xmas").addClass("hide");

		if (hours < 8 || hours > 18) {
			$(".day").addClass("hide");
			$(".note").addClass("hide");
			$("#wrapper").addClass("night");
		} else {
			$(".night").addClass("hide");
			$("#wrapper").addClass("day");
		}

	} else if (month == 11){

		var candleHeight;

		$("#wrapper").addClass("xmas");
		$(".not-xmas").addClass("hide");
		$(".day").addClass("hide");
		$(".night").addClass("hide");
		$("#loading-wreath-xmas").removeClass("hide");

		for (var i=1; i <= 24; i++){
			if (day == i){
				candleHeight = 403-(14.58*i);
				console.log("Candle Height = "+ candleHeight);
				$("#candle-main").height(candleHeight);
				$("#candle-top").css({
					'bottom': candleHeight+40
				});
				$("#candle-flame").css({
					'bottom': candleHeight+84
				});
			} else if (day > 24) {
				$("#candle-main").height(40);
				$("#candle-top").css({
					'bottom': 78
				});
				$("#candle-flame").css({
					'bottom': 125
				});
			}
		}
	}
})



// rwatgg.libs.js - utils.
var UTILS = {
	bind: function(scope, fn) {
		return function () {
			fn.apply(scope, arguments);
		};
	},
	getPositionFromMouseTouchEvent: function(event)
	{
		if(event.originalEvent && (event.originalEvent.touches || event.originalEvent.changedTouches))
		{
			var touch = event.originalEvent.touches[0] ? event.originalEvent.touches : event.originalEvent.changedTouches;
			return {x: touch[0].pageX, y: touch[0].pageY, length: touch.length};
		}
		else
		{
			return {x: event.pageX, y: event.pageY, length: 0};
		}
	}
}


// POSITION VARIABLE TEDDY

var positionArray = [], currentTeddyPosIndex = -1

function Position(left, top, deg) {
    this.left=left;
    this.top=top;
    this.deg=deg;
}

var positionArray = [
      new Position(580, -90, 0) 
    , new Position(1100, -70, 0)
    , new Position(2000, 1380, 180)
    , new Position(2840, 600, -90)
    , new Position(2930, 1400, -190) 
	, new Position(-10, 1320, -110) 
   	, new Position(460, 1030, 10) 
];

function positionTeddy() {                
        var min = 0;
        var max = 5;
        var ranIndex = Math.floor(Math.random() * positionArray.length)

        while(ranIndex == currentTeddyPosIndex)
        	ranIndex = Math.floor(Math.random() * positionArray.length)

        currentTeddyPosIndex = ranIndex;

        $("#teddy").css({
            top     : positionArray[currentTeddyPosIndex].top,
            left    : positionArray[currentTeddyPosIndex].left,
            transform    : "rotate(" + positionArray[currentTeddyPosIndex].deg + "deg)",
        });
};


// INTERACTION
	$(document).ready(function(){
		$("#wrapper").width(3000);
		$("#wrapper").height(1500);

		$("body").mousedown(function(){
			$("body").addClass('mouseDown');
		});

		$("body").mouseup(function(){
			$("body").removeClass('mouseDown');
		});

		$("#mute-audio").mousedown(function(){
			$("#mute-audio").toggleClass('touch');
		});

		$("#mc-book").bind('mousedown touchstart', function(){
			$("#mc-book").toggleClass('touch');
			$("#mc-book-flip").toggleClass('touch');
			$("#mc-book-front").toggleClass('touch');
		});

		track('#mc-book', 'click');

		$("#teddy").bind('mousedown touchstart', function(event){
			event.preventDefault();
			positionTeddy(); 
			$("#bravo").addClass('touch');
			$("#bravo-star").addClass('touch');
			$("#bravo-sprite").addClass('touch');
			setTimeout(function() {
        		$("#bravo").removeClass('touch');
        		$("#bravo-star").removeClass('touch');
        		$("#bravo-sprite").removeClass('touch');
    		}, 3000)
		});

		track('#teddy', 'click');


// DAY INTERACTION
		$("#statue-day").bind('mousedown touchstart', function(event){
			event.preventDefault();
			$("#burp").addClass('touch');
		});

		$("#statue-day").bind('mouseup touchend',function(event){
			event.preventDefault();
			$("#burp").removeClass('touch');
		});

		track('#statue-day', 'click');

		$("#phone-day").bind('mouseenter touchstart', function(event){
			event.preventDefault();
			$("#phone-day").addClass('touch');
		});

		$("#phone-day").bind('mouseleave touchend',function(event){
			event.preventDefault();
			$("#phone-day").removeClass('touch');
		});

		var fishTimer = 0;
		$("#fish-day").bind('mousedown touchstart',function(event){
			$("#fish").addClass('touch');
			clearTimeout(fishTimer);
			fishTimer = setTimeout(function() {
        		$("#fish").removeClass('touch');
    		}, 20000)
		});

		track('#fish-day', 'click');

		var birdTimer = 0;
		$("#bird-day").bind('mousedown touchstart',function(event){
			$("#bird-day").addClass('touch');
			clearTimeout(birdTimer);
			birdTimer = setTimeout(function() {
        		$("#bird-day").removeClass('touch');
    		}, 1300)
		});

		track('#bird-day', 'click');

		var sheetsTimer = 0;
		$("#sheets-day").bind('mousedown touchstart',function(event){
			$("#sheets-day").addClass('touch');
			clearTimeout(sheetsTimer);
			sheetsTimer = setTimeout(function() {
        		$("#sheets-day").removeClass('touch');
    		}, 13500)
		});

		track('#sheets-day', 'click');

//NIGHT INTERACTION
		
		var moonTimer = 0;
		$("#moon-night").bind('mousedown touchstart',function(event){
			$("#moon-night").addClass('touch');
			clearTimeout(moonTimer);
			moonTimer = setTimeout(function() {
        		$("#moon-night").removeClass('touch');
    		}, 1600)
		});

		track('#moon-night', 'click');

		$("#mc-hat-night").bind('mouseenter touchstart', function(event){
			event.preventDefault();
			$("#mc-hat-night").addClass('touch');
		});

		$("#mc-hat-night").bind('mouseleave touchend',function(event){
			event.preventDefault();
			$("#mc-hat-night").removeClass('touch');
		});

		$("#lamps-night").bind('mousedown touchstart', function(event){
			event.preventDefault();
			$("#light-off-night").toggleClass('touch');
			$("#lamps-night").toggleClass('touch');
		});

		track('#lamps-night', 'click');

		var teaTimer = 0;
		$("#tea-pot-night").bind('mousedown touchstart',function(event){
			$("#tea-pot-night").addClass('touch');
			clearTimeout(teaTimer);
			teaTimer = setTimeout(function() {
        		$("#tea-pot-night").removeClass('touch');
    		}, 5000)
		});

		track('#tea-pot-night', 'click');

		var teddyPjTimer = 0;
		$("#teddy-pj-night").bind('mousedown touchstart',function(event){
			$("#teddy-pj-night").addClass('touch');
			$("#teddy-eye-r-night").addClass('touch');
			$("#teddy-eye-l-night").addClass('touch');
			clearTimeout(teddyPjTimer);
			teddyPjTimer = setTimeout(function() {
        		$("#teddy-pj-night").removeClass('touch');
        		$("#teddy-eye-r-night").removeClass('touch');
				$("#teddy-eye-l-night").removeClass('touch');
    		}, 3000)
		});

		track('#teddy-pj-night', 'click');



// XMAS INTERACTION
		$("#lamp-xmas").bind('mousedown touchstart',function(event){
			event.preventDefault();
			$("#lamp-xmas").toggleClass('touch');
			$("#lamp-off-xmas").toggleClass('touch');
		});

		track('#lamp-xmas', 'click');

		$("#santa-xmas").bind('mousedown touchend',function(event){
			event.preventDefault();
			$("#santa-xmas").addClass('touch');
			$("#merry-xmas").addClass('touch');
		});

		track('#santa-xmas', 'click');

		$("#tree-star-xmas").bind('mouseenter touchstart',function(event){
			$("#tree-star-xmas").addClass('touch');
		});

		$("#tree-star-xmas").bind('mouseleave touchend',function(event){
			$("#tree-star-xmas").removeClass('touch');
		});

		var mcEyesTimer = 0;
		$("#mc-xmas").bind('mousedown touchstart',function(event){
			$("#mc-eye-r-xmas").addClass('touch');
			$("#mc-eye-l-xmas").addClass('touch');
			clearTimeout(mcEyesTimer);
			mcEyesTimer = setTimeout(function() {
        		$("#mc-eye-r-xmas").removeClass('touch');
				$("#mc-eye-l-xmas").removeClass('touch');
    		}, 3000)
		});

		track('#mc-xmas', 'click');

		var bellTimer = 0;
		$("#bell-xmas").bind('mousedown touchstart',function(event){
			$("#bell-xmas").addClass('touch');
			clearTimeout(bellTimer);
			bellTimer = setTimeout(function() {
        		$("#bell-xmas").removeClass('touch');
    		}, 4200)
		});

		track('#bell-xmas', 'click');



// WINDOW SCROLL
		var BDC_scroll = {
			_mousedown: false,

			_startX: 0,
			_startY: 0,
			_xtarget: 0,
			_ytarget: 0,

			_x: 0,
			_y: 0,

			init: function()
			{
				//prevent spacebar
				$("html, body, #wrapper").bind("keydown", function(event)
				{
					if(event.keyCode == 32)
					{
						event.preventDefault();
					}
				});

				RenderQue.add(this)

				$(document).bind("mousedown touchstart", UTILS.bind(this, this.onMouseDown));
				$(document).bind("mouseup touchend", UTILS.bind(this, this.onMouseUp));
				$(document).mouseleave(UTILS.bind(this, this.onMouseUp));

				//set fixed position
				setTimeout(function(){$(document).scrollLeft(0).scrollTop(0); }, 10)
			},
			render: function()
			{
				//easing & where to add bounce
					// this._x += (this._xtarget - this._x) * 0.2;
					// this._y += (this._ytarget - this._y) * 0.12;
					this._x = this._xtarget;
					this._y = this._ytarget;

				this.setXY(this._x, this._y);
			},
			onMouseDown: function(event)
			{
				if(!$(event.target).hasClass("ignore-prevent-default"))
					event.preventDefault();
				this._mousedown = true;
				this._startX = UTILS.getPositionFromMouseTouchEvent(event).x - this._x
				this._startY = UTILS.getPositionFromMouseTouchEvent(event).y - this._y

				$(window).bind("mousemove touchmove", UTILS.bind(this, this.onMouseMove));
			},
			onMouseUp: function(event)
			{
				this._mousedown = false;
				$(window).unbind("mousemove touchmove");
			},

			touchTimer: 0,

			onMouseMove: function(event)
			{
				if(Modernizr.touch) {
					clearTimeout(this.touchTimer);
					if(!$("body").hasClass('no-ani')) {
						$("body").addClass('no-ani')
					}

					this.touchTimer = setTimeout(function(){
						$("body").removeClass('no-ani')
					},500);
				}
				

				event.preventDefault();

				var x = UTILS.getPositionFromMouseTouchEvent(event).x - this._x
				var y = UTILS.getPositionFromMouseTouchEvent(event).y - this._y

				x = this._startX - UTILS.getPositionFromMouseTouchEvent(event).x
				y = this._startY - UTILS.getPositionFromMouseTouchEvent(event).y

				this._xtarget = x;
				this._ytarget = y;

				var workingWidth= $(window).width() - 3000;
				var workingHeight= $(window).height() - 1500;

				this._xtarget = this._xtarget * -1
				this._ytarget = this._ytarget * -1

				if(this._xtarget > 0)
					this._xtarget = 0
				if(this._xtarget < workingWidth)
					this._xtarget = workingWidth
				if(this._ytarget > 0)
					this._ytarget = 0
				if(this._ytarget < workingHeight)
					this._ytarget = workingHeight
			},
			setXY: function(x, y)
			{
				if(Modernizr.csstransforms3d) {
					$("#wrapper").css({
						"transform": "translate3d("+x+"px,"+y+"px,0)",
					})
				} else if(Modernizr.csstransforms) {
					$("#wrapper").css({
						"transform": "translate("+x+"px,"+y+"px)",
					})
				} else {
					$("#wrapper").css({
						"left": x,
						"top": y
					})
				}
			}
		}


// SCROLL INITIATE.
		BDC_scroll.init();

		CardsEngine.init();

// SLIDESHOW INITIATE
		$(".rslides").responsiveSlides();

}); //end doc.ready


// SOUNDS
$(window).load(function() {

	var date = new Date();
	var month = date.getMonth();
	var soundtrack;

	if (month == 10 || month == 0) {
		soundtrack = new buzz.sound('sounds/winter', {formats: ['wav', 'mp3', 'ogg'], preload:true, autoplay:true, loop:true});
	} else if (month == 1 || month == 2 || month == 3) {
		soundtrack = new buzz.sound('sounds/spring', {formats: ['wav', 'mp3', 'ogg'], preload:true, autoplay:true, loop:true});
	} else if (month == 4 || month == 5 || month == 6) {
		soundtrack = new buzz.sound('sounds/summer', {formats: ['wav', 'mp3', 'ogg'], preload:true, autoplay:true, loop:true});
	} else if (month == 7 || month == 8 || month == 9) {
		soundtrack = new buzz.sound('sounds/fall', {formats: ['wav', 'mp3', 'ogg'], preload:true, autoplay:true, loop:true});
	} else if (month == 11) {
		soundtrack = new buzz.sound('sounds/Magic_Christmas_by_Julie_Michelsen', {formats: ['wav', 'mp3', 'ogg'], preload:true, autoplay:true, loop:true});
	}
	
	var curtain = new buzz.sound('sounds/curtain', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var burp = new buzz.sound('sounds/burp', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var lamp = new buzz.sound('sounds/lamp', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var shimmer = new buzz.sound('sounds/shimmer', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var fanfare = new buzz.sound('sounds/fanfare', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var button = new buzz.sound('sounds/button', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var bravo = new buzz.sound('sounds/bravo', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var bravo2 = new buzz.sound('sounds/bravo2', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var ring = new buzz.sound('sounds/ring', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var harp = new buzz.sound('sounds/harp', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var mc = new buzz.sound('sounds/mc', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var tick = new buzz.sound('sounds/tick', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var fire = new buzz.sound('sounds/fire', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var tea = new buzz.sound('sounds/tea', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var snore = new buzz.sound('sounds/snore', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var yahoo = new buzz.sound('sounds/yahoo', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var whistle = new buzz.sound('sounds/whistle', {formats: ['wav', 'mp3', 'ogg'], preload:true});
	var bell = new buzz.sound('sounds/bell', {formats: ['wav', 'mp3', 'ogg'], preload:true});

	$(function() {

//CONSTANTS
		soundtrack.play();
		soundtrack.setVolume(50);
		curtain.play();
		//buzz.all().toggleMute();

		$("#mute-audio").bind('mousedown touchstart',function(event){
				buzz.all().toggleMute();
			});

		track('#mute-audio', 'click');

		$("#teddy").bind('mousedown touchstart',function(event){
				bravo.play();
			});

		$("#mc-book").bind('mousedown touchstart',function(event){
				fanfare.play();
			});

		$("#clock").bind('mouseenter touchstart',function(event){
				tick.play();
				tick.loop();
			});

		$("#clock").bind('mouseleave touchend',function(event){
				tick.stop();
			});

//DAY

		$("#statue-day").bind('mousedown touchstart',function(event){
				burp.play();
			});

		$("#bird-day").bind('mousedown touchstart',function(event){
				whistle.play();
			});

		$("#phone-day").bind('mouseenter touchstart',function(event){
				ring.play();
				ring.loop();
			});

		$("#phone-day").bind('mouseleave touchend',function(event){
				ring.stop();
			});

		$("#mc-day").bind('mousedown touchstart',function(event){
				mc.play();
			});

		$("#sheets-day").bind('mousedown touchstart',function(event){
				shimmer.play();
			});

//NIGHT
		$("#tea-pot-night").bind('mousedown touchstart',function(event){
				tea.play();
			});

		$("#mc-night").bind('mouseenter touchstart',function(event){
				snore.play();
				snore.loop();
			});

		$("#mc-night").bind('mouseleave touchend',function(event){
				snore.stop();
			});

		$("#lamps-night").bind('mousedown touchstart',function(event){
				lamp.play();
			});

		$("#moon-night").bind('mousedown touchstart',function(event){
				shimmer.play();
			});

		$("#teddy-pj-night").bind('mousedown touchstart',function(event){
				yahoo.play();
			});

//XMAS

		$("#lamp-xmas").bind('mousedown touchstart',function(event){
				lamp.play();
			});

		$("#bell-xmas").bind('mousedown touchstart',function(event){
				bell.play();
			});

		$("#santa-xmas").bind('mousedown touchstart',function(event){
				shimmer.play();
			});

		$("#mc-xmas").bind('mousenter touchstart',function(event){
				harp.play();
			});

		$("#mc-xmas").bind('mousedown touchstart',function(event){
				harp.play();
			});

		$("#candle-outer").bind('mouseenter touchstart',function(event){
				fire.play();
				fire.loop();
			});

		$("#candle-outer").bind('mouseleave touchend',function(event){
				fire.stop();
			});

	});
});