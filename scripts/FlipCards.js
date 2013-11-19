//Cards engine
var CardsEngine =
{
	//constants
	NUM_CARDS: 10,
	NUM_PAIR_BEFORE_SUCCESS: 3,

	numPairs: 0,

	_cards: null,
	_positions: null,
	_cardFlipped: null,

	init: function()
	{
		$("#wrapper, #loading-l, #loading-r, #bravo").hide();

		console.log("------- CARDS ENGINE INIT");
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
				console.log(i-1, i);
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
			}
		}

		this._cardFlipped = card;
	},
	checkSuccess: function()
	{
		if(this.numPairs == this.NUM_PAIR_BEFORE_SUCCESS)
		{
			console.log("GREAT SUCCESS! Now let's reset the cards");
			this.reset();
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

	//used for when cards have been flipped in a successfull maner
	this._disabled = false;

	$(this._el).addClass(posClass);
	$(this._el).click(UTILS.bind(this, this.onCardClick));
}

Card.prototype.check = function(matchupCard)
{
	if(this.partnerCard == matchupCard)
	{
		this.disable()
		this.partnerCard.disable()
		console.log("??")
		return true;
	}

	return false;
};

Card.prototype.reset = function()
{
	//reset card
	this._disabled = false;
	$(this._el).removeClass("disabled")
}

Card.prototype.disable = function()
{
	//diable card, so it cannot be clicked again, or turned.
	this._disabled = true;
	$(this._el).addClass("disabled");
	console.log($(this._el));
}

Card.prototype.addCardOnFlip = function(callback)
{
	this._flipCallback = callback;
};

Card.prototype.onCardClick = function(event)
{
	if(this._disabled) return;

	console.log(this._index );
	this._flipCallback(this);
};

Card.prototype.kiss = function(card)
{
	this.partnerCard = card;
};


