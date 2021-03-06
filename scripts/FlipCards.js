var date = new Date();
var day = date.getDay();
var bravo2 = new buzz.sound('sounds/bravo2', {formats: ['wav', 'mp3', 'ogg'], preload:true});

$(document).ready(function(){

	if (day > 26) {
					$("#instructions").replaceWith("<p>Match all the cards to see what<br>The Magic Cat got for Chrismas!</p>");
					$("#download-gift-xmas").css("background-image", "url('assets/fish-large.png')");
				}
});

//Cards engine
var CardsEngine =
{

	//constants
	NUM_CARDS: 10,
	NUM_PAIR_BEFORE_SUCCESS: 5,

	numPairs: 0,

	_cards: null,
	_positions: null,
	_cardFlipped: null,

	

	init: function()
	{

		if(Modernizr.touch) {
					$(".card").addClass("no-wobble");
				}


		this._cards = [];
		this._positions = [];

		for (var i = 0; i < this.NUM_CARDS; i++) {
			this._positions.push("card-pos"+i);
		}

		this.build();
	},
	build: function()
	{
		for (var i = 0; i < this.NUM_CARDS; i++) {
			//random card position
			var pos = this._positions.splice(Math.floor(Math.random()*this._positions.length), 1);
			this._cards.push(new Card($("#card"+i), pos, i));
			if(i % 2 == 1 && i > 0)
			{
				//partner up cards
				this._cards[i-1].kiss(this._cards[i]);
				this._cards[i].kiss(this._cards[i-1]);
			}

			this._cards[i].addCardOnFlip(UTIL.bind(this, this.onCardFlip));
		}
	},
	onCardFlip: function(card)
	{
		if(this._cardFlipped)
		{
			if(this._cardFlipped.check(card))
			{
				this.numPairs++;
				this.checkSuccess();
			}

			this._cardFlipped = null;
		}else
		{
			this._cardFlipped = card;
		}
	},
	checkSuccess: function()
	{
		if(this.numPairs == this.NUM_PAIR_BEFORE_SUCCESS)
		{
			console.log("GREAT SUCCESS! Now let's reset the cards");
			$("#present-l").addClass("touch");
			$("#present-r").addClass("touch");
			$("#download-gift-xmas").addClass('touch');
			bravo2.play();

			var date1 = new Date();
			var day1 = date1.getDate();


			if (day1 >= 1 && day1 <= 7) {
				$("#instructions").replaceWith("<p>The Magic Cat gave you his Christmas song!<br>Come back on Sunday for another gift!</p>");
				$("#present-link").attr("href", "sounds/Magic_Christmas_by_Julie_Michelsen.mp3.zip");
			} else if (day1 >= 8 && day1 <= 14) {
				$("#instructions").replaceWith("<p>The Magic Cat gave you a special christmas card to send to your friends!<br>Come back on Sunday for another gift!</p>");
				$("#present-link").attr("href", "mc-christmas-card.pdf");
				console.log("test");
			} else if (day1 >= 15 && day1 <= 21) {
				$("#instructions").replaceWith("<p>The Magic Cat gave you a beautiful christmas wallpaper!<br>Come back on Sunday for another gift!</p>");
				$("#present-link").attr("href", "wallpapers/mc-christmas.zip");
			} else if (day1 >= 22 && day1 <= 26) {
				$("#instructions").replaceWith("<p>The Magic Cat App is free specially for christmas!<br>Have a very merry Christmas!</p>");
				$("#present-link").attr("href", "https://itunes.apple.com/app/magic-cat/id518982604?ls=1%26mt=8");
			} else if (day1 > 26) {
				$("#instructions").replaceWith("<p>A fish! The Magic Cat's favourite kind of present!</p>");
				$("#present-link a").remove();
			}
			//this.reset();
		}
	},
	reset: function()
	{
		this._cardFlipped = null;

		//reset again, so we can start over.
		this.numPairs = 0;
		for (var i = 0; i < this._cards.length; i++) {
			this._cards[i].reset();
		}
	}
};




// A card
function Card(el, posClass, index)
{
	this._el = el;
	this._index = index;
	this._flipCallback = null;
	this.partnerCard = null;
	this._flipTimer = 0;

	//used for when cards have been flipped in a successfull maner
	this._disabled = false;

	$(this._el).addClass(String(posClass));
	//added bind to work on touch
	$(this._el).bind("mouseup touchend",(UTILS.bind(this, this.onCardClick)));
}

Card.prototype.check = function(matchupCard)
{
	success = this.partnerCard == matchupCard;
	if(success)
	{
		this.disable();
		this.partnerCard.disable();
	}else
	{
		matchupCard.flip("back");
		this.flip("back");
	}

	return success;
};

Card.prototype.reset = function()
{
	//reset card
	this._disabled = false;
	$(this._el).removeClass("disabled");
	this.flip("back");
};

Card.prototype.flip = function(state)
{
	//if(this._disabled) return;
	clearTimeout(this._flipTimer);

	if(state == "front")
		$(this._el).addClass("selected");
	else
	{
		this._flipTimer = setTimeout(UTIL.bind(this, this.onFlipBack), 1000);
	}
};

Card.prototype.onFlipBack = function()
{
	$(this._el).removeClass("selected");
};

Card.prototype.disable = function()
{
	//diable card, so it cannot be clicked again, or flipped.
	this._disabled = true;
	$(this._el).addClass("disabled");
};

Card.prototype.addCardOnFlip = function(callback)
{
	this._flipCallback = callback;
};

Card.prototype.onCardClick = function(event)
{
	if(this._disabled || $(this._el).hasClass("selected")) return;

	this.flip("front");
	this._flipCallback(this);
};

Card.prototype.kiss = function(card)
{
	this.partnerCard = card;
};


