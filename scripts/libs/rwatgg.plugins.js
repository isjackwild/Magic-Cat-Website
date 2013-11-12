/*  ___
  _/ ..\
 ( \  0/___
  \    ___)
  /     \
 /      _\
`''''``
author: felix nielsen<felix.nielsen@relaxwearethegoodguys.dk*/


// (function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
// (function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
				 ? Math.ceil(from)
				 : Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++)
		{
			if (from in this &&
					this[from] === elt)
				return from;
		}
		return -1;
	};
}

if (!Date.now) {
	Date.now = function now() {
		return new Date().getTime();
	};
}

Date.prototype.getWeek = function (dowOffset) {
	dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 1;
	var newYear = new Date(this.getFullYear(),0,1);
	var day = newYear.getDay() - dowOffset; //the day of week the year begins on
	day = (day >= 0 ? day : day + 7);
	var daynum = Math.floor((this.getTime() - newYear.getTime() - (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
	var weeknum;
	// if the year starts before the middle of a week
	if(day < 4) {
		weeknum = Math.floor((daynum+day-1)/7) + 1;
		if(weeknum > 52) {
			nYear = new Date(this.getFullYear() + 1,0,1);
			nday = nYear.getDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			// if the next year starts before the middle of the week, it is week #1 of that year:
			weeknum = nday < 4 ? 1 : 53;
		}
	} else {
		weeknum = Math.floor((daynum+day-1)/7);
	}
	return weeknum;
};

/* Array sorting algoritm */
// (function()
// {

//   // expose to Array and jQuery
//   Array.prototype.msort = jQuery.fn.msort = msort;
//   Array.prototype.msort = msort;

//   function msort(compare) {

//     var length = this.length,
//         middle = Math.floor(length / 2);

//     if (!compare) {
//       compare = function(left, right) {
//         if (left < right)
//           return -1;
//         if (left == right)
//           return 0;
//         else
//           return 1;
//       };
//     }

//     if (length < 2)
//       return this;

//     return merge(
//       this.slice(0, middle).msort(compare),
//       this.slice(middle, length).msort(compare),
//       compare
//     );
//   }

//   function merge(left, right, compare) {

//     var result = [];

//     while (left.length > 0 || right.length > 0) {
//       if (left.length > 0 && right.length > 0) {
//         if (compare(left[0], right[0]) <= 0) {
//           result.push(left[0]);
//           left = left.slice(1);
//         }
//         else {
//           result.push(right[0]);
//           right = right.slice(1);
//         }
//       }
//       else if (left.length > 0) {
//         result.push(left[0]);
//         left = left.slice(1);
//       }
//       else if (right.length > 0) {
//         result.push(right[0]);
//         right = right.slice(1);
//       }
//     }
//     return result;
//   }

//   /* jQuery widgets - author felix nielsen */
// 	/* delete duplicate dom elements, right now it checks for text.. should add other posibilities. */
// 	jQuery.fn.deleteDuplicates = function()
// 	{
// 		var seen = {};
// 		this.each(function()
// 		{
// 			var txt = String($j(this).text()).toLowerCase();
// 			if (seen[txt])
// 				$j(this).remove();
// 			else
// 				seen[txt] = true;
// 		});

// 		return this;
// 	};
// })();

//how to use:
// var sorted = [
//   'Finger',
//   'Sandwich',
//   'sandwich',
//   '5 pork rinds',
//   'a guy named Steve',
//   'some noodles',
//   'mops and brooms',
//   'Potato Chip Brand® chips'
// ].msort(function(left, right)
// {
//   lval = left.toLowerCase();
//   rval = right.toLowerCase();

//   if (lval < rval)
//     return -1;
//   else if (lval == rval)
//     return 0;
//   else
//     return 1;
// });

// console.log(sorted);



var statsWrapper = {
	stats: null,
	init: function()
	{
		//add stats
		this.stats = new Stats();

		// Align top-left
		this.stats.getDomElement().style.position = 'fixed';
		this.stats.getDomElement().style.left = '0px';
		this.stats.getDomElement().style.top = '0px';

		document.body.appendChild( this.stats.getDomElement() );

		RenderQue.add(this);
	},
	render: function()
	{
		this.stats.update();
	}
};

/*Empty, use this object in projects.*/
var INTERFACES = {};

var UTIL = {};
UTIL.animation = {}; // animation related UTILs.
UTIL.browser = {}; // browser related UTILs.
UTIL.math = {};
UTIL.color = {};
UTIL.performance = {};
UTIL.layout = {};

/*layout helpers*/
UTIL.layout.DeviceOrientChange = function(callback)
{
	var mode = Math.abs(window.orientation) === 90 ? "landscape" : "portrait";
	//singleton, don't make than one instance of this.
	//callback get's parameters mode and angle
	function readDeviceOrientation() {
		mode = Math.abs(window.orientation) === 90 ? "landscape" : "portrait";
		callback(mode, window.orientation);
	}
	callback(mode, window.orientation);

	window.onorientationchange = readDeviceOrientation;
};

UTIL.layout.getScaleToRect = function(origw, origh, w, h)
{
	var ww = w;
	var hh = (ww / origw) * origh;

	if(hh < h)
		hh = h;
		ww = (hh / origh) * origw;

	var overflowx = w * 0.5 - ww * 0.5;
	var overflowy = h * 0.5 - hh * 0.5;

	return {
		w: ww,
		h: hh,
		overflowx: overflowx,
		overflowy: overflowy
	};
};

/*math*/
UTIL.math.lineDistance = function( point1, point2 )
{
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
};

/*color*/
UTIL.color.componentToHex = function(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
};

UTIL.color.rgbToHex = function(r, g, b) {
	return UTIL.color.componentToHex(r) + UTIL.color.componentToHex(g) + UTIL.color.componentToHex(b);
};

/*performance*/
UTIL.performance.testStart = function()
{
	this.start = (new Date()).getTime();
};

UTIL.performance.testEnd = function()
{
	if(!this.start)
		log ("did you call start yet?");
	return (new Date()).getTime() - this.start;
};


/*Interface tool*/
UTIL.checkInterface = function(theObject, theInterface) {
	for (var member in theInterface) {
		if ( (typeof theObject[member] != typeof theInterface[member]) ) {
			log("object failed to implement interface member " + member);
			return false;
		}
	}

	return true;
};

UTIL.supports_history_api = function() {
	return !!(window.history && history.pushState);
};

UTIL.isIOS = function()
{
	if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i))
		return true;
	else
		return false;
};

UTIL.getIOSVersion = function() {
	if(!UTIL.isIOS())
		return -1;

	var agent = window.navigator.userAgent,
	start = agent.indexOf( 'OS ' );

	if( ( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 || agent.indexOf( 'iPod' ) > -1 ) && start > -1 ){
		return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
	} else {
		return 0;
	}
};

UTIL.isAndroid = function()
{
	return navigator.userAgent.match(/Android/i);
};

UTIL.isWindowsPhone = function()
{
	if(navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/IEMobile/i))
		return true;
	else
		return false;
};

