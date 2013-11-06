$(document).on('mousemove', function(e){
    $('#stars-small').css({
       left:  e.pageX - 70,
       top:   e.pageY - 70
    });
});


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

	$(document).ready(function()
	{
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


		var BDC_scroll = {
			_mousedown: false,

			_startX: 0,
			_startY: 0,
			_xtarget: 0,
			_ytarget: 0,

			init: function()
			{
				$(window).mousedown(UTILS.bind(this, this.onMouseDown));
				$(window).mouseup(UTILS.bind(this, this.onMouseUp));
				$(window).mouseleave(UTILS.bind(this, this.onMouseUp));

				//set fixed position
				setTimeout(function(){$(document).scrollLeft(0).scrollTop(0); }, 10)
			},
			onMouseDown: function(event)
			{
				event.preventDefault();
				this._mousedown = true;
				this._startX = UTILS.getPositionFromMouseTouchEvent(event).x
				this._startY = UTILS.getPositionFromMouseTouchEvent(event).y

				$(window).bind("mousemove", UTILS.bind(this, this.onMouseMove));
			},
			onMouseUp: function(event)
			{
				this._mousedown = false;
				$(window).unbind("mousemove");
			},
			onMouseMove: function(event)
			{
				event.preventDefault();
				var scrollx = $(document).scrollLeft();
				var scrolly = $(document).scrollTop();

				var x = UTILS.getPositionFromMouseTouchEvent(event).x - scrollx
				var y = UTILS.getPositionFromMouseTouchEvent(event).y - scrolly

				x = this._startX - UTILS.getPositionFromMouseTouchEvent(event).x
				y = this._startY - UTILS.getPositionFromMouseTouchEvent(event).y

				this._xtarget = scrollx + x;
				this._ytarget = scrolly + y;

				$(document).scrollLeft(this._xtarget).scrollTop(this._ytarget);
				
			}
		}

		BDC_scroll.init();
	});