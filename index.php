<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 9]><!--> <html class="no-js gt-ie9 non-ie" lang="en"> <!--<![endif]-->
  <head>
    <link rel="stylesheet" type="text/css" href="styles/style.css">
    <link rel="stylesheet" type="text/css" href="styles/cards.css">
    <link rel="icon" type="image/png" href="assets/fav.png">

    <script type="text/javascript" src="scripts/libs/rwatgg.plugins.js"></script>
    <script type="text/javascript" src="scripts/vendor/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="scripts/vendor/jquery.scrollview.js"></script>
    <script type="text/javascript" src="scripts/vendor/buzz.min.js"></script>
    <script type="text/javascript" src="scripts/vendor/modernizr.custom.35981.js"></script>
    <script type="text/javascript" src="scripts/vendor/responsiveslides.min.js"></script>
    <script type="text/javascript" src="scripts/themagiccat.js"></script>
    <script type="text/javascript" src="scripts/FlipCards.js"></script>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <?php
      require_once 'php/Mobile_Detect.php';
      $detect = new Mobile_Detect;
      if($detect->isMobile() && !$detect->isTablet())
      {
        echo '<meta name="viewport" content="width=device-width; initial-scale=0.5; maximum-scale=0.5;" />';
      }else
      {
        echo '<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />';
      }
    ?>
    <title>The Magic Cat!</title>
  </head>
  
<body>

<div id = "loading-message">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="214.976px" height="190.521px" viewBox="0 0 214.976 190.521" enable-background="new 0 0 214.976 190.521"
     xml:space="preserve">
  <g>
    <path fill="#FFFFFF" d="M69.466,3.591c-9.691,6.865-14.828,27.448-10.727,40.7c4.102,13.251,10.412,21.138,21.77,18.614
      c11.358-2.524,24.609-20.823,16.406-46.378C90.432-3.67,77.038-1.773,69.466,3.591z"/>
    <path fill="#FFFFFF" d="M129.727,6.746c-6.17,7.052-14.197,33.127-5.363,47.641s27.133,11.989,32.812-0.946
      c5.68-12.936,8.834-29.657,0.947-40.7C150.234,1.698,136.353-0.826,129.727,6.746z"/>
    <path fill="#FFFFFF" d="M193.143,50.285c9.169-0.204,19.561,7.888,21.454,25.556c1.893,17.668-3.155,34.389-18.615,34.706
      c-15.459,0.315-19.245-5.68-18.614-20.823C177.998,74.578,178.944,50.6,193.143,50.285z"/>
    <path fill="#FFFFFF" d="M23.718,51.231c12.32,0.725,17.353,14.513,17.353,34.074s-6.941,29.658-24.293,25.556
      S-2.784,85.305,2.58,73.632C7.943,61.958,12.991,50.6,23.718,51.231z"/>
    <path fill="#FFFFFF" d="M38.231,178.693c-13.059-8.036-24.609-27.448-12.305-35.651c12.305-8.203,35.021-11.674,35.336-22.4
      c0.315-10.728-4.417-32.497,12.936-33.128c17.353-0.631,23.031,4.417,31.55,3.155c8.519-1.262,12.304-12.305,27.449-7.888
      c15.144,4.417,22.085,14.829,19.245,27.133c-2.839,12.305-0.631,27.134,15.775,32.812s14.513,14.513,5.048,29.026
      c-9.465,14.513-15.459,14.197-27.764,10.411s-24.925,1.893-33.128,6.941c-8.203,5.048-11.673-4.732-20.192-8.519
      s-22.716,7.888-30.288,8.519C54.322,189.736,46.435,183.741,38.231,178.693z"/>
  </g>
  </svg>

</div>

<div id = "loading-both">
  <div id = "loading-wreath-xmas" class="xmas hide"></div>
  <div id = "loading-l"></div>
  <div id = "loading-r"></div>
</div>

<div id="bravo">
  <div id = "bravo-sprite"></div>
  <div id = "bravo-star"></div>
</div>

<div id="starburst"></div>

<div id="mute-audio" class="ignore-prevent-default hide"></div>