UTIL.isTablet = function()
{
	//Android mobiles have Mobile in the user agent, this is not a 100% solution..
	var isAndroidTablet = UTIL.isAndroid() && !navigator.userAgent.match(/Mobile/i) && !navigator.userAgent.match(/mobile/i);

	if(navigator.userAgent.match(/iPad/i) || isAndroidTablet)
		return true;
	else
		return false;
};

UTIL.isMobile = function()
{
	//Android mobiles have Mobile in the user agent, this is not a 100% solution..
	var isMobile = !UTIL.isTablet() && (navigator.userAgent.match(/Mobile/i) || navigator.userAgent.match(/mobile/i));
	var isiOS = !UTIL.isTablet() && UTIL.isIOS();
	var isWindows = UTIL.isWindowsPhone();

	if(isMobile || isiOS || isWindows)
		return true;
	else
		return false;
};


UTIL.getPositionFromMouseTouchEvent = function(event)
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
};

UTIL.addElementTo = function(markup, id, el, prepend)
{
	//jQuery
	try
	{
		var newEl = prepend ? el.prepend(markup) : el.append(markup);
		var l = el.find(id).length-1;
	}catch(e)
	{
		log("addElementTo Error:", markup);
		log(id);
		log(el);
	}

	return $(el.find(id)[l]);
};

