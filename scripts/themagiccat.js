$(document).on('mousemove', function(e){
    $('#stars-small').css({
       left:  e.pageX - 70,
       top:   e.pageY - 70
    });
});


// CLOCK TIME!
$(document).ready(function() {
	var date = new Date();
	var mins = date.getMinutes();
	var hours = date.getHours();

	var minHand = (mins / 60)*360;
	var hourHand = (hours / 12)*360;
	console.log("hour"+hourHand);
	console.log("min"+minHand);

	$('#min').css({
		'transform': "rotate("+minHand+"deg)"
	});

	$('#hour').css({
		'transform': "rotate("+hourHand+"deg)"
	});
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

	var positionArray = [], currentTeddyPosIndex = -1

    function Position(left, top, deg) {
        this.left=left;
        this.top=top;
        this.deg=deg;
    }
    
    var positionArray = [
          new Position(0, -60, -20) 
        , new Position(1100, -70, 0)
        , new Position(2000, 1380, 180)
        , new Position(2840, 600, -90)
        , new Position(2930, 1400, -190) 
		, new Position(-10, 1260, -110) 
		, new Position(2200, 600, -90) 
	   	, new Position(500, 920, 10) 
    ];
    
    function positionTeddy() {                
            var min = 0;
            var max = 5;
            var ranIndex = Math.floor(Math.random() * positionArray.length)

            while(ranIndex == currentTeddyPosIndex)
            	ranIndex = Math.floor(Math.random() * positionArray.length)

            currentTeddyPosIndex = ranIndex;

            console.log (positionArray[currentTeddyPosIndex].left)
            console.log (positionArray[currentTeddyPosIndex].top)

            $("#teddy").css({
                top     : positionArray[currentTeddyPosIndex].top,
                left    : positionArray[currentTeddyPosIndex].left,

                transform    : "rotate(" + positionArray[currentTeddyPosIndex].deg + "deg)",
            });
    };

	$(document).ready(function(){
		$("#wrapper").width(3000);
		$("#wrapper").height(1500);

		$("body").mousedown(function(){
			console.log("down");
			$("body").addClass('mouseDown');
			//$("#stars-small").removeClass('hide');
		});

		$("body").mouseup(function(){
			console.log("up");
			$("body").removeClass('mouseDown');
			//$("#stars-small").addClass('hide');
		});

		$("#statue-day").bind('mousedown touchstart', function(event){
			event.preventDefault();
			console.log("clickdown");
			$("#burp").addClass('touch');
			//$("#stars-small").removeClass('hide');
		});

		$("#statue-day").bind('mouseup touchend',function(event){
			event.preventDefault();
			$("#burp").removeClass('touch');
			//$("#stars-small").addClass('hide');
		});

		$("#phone-day").bind('mouseenter touchstart', function(event){
			event.preventDefault();
			console.log("clickdown");
			$("#phone-day").addClass('touch');
			//$("#stars-small").removeClass('hide');
		});

		$("#phone-day").bind('mouseleave touchend',function(event){
			event.preventDefault();
			$("#phone-day").removeClass('touch');
			//$("#stars-small").addClass('hide');
		});

		$("#teddy").bind('mousedown touchstart', function(event){
			event.preventDefault();
			positionTeddy(); 
		});

		var fishTimer = 0;
		$("#fish-day").bind('mousedown touchstart',function(event){
			$("#fish").addClass('touch');
			clearTimeout(fishTimer);
			fishTimer = setTimeout(function() {
        		$("#fish").removeClass('touch');
    		}, 20000)
		});


		var birdTimer = 0;
		$("#bird-day").bind('mousedown touchstart',function(event){
			$("#bird-day").addClass('touch');
			clearTimeout(birdTimer);
			birdTimer = setTimeout(function() {
        		$("#bird-day").removeClass('touch');
    		}, 1000)
		});

		// $("#fish-day").mouseleave(function(){
		// 	$("#fish").removeClass('touch');
		// 	//$("#stars-small").addClass('hide');
		// });
		var sheetsTimer = 0;
		$("#sheets-day").bind('mousedown touchstart',function(event){
			$("#sheets-day").addClass('touch');
			clearTimeout(sheetsTimer);
			sheetsTimer = setTimeout(function() {
        		$("#sheets-day").removeClass('touch');
    		}, 13500)
		});


		$("#lamp-xmas").bind('mousedown touchend',function(event){
			event.preventDefault();
			$("#lamp-xmas").toggleClass('touch');
		});

		$("#santa-xmas").bind('mousedown touchend',function(event){
			event.preventDefault();
			$("#santa-xmas").addClass('touch');
		});


		var sheetsTimer = 0;
		$("#bell-xmas").bind('mousedown touchstart',function(event){
			$("#bell-xmas").addClass('touch');
			clearTimeout(sheetsTimer);
			sheetsTimer = setTimeout(function() {
        		$("#bell-xmas").removeClass('touch');
    		}, 6000)
		});

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
					console.log(event.keyCode)
					if(event.keyCode == 32)
					{
						event.preventDefault();
					}
				});

				console.log(UTIL)
				console.log(RenderQue)

				RenderQue.add(this)

				$(document).bind("mousedown touchstart", UTILS.bind(this, this.onMouseDown));
				$(document).bind("mouseup touchend", UTILS.bind(this, this.onMouseUp));
				
				$(document).mouseleave(UTILS.bind(this, this.onMouseUp));

				//set fixed position
				setTimeout(function(){$(document).scrollLeft(0).scrollTop(0); }, 10)
			},
			render: function()
			{
				this._x += (this._xtarget - this._x) * 0.2;
				this._y += (this._ytarget - this._y) * 0.2;

				this.setXY(this._x, this._y);
			},
			onMouseDown: function(event)
			{
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
			onMouseMove: function(event)
			{
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

		//start window scroll.
		BDC_scroll.init();

		//start slides
		$(".rslides").responsiveSlides();
	});


// SOUNDS
var burp = new buzz.sound('../sounds/burp', {formats: ['wav']});
var teddy = new buzz.sound('../sounds/teddy', {formats: ['wav']});
var ring = new buzz.sound('../sounds/ring', {formats: ['wav']});
var harp = new buzz.sound('../sounds/harp', {formats: ['wav']});
var tick = new buzz.sound('../sounds/tick', {formats: ['wav']});

$(function() {
	$('#statue-day').mousedown (function() {
		burp.play();
	});

	$('#teddy').mousedown (function() {
		teddy.play();
	});

	$('#phone-day').mouseenter (function() {
		ring.play();
	});

	$('#phone-day').mouseleave (function() {
		ring.stop();
	});

	$('#mc-day').mousedown (function() {
		harp.play();
	});

	$('#clock').mouseenter (function() {
		tick.play();
	});

	$('#clock').mouseleave (function() {
		tick.stop();
	});
});