<div id="wrapper">


  <div id="mc-title"></div>
  <div id="teddy">
    <img src="assets/teddy.png" id="teddy-body" alt="Find Teddy!">
    <img src="assets/teddy-ear-l.png" id="teddy-ear-l" class="teddy-ear" alt="Find Teddy!">
    <img src="assets/teddy-ear-r.png" id="teddy-ear-r" class="teddy-ear" alt="Find Teddy!">
  </div>

  <div id="mc-book">
    <div id="mc-book-right" class="textdiv">
        <p>
          Welcome welcome! Come on in and get to know The Magic Cat!
        </p>
        <p>
          He can be your best friend and help you solve all your problems...
        </p>
        <p>
          When you have bad dreams, he will make them good. If you can’t find your teddy, his detective skills will help you find it. Should you be in a bad mood he will make you have so much fun that you can’t help but laugh!
        </p>
        <p>
          And are you hungry? Not a problem, The Magic Cat will cook you up a delicious treat of pancakes, popcorn… and herring.
        </p>
        <p>
          He may have pointy teeth and funny eyes, but don’t be fooled – his heart is as soft as his fur. As you can see, The Magic Cat is a purrrrrfect friend for you.
        </p>
    </div>
    <div id="mc-book-spine"></div>
    <div id="mc-book-flip">
        <div id="mc-book-front">
           <img src="assets/book-cover.png" alt="Magic Book">
        </div>
        <div id="mc-book-inside">
            <img src="assets/book-left.png" alt="Magic Book">
        </div>
    </div>
    <div id="mc-book-left-ie"><img src="assets/book-left.png" alt="Magic Book"></div>
  </div>

  <div id="clock">
      <div id="min"></div>
      <div id="hour"></div>
      <div id="clock-middle"></div>
  </div>


  <div id="handipad"></div>
  <div id="handipad-ie"></div>

  <a class="ignore-prevent-default" href="https://www.facebook.com/denmagiskekat" target="blank">
      <div id="friends" class="textdiv ignore-prevent-default button"></div>
  </a>

  <div id="mc-app" class="textdiv">
      <p>
        Come, follow The Magic Cat and Teddy on their feel good trip around the crazy universe of The Magic Cat! Tap your way through all the different animated scenes and enjoy sweet audio and visual treats along the way.
      </p>
  </div>

  <div id="weather-app" class="textdiv">
      <p>
        Whatever the weather, The Magic Cat will help you dress. With a special version of Vivaldis’ Four Seasons and Illustrations changing with the seasons, you’ll always discover something new.
      </p>
  </div>

  <div id="download-mc">
    <a class="ignore-prevent-default" href="https://itunes.apple.com/app/magic-cat/id518982604?ls=1%26mt=8" target="blank">
      <div class="app-store button">
        <img class="ignore-prevent-default" src="assets/app-store.png" alt="App Store">
      </div>
    </a>

    <div class="google-play button ignore-prevent-default">
      <a href="https://play.google.com/store/apps/details?id=air.DenMagiskeKat" target="blank">
        <img src="assets/google-play.png" alt="Google Play">
      </a>
    </div>
  </div>

  <div id="download-weather">
    <div class="app-store button ignore-prevent-default">
      <a class="ignore-prevent-default" href="https://itunes.apple.com/sl/app/magic-cat-weather-report/id655126693?mt=8" target="blank">
        <img class="ignore-prevent-default" src="assets/app-store.png" alt="App Store">
      </a>
    </div>
  </div>

  <a class="ignore-prevent-default button" href="http://www.juliemichelsen.dk" target="blank">
    <div class="ignore-prevent-default" id="julie">
      <img id="julie-singing" src="assets/julie-bg-hover.png" alt="Julie Michelsen">
    </div>
  </a>

  <a class="ignore-prevent-default button" href="http://canstore.tictail.com/" target="blank">
    <div class="ignore-prevent-default" id="shop"></div>
  </a>

  <div id="credits" class="textdiv">
    <img id="credits-title" src="assets/credits.png" alt="Credits">
      <ul>
        <li>
          Music by
            <a class="ignore-prevent-default button" href="http://www.juliemichelsen.dk" target="blank">
              Julie Michelsen
            </a>
        </li>
        <li>
          Magic Cat & Magic Weather Apps by <br/>
            <a class="ignore-prevent-default button" href = "http://www.bacondeczar.com" target="blank">
              Stine Hein and Felix Nielsen
            </a>
        </li>
        <li>
          Illustration and Concept by <br/>
            <a class="ignore-prevent-default button" href = "http://www.yeswecancan.com" target="blank">
              Stine Maria Aalykke
            </a>
        </li>
        <li>
          Website by
            <a class="ignore-prevent-default button" href = "http://www.isjackwild.com" target="blank">
              Jack Wild
            </a>
        </li>
      </ul>
  </div>

  <div id = "wallpapers" class="not-xmas">
    <div id="wallpaper"></div> 
    <a class="ignore-prevent-default button" href = "wallpapers/mc-space.zip" onclick="return confirm('Click OK to download <*)))<')">
      <div id="frame1" class="frame"></div>  
    </a>
    <a class="ignore-prevent-default button" href = "wallpapers/mc-star.zip" onclick="return confirm('Click OK to download <*)))<')">
      <div id="frame2" class="frame"></div>
    </a>
    <a class="ignore-prevent-default button" href = "wallpapers/mc-fan.zip" onclick="return confirm('Click OK to download <*)))<')">
      <div id="frame3" class="frame"></div>
    </a>
    <a class="ignore-prevent-default button" href = "wallpapers/mc-boat.zip" onclick="return confirm('Click OK to download <*)))<')">
      <div id="frame4" class="frame"></div>
    </a>
  </div>

  <div id="gallery" class="not-xmas">
    <div id="galleryframe"></div>     
  </div>

  <ul class="rslides not-xmas">
    <li><img src="images/1.jpg" alt=""></li>
    <li><img src="images/2.jpg" alt=""></li>
    <li><img src="images/3.jpg" alt=""></li>
    <li><img src="images/4.jpg" alt=""></li>
    <li><img src="images/5.jpg" alt=""></li>
  </ul> 


  <div id = "mc-day" class="day">
    <div id = "mc-eye-l-day" class="day"></div>
    <div id = "mc-eye-r-day" class="day"></div>
  </div>
  <div id = "note-1" class="note"></div>
  <div id = "note-2" class="day note"></div>
  <div id = "note-3" class="note"></div>
  <div id = "note-4" class="day note"></div>
  <div id = "note-5" class="note"></div>
  <div id = "note-6" class="day note"></div>
  <div id = "note-7" class="note"></div>
  <div id = "note-8" class="day note"></div>
  <div id = "note-9" class="note"></div>
  <div id = "umbrella-day" class="day"></div>
  <div id = "cloud-day" class="day"></div>
  <div id = "sun-day" class="day"></div>
  <div id = "sheets-day" class="day"></div>
  <div id = "butterfly-arc-day" class="day">
    <div id = "butterfly-day" class="day"></div>
  </div>
  <div id = "phone-day" class="day"></div>
  <div id = "statue-day" class="day">
    <img id="burp" src="assets/statue-burp-mouth-day.png" alt="burp">
  </div>
  <div id = "bird-day" class="day"></div>
  <div id = "fish-day" class="day">
    <img id="fish" src="assets/fish-body-day.png" alt="fish">
  </div>

  <div id = "raindrops" class="day">
    <div id = "raindrop-1" class="rain day"></div>
    <div id = "raindrop-2" class="rain day"></div>
    <div id = "raindrop-3" class="rain day"></div>
    <div id = "raindrop-4" class="rain day"></div>
    <div id = "raindrop-5" class="rain day"></div>
    <div id = "raindrop-6" class="rain day"></div>
    <div id = "raindrop-7" class="rain day"></div>
    <div id = "raindrop-8" class="rain day"></div>
    <div id = "raindrop-9" class="rain day"></div>
    <div id = "raindrop-10" class="rain day"></div>
  </div>


  <div id = "mc-night" class="night"></div>
  <div id = "fish-night" class="night"></div>
  <div id = "mc-hat-night" class="night"></div>

  <div id = "z-1" class = "night z"></div>
  <div id = "z-2" class = "night z"></div>
  <div id = "z-3" class = "night z"></div>
  <div id = "z-4" class = "night z"></div>
  <div id = "z-5" class = "night z"></div>
  <div id = "z-6" class = "night z"></div>
  <div id = "z-7" class = "night z"></div>
  <div id = "z-8" class = "night z"></div>
  <div id = "z-9" class = "night z"></div>

  <div id = "moon-night" class="night"></div>
  <div id = "lamps-night" class="night"></div>
  <div id = "light-off-night" class="night"></div>
  <div id = "tea-pot-night" class="night"></div>
  <div id = "tea-mug-night" class="night"></div>
  <div id = "tea-night" class="night"></div>
  <div id = "teddy-pj-night" class="night">
    <div id = "teddy-eye-l-night" class="night"></div>
    <div id = "teddy-eye-r-night" class="night"></div>
  </div>
  <div id = "coat-stand-night" class="night"></div>
  <div id = "coat-stand-mask-night" class="night"></div>
  <div id = "umbrella-night" class="night"></div>


  <div id = "mc-xmas" class="xmas">
    <div id = "mc-eye-l-xmas" class="xmas"></div>
    <div id = "mc-eye-r-xmas" class="xmas"></div>
    <div id = "mc-hat-xmas" class="xmas"></div>
  </div>

  <div id = "merry-xmas" class="xmas"></div>
  <div id = "tree-xmas" class="xmas"></div>
  <div id = "tree-star-xmas" class="xmas"></div>
  <div id = "santa-xmas" class="xmas"></div>
  <div id = "snowman-xmas" class="xmas"></div>
  <div id = "bell-xmas" class="xmas"></div>
  <div id = "lamp-xmas" class="xmas">
    <img id="lamp" src="assets/lamp-xmas.png" alt="lamp">
  </div>
  <div id = "lamp-off-xmas" class="xmas"></div>

  <div id="candle-outer" class="xmas">
    <div id="candle-top"></div>
    <div id="candle-main"></div>
    <div id="candle-flame"></div>
    <div id="candle-bottom"></div>
  </div>


  <div id="memory-game" class="xmas">
    <div id="cards" class="xmas">
    
      <div class="card" id="card0">
        <div class="front">
          <img src="assets/memory-front-1.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-1.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card1">
        <div class="front">
          <img src="assets/memory-front-2.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-2.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card2">
        <div class="front">
          <img src="assets/memory-front-3.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-3.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card3">
        <div class="front">
          <img src="assets/memory-front-4.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-4.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card4">
        <div class="front">
          <img src="assets/memory-front-5.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-5.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card5">
        <div class="front">
          <img src="assets/memory-front-6.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-6.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card6">
        <div class="front">
          <img src="assets/memory-front-7.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-7.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card7">
        <div class="front">
          <img src="assets/memory-front-8.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-8.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card8">
        <div class="front">
          <img src="assets/memory-front-9.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-9.png" alt="Back">
        </div>
      </div>

      <div class="card" id="card9">
        <div class="front">
          <img src="assets/memory-front-10.png" alt="Front">
        </div>
        <div class="back">
          <img src="assets/memory-back-10.png" alt="Back">
        </div>
      </div>
    </div>

    <div id = "present" class="xmas">
      <div id = "present-l"></div>
      <div id = "present-r"></div>
    </div>

    <a id = "present-link" class="ignore-prevent-default button" target = "blank">
      <div id= "download-gift-xmas" class= "xmas ignore-prevent-default button"></div>
    </a>

    <div id = "memory-instructions" class="xmas">
      <p id = "instructions">
        Match all the cards to get a special Christmas present from The Magic Cat!
      </p>
    </div>
  </div>

</div>


<!-- TRACKING -->
<script> 
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46039037-1', 'themagiccat.com');
  ga('send', 'pageview');

</script>


</body>
</html>