UTIL.animation.TRANSITION_END = "transitionend webkitTransitionEnd oTransitionEnd otransitionend";

UTIL.animation.isOpacityFriendly = function()
{
	var v = UTIL.browser.getInternetExplorerVersion();
	if(v === 8 || v === 7 || v === 6)
		return false;

	return true;
};

UTIL.browser.getInternetExplorerVersion = function()
{
	var rv = -1; // Return value assumes failure.
	if(navigator.appName == 'Microsoft Internet Explorer')
	{
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}

	return rv;
};

UTIL.cookie = {
	get: function(c_name)
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)
			{
				return unescape(y);
			}
		}
	},
	set: function(c_name, value, exdays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	},
	clear: function(c_name)
	{
		document.cookie = c_name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	},
	check: function(c_name, exdays)
	{
		var label=this.get(c_name);
		if (label && label !== "" && label !== undefined && label !== null && label !== "undefined")
		{
			//exists.
			return true;
		}

		return false;
	}
};

UTIL.getTransformProperty = function(element) {
	// Note that in some versions of IE9 it is critical that
	// msTransform appear in this list before MozTransform
	var properties = [
			'transform',
			'WebkitTransform',
			'msTransform',
			'MozTransform',
			'OTransform'
	];
	var p;
	while (p = properties.shift()) {
		log(p, element.style);
			if (typeof element.style[p] != 'undefined') {
					return p;
			}
	}
	return false;
};

/*throttle method.
Use with jquery: $('...').keypress(UTIL.throttle(function (event) { ... }, 250, this));
Or as standalone: UTIL.throttle(this.Method, 1000, this)(arguments);
*/
UTIL.throttle = function(fn, delay, context)
{
	var timer = null;
	if(!context) context = this;
	return function () {
		var args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			if(context) fn.apply(context, args);
		}, delay);
	};
};

/* cross browser way to listen for an option (in a select element) change */
UTIL.bindSelect = function(select, scope, callback)
{
	var ie8AndDown = UTIL.browser.getInternetExplorerVersion() <= 8 && UTIL.browser.getInternetExplorerVersion() !== -1;
	var _callback = callback, _scope = scope;

	//bind events.
	if(!ie8AndDown)
	{
		$(select).change(UTIL.bind(scope, _callback));
	}
	else
	{
		$(select).bind('propertychange', function(e) {
			if(e.type == "propertychange" && event.propertyName.toLowerCase() == "value")
			{
				e.target.selectedIndex = this.selectedIndex;
				_callback(e);
			}
		});
	}
};

/*Usage (from modinizr):
element.addEventListener(UTIL.transitionEndString, theFunctionToInvoke, false);
*/
UTIL.transitionEndString = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

UTIL.bind = function(scope, fn) {
	return function () {
		fn.apply(scope, arguments);
	};
};

UTIL.getRandomNumber = function(start, range, roundUp)
{
	var ran = start + (roundUp ? Math.round(Math.random() * (range - start)) : Math.random() * (range - start));
	return ran;
};

UTIL.validateEmail = function(emailToValidate)
{
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(emailToValidate);
};

