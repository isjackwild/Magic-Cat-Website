var date = new Date();
var day = 30;
var bravo2 = new buzz.sound('sounds/bravo2', {formats: ['wav', 'mp3', 'ogg'], preload:true});

//Cards engine
var CardsEngine =
{

	//constants
	NUM_CARDS: 10,
	NUM_PAIR_BEFORE_SUCCESS: 1,

	numPairs: 0,

	_cards: null,
	_positions: null,
	_cardFlipped: null,

	

	init: function()
	{
		if (day > 26) {
				$("#instructions").replaceWith("<p>Match all the cards to see what<br>The Magic Cat got for Chrismas!</p>");
				$("#download-gift-xmas").css("background-image", "url('../assets/fish-large.png')");
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
				this._cardFlipped = null;
				this.numPairs++;

				this.checkSuccess();
			}else
			{
				console.log("flip cards back to their starting position");
				this._cardFlipped = null;
			}
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


			if (day >= 1 && day <= 7) {
				$("#instructions").replaceWith("<p>The Magic Cat gave you his Magic Christmas song!<br>Come back on Sunday for another gift!</p>");
				$("#present-link").attr("href", "sounds/Magic_Christmas_by_Julie_Michelsen.mp3");
			} else if (day >= 8 && day <= 14) {
				$("#instructions").replaceWith("<p>The Magic Cat gave you a special christmas card to send to your friends!<br>Come back on Sunday for another gift!</p>");
				$("#present-link").attr("href", "mc-christmas-card.pdf");
			} else if (day >= 15 && day <= 21) {
				$("#instructions").replaceWith("<p>The Magic Cat gave you a beautiful christmas wallpaper!<br>Come back on Sunday for another gift!</p>");
				$("#present-link").attr("href", "wallpapers/mc-christmas.zip");
			} else if (day >= 22 && day <= 26) {
				$("#instructions").replaceWith("<p>The Magic Cat gave you a Magic Cat App free download code!<br>Have a very merry Christmas!</p>");
				$("#present-link").attr("href", "https://itunes.apple.com/app/magic-cat/id518982604?ls=1%26mt=8");
			} else {
				$("#instructions").replaceWith("<p>A fish! The Magic Cat's favourite kind of present!</p>");
				$("#present-link a").remove();
			}
			//this.reset();
		}
	},
	reset: function()
	{
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
	$(this._el).bind("mousedown touchstart",(UTILS.bind(this, this.onCardClick)));
}

Card.prototype.check = function(matchupCard)
{
	clearTimeout(this._flipTimer);
	success = this.partnerCard == matchupCard;
	if(success)
	{
		this.disable();
		this.partnerCard.disable();
	}else
	{
		that = this;
		this._flipTimer = setTimeout(function()
		{
			matchupCard.flip("back");
			that.flip("back");
		}, 1000)
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
	if(state == "front")
		$(this._el).addClass("selected");
	else
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
	if(this._disabled) return;

	this.flip("front");

	this._flipCallback(this);
};

Card.prototype.kiss = function(card)
{
	this.partnerCard = card;
};