UTIL.validatePassword = function(password)
{
	var re = /^[A-Za-z0-9!@#$%^&*()_]{1,50}$/;
	return re.test(password);
};

UTIL.stripHTMLFromString = function(str)
{
	var tmp = document.createElement("DIV");
	tmp.innerHTML = str;
	return tmp.textContent||tmp.innerText;
}

var canvasSupported = true;
var hasCanvasSupportBeenSet = false;
UTIL.isCanvasSupported =  function(){
	if(!hasCanvasSupportBeenSet)
	{
		hasCanvasSupportBeenSet = true;
		var elem = document.createElement('canvas');
		canvasSupported = !!(elem.getContext && elem.getContext('2d'));
	}
	
	return canvasSupported;
};


// // shim layer for requestAnimationFrame with setTimeout fallback
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelRequestAnimationFrame = window[vendors[x]+
			'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

/* render cue for entire site, if interval needs usage on an element, then use RENDER_QUE.add(..., ...) */
var RenderQue = {
	items: [],
	running: false,
	rAF: null,
	// interval: 0,

	render: function()
	{
		if(!this.items || this.items.length === 0 || !this.running)
		{
			this.running = false;
			cancelAnimationFrame(this.rAF);
			return;
		}

		for (var i = 0; i < this.items.length; i++) {
			this.items[i].render();
		}

		if(this.running)
			this.rAF = window.requestAnimationFrame(UTIL.bind(this, this.render));
	},
	has: function(elem)
	{
		return this.items.indexOf(elem) != -1;
	},
	add: function(elem)
	{
		if(elem && this.items)
		{
			if(!this.has(elem))
				this.items.push(elem);
		}

		if(!this.running)
		{
			this.running = true;
			this.rAF = window.requestAnimationFrame(UTIL.bind(this, this.render));
		}
	},
	remove: function(elem)
	{
		if(this.items && elem)
		{
			if(this.has(elem))
				this.items.splice(this.items.indexOf(elem), 1);
		}
		
		if(this.items.length === 0)
			this.running = false;
	}
};



/* (framework) Class inheritance made easy */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
(function(){
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	this.Class = function(){};
	
	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var _super = this.prototype;
		
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
		
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					return function() {
						var tmp = this._super;
						
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];
						
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		
		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}
		
		// Populate our constructed prototype object
		Class.prototype = prototype;
		
		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;
		
		return Class;
	};

	if(typeof define === 'function' && define.amd)
	{
		define("Class", function()
		{
			return Class;
		});
	}
})();



UTIL.WindowResize = Class.extend({
	signal: null, //http://millermedeiros.github.com/js-signals

	w: 0,
	h: 0,
	halfw: 0,
	halfh: 0,
	aspectRatio: 0,
	invertedAspectRatio: 0,
	
	init: function(signal)
	{
		this.signal = signal;
		$(window).bind("resize", UTIL.bind(this, this.resize));
		this.resize();
	},
	update: function()
	{
		this.resize();
	},
	resize: function()
	{
		this.w = $(window).innerWidth();
		this.h = $(window).innerHeight();

		this.halfw = Math.round(this.w * 0.5);
		this.halfh = Math.round(this.h * 0.5);

		this.aspectRatio = this.w / this.h;
		this.invertedAspectRatio = this.h / this.w;

		this.signal.dispatch(this);
	}
});




// Destroys the localStorage copy of CSS that less.js creates
// https://gist.github.com/1346280
function destroyLessCache(pathToCss)
{ // e.g. '/css/' or '/stylesheets/'
	
    if(!window.localStorage || !less || less.env !== 'development')
    {
        return;
    }

    var host = window.location.host;
    var protocol = window.location.protocol;
    var keyPrefix = protocol + '//' + host + pathToCss;
	
    for(var key in window.localStorage)
    {
        if(key.indexOf(keyPrefix) === 0)
        {
            delete window.localStorage[key];
        }
    }
}


/* Pinch gesture */
var GestureWrapper = Class.extend({
	_el: null,
	_pinchCallback: null,
	_swipeCallback: null,

	_startScale: 0,
	_currentScale: 0,

	_startX: 0,
	_endX: 0,

	init: function(el)
	{
		this._el = el;
	},
	bind: function()
	{
		if(!this._binded)
		{
			this._binded = true;
		}
	},
	_onGestureStart: function(event)
	{
		event.preventDefault();
		this._startScale = event.originalEvent.scale;
	},
	_onGestureEnd: function(event)
	{
		event.preventDefault();
		if(this._pinchCallback)
			this._pinchCallback(this._startScale > this._currentScale);
	},
	_onGestureChange: function(event)
	{
		event.preventDefault();
	},
	_onTouchStart: function(event)
	{
		//event.preventDefault();
		this._startX = this._endX = UTIL.getPositionFromMouseTouchEvent(event).x;
	},
	_onTouchEnd: function(event)
	{
		//event.preventDefault();
		if(this._swipeCallback)
		{
			this._endX = UTIL.getPositionFromMouseTouchEvent(event).x;
			if(Math.abs(this._endX - this._startX) > 100)
				this._swipeCallback(this._endX > this._startX ? "left" : "right");
		}
	},
	_onTouchChange: function(event)
	{
		event.preventDefault();
		this._currentScale = event.originalEvent.scale;
	},
	addPinch: function(pinchCallback)
	{
		this._pinchCallback = pinchCallback;
		this._startScale = 0;
		this._currentScale = 0;

		$(this._el).bind("gesturestart.rwatgg", UTIL.bind(this, this._onGestureStart));
		$(this._el).bind("gesturechange.rwatgg", UTIL.bind(this, this._onGestureChange));
		$(this._el).bind("gestureend.rwatgg", UTIL.bind(this, this._onGestureEnd));
	},
	addSwipe: function(swipeCallback)
	{
		this._swipeCallback = swipeCallback;
		$(this._el).bind("touchstart.rwatgg", UTIL.bind(this, this._onTouchStart));
		$(this._el).bind("touchmove.rwatgg", UTIL.bind(this, this._onTouchChange));
		$(this._el).bind("touchend.rwatgg", UTIL.bind(this, this._onTouchEnd));
		this.bind();
	},

	dealoc: function()
	{
		this._binded = false;
		$(this._el).unbind("gesturestart.rwatgg gesturechange.rwatgg gestureend.rwatgg gesturestart.rwatgg gesturemove.rwatgg touchend.rwatgg");
		this._el = null;
		this._callback = null;
	}
});

//image wrapper
//usage @_img = new ImageExtended(src, UTIL.bind(@, @onImageLoaded))
var ImageExtended = Class.extend({
	_callback: null,
	data: null,
	loaded: false,
	init: function(src, callback)
	{
		this._callback = callback;

		this.data = new Image();
		this.data.onload = UTIL.bind(this, this.onImageLoaded);
		this.data.src = src;
	},
	stop: function()
	{
		this.data.src = "";
	},
	dealoc: function()
	{
		this.data.src = "";
		this.data.onload = undefined;
		this.data = null;
		this._callback = null;
	},
	onImageLoaded: function()
	{
		this.loaded = true;
		this._callback();
		this._callback = null;
	}
});

/* Pinch gesture */

var PinchGestureWrapper = Class.extend({
	_el: null,
	_callback: null,
	_startScale: 0,
	_currentScale: 0,

	init: function(el, callback)
	{
		this._el = el;
		this._callback = callback;
		this._startScale = 0;
		this._currentScale = 0;

		this._onGestureStart = function(event)
		{
			event.preventDefault();
			this._startScale = event.originalEvent.scale;
			alert(this._startScale);
		};

		this._onGestureEnd = function(event)
		{
			event.preventDefault();
			this._callback(this._startScale > this._currentScale);
		};

		this._onGestureChange = function(event)
		{
			event.preventDefault();
			this._currentScale = event.originalEvent.scale;
		};

		$(this._el).bind("gesturestart.pinch", UTIL.bind(this, this._onGestureStart));
		$(this._el).bind("gesturechange.pinch", UTIL.bind(this, this._onGestureChange));
		$(this._el).bind("gestureend.pinch", UTIL.bind(this, this._onGestureEnd));
	},
	dealoc: function()
	{
		$(this._el).unbind("gesturestart.pinch gesturechange.pinch gestureend.pinch");
		this._el = null;
		this._callback = null;
	}
});

function clone(src)
{
    function mixin(dest, source, copyFunc)
    {
        var name, s, i, empty = {};
        for(name in source)
        {
            // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
            // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
            // don't overwrite it with the toString() method that source inherited from Object.prototype
            s = source[name];
            if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s)))
            {
                dest[name] = copyFunc ? copyFunc(s) : s;
            }
        }
        return dest;
    }

    if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]")
    {
        // null, undefined, any non-object, or function
        return src;	// anything
    }
    if(src.nodeType && "cloneNode" in src)
    {
        // DOM Node
        return src.cloneNode(true); // Node
    }
    if(src instanceof Date)
    {
        // Date
        return new Date(src.getTime());	// Date
    }
    if(src instanceof RegExp)
    {
        // RegExp
        return new RegExp(src);   // RegExp
    }
    var r, i, l;
    if(src instanceof Array)
    {
        // array
        r = [];
        for(i = 0, l = src.length;i < l;++i)
        {
            if(i in src)
            {
                r.push(clone(src[i]));
            }
        }
        // we don't clone functions for performance reasons
        //		}else if(d.isFunction(src)){
        //			// function
        //			r = function(){ return src.apply(this, arguments); };
    } else
    {
        // generic objects
        r = src.constructor ? new src.constructor() : {};
    }
    return mixin(r, src, clone);

}

UTIL.setLog = function(doFake)
{
	if(doFake)
	{
		window.log = function f(){};
	}else
	{
			//set log
		if(UTIL.browser.getInternetExplorerVersion() === -1)
		{
			//paul irish, IE not happy about this one.
			Function.prototype.bind&&(typeof console=="object"||typeof console=="function")&&typeof console.log=="object"&&["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(method){console[method]=this.call(console[method],console)},Function.prototype.bind);window.log||(window.log=function(){var ua,winRegexp,script,i,args=arguments,isReallyIE8=!1,isReallyIE8Plus=!1;log.history=log.history||[];log.history.push(arguments);if(log.detailPrint&&log.needDetailPrint){ua=navigator.userAgent;winRegexp=/Windows\sNT\s(\d+\.\d+)/;console&&console.log&&/MSIE\s(\d+)/.test(ua)&&winRegexp.test(ua)&&parseFloat(winRegexp.exec(ua)[1])>=6.1&&(isReallyIE8Plus=!0)}if(isReallyIE8Plus||typeof console!="undefined"&&typeof console.log=="function")if(log.detailPrint&&log.needDetailPrint&&log.needDetailPrint()){console.log("-----------------");args=log.detailPrint(args);i=0;while(i<args.length){console.log(args[i]);i++}}else Array.prototype.slice.call(args).length===1&&typeof Array.prototype.slice.call(args)[0]=="string"?console.log(Array.prototype.slice.call(args).toString()):console.log(Array.prototype.slice.call(args));else if(!Function.prototype.bind&&typeof console!="undefined"&&typeof console.log=="object")if(log.detailPrint){Function.prototype.call.call(console.log,console,Array.prototype.slice.call(["-----------------"]));args=log.detailPrint(args);i=0;while(i<args.length){Function.prototype.call.call(console.log,console,Array.prototype.slice.call([args[i]]));i++}}else Function.prototype.call.call(console.log,console,Array.prototype.slice.call(args));else if(!document.getElementById("firebug-lite")){script=document.createElement("script");script.type="text/javascript";script.id="firebug-lite";script.src="https://getfirebug.com/firebug-lite.js";document.getElementsByTagName("HEAD")[0].appendChild(script);setTimeout(function(){window.log.apply(window,args)},2e3)}else setTimeout(function(){window.log.apply(window,args)},500)});
		}else
		{
			window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
		}
	}	
}












