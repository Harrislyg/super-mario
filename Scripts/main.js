$(document).ready(function () {

  var width = $(window).width();
  var height = $(window).height();

  var mario = $('.marioPerson');
  $(document).keydown(function (key) {
  switch(parseInt(key.which, 10)) {

  case 37:
  if(mario.position().left + 12 < 0) {
    console.log(mario.position().left);
    break;
  };
  mario.css({left: mario.position().left - 12});
  goombaCrash($('.marioPerson'), $('.goomba'));

  $('.marioPerson').css({'-moz-transform': 'scaleX(-1)',
        '-o-transform': 'scaleX(-1)',
        '-webkit-transform': 'scaleX(-1)',
        'transform': 'scaleX(-1)',
        'filter': 'FlipH',
        '-ms-filter': "FlipH"})

  // mario.animate({left: '-=10px'}, 'fast');
  break;


  case 38:
  // console.log(mario.position());
  // if(mario.position().top - 60 < 0) {
  //   mario.animate({top: 60})
  // }
  if(mario.position().top == (height - 87)) {
    mario.animate({bottom: '+=120px'}, 'fast', 'swing', function () {

    collision($('.marioPerson'), $('.mario'));//check if the coinbox and mario collide
    goombaCrash($('.marioPerson'), $('.goomba'));


    $("<audio></audio>").attr({
      'src':'http://themushroomkingdom.net/sounds/wav/smb/smb_jump-small.wav',
      'autoplay':'autoplay'
    }).appendTo("body");

    $(this).animate({bottom: '-=120px'}, 'medium', function() {
      goombaCrash($('.marioPerson'), $('.goomba'));//game over when Mario lands on the goomba

    });



  });
  };
  break;
  // case 40:
  // $('#mario').animate({bottom: "-=10px"}, 'fast');
  // break;
  case 39:
  if(mario.position().left + 52 > width) {
    console.log(mario.position().left);
    break;
  };
  mario.css({left: mario.position().left + 12});
  goombaCrash($('.marioPerson'), $('.goomba'));

if(  $('.marioPerson').css({'-moz-transform': 'scaleX(-1)',
        '-o-transform': 'scaleX(-1)',
        '-webkit-transform': 'scaleX(-1)',
        'transform': 'scaleX(-1)',
        'filter': 'FlipH',
        '-ms-filter': "FlipH"})) {
            $('.marioPerson').css({'-moz-transform': 'scaleX(1)',
                  '-o-transform': 'scaleX(1)',
                  '-webkit-transform': 'scaleX(1)',
                  'transform': 'scaleX(1)',
                  'filter': 'FlipH',
                  '-ms-filter': "FlipH"});
                }
  // mario.animate({left: "+=10px"}, 'fast');
  break;
  default:
  break;
  }
  });




});



//Invoke the coin box effect when the divs collide
var collide = function() {
  	var marioBox = $('div.mario');
  	marioBox.find('div.box').css('margin-top','-25px');
  	if (marioBox.find('span.coin').hasClass( "play" ) ) {
  		marioBox.find('div.box').addClass('empty');
  		$("<audio class='block'></audio>").attr({
  			'src':'http://adobewordpress.com/tasarim/include/block-sound.mp3',
  			'autoplay':'autoplay'
  		}).appendTo("body");
  		setTimeout(function(){
  			$('audio.block').remove();
  		}, 800);
  	}else{
  		$("<audio></audio>").attr({
  			'src':'http://adobewordpress.com/tasarim/include/gold-sound.mp3',
  			'autoplay':'autoplay'
  		}).appendTo("body");
  		marioBox.find('span.coin').addClass('play');
  		setTimeout(function(){
  			marioBox.find('div.box').addClass('empty');
  		}, 150);
  	}

  	setTimeout(function(){
  		marioBox.find('div.box').css('margin-top','0');
  	}, 200);
};

var goombaCollide = function() {
  	var marioJump = $('div.marioPerson');
  	marioJump.css('background-image','none');

    if(dying == true) {
		$("<audio class='enemy'></audio>").attr({
			'src':'http://themushroomkingdom.net/sounds/wav/smb/smb_mariodie.wav',
			'autoplay':'autoplay'
		}).appendTo("body");
  };


		marioJump.find('div.marioGameEnd').addClass('jump');

    marioJump.animate({bottom: '+=20px'}, 'fast', 'swing', function () {
      $(this).animate({bottom: '-=20px'}, 'fase');
    });

    $('body').css("animation-play-state", "paused");//stop background
    $('div.mario').css("animation-play-state", "paused");//stop coinbox
    $('.goomba').css("animation-play-state", "paused");
		// setTimeout(function(){
		// 	marioJump.find('div.marioPerson').addClass('lose');
		// }, 150);
    $('#gameOver').css('background-image', 'url(http://3.bp.blogspot.com/-ufn7rcPl6fQ/UylXqpnPiuI/AAAAAAAACWg/TG3DBhRSUvk/s1600/GameoverSMB.png)');

    // setInterval(function() {$('.enemy').remove();}, 700);
  	};



/* OFF-TOPIC */
// $('a.replay').click(function(){
// 	$('div.mario span.coin.play').removeClass('play');
// 	$('div.mario div.box').removeClass('empty');
// });

// var restart = function() {
//   $('div.mario span.coin.play').removeClass('play');
//   $('div.mario div.box').removeClass('empty');
// };

setInterval(function() {$('div.mario span.coin.play').removeClass('play');
$('div.mario div.box').removeClass('empty')}, 15000);

// if($('div.mario').css("left", "-100px")) {
//   console.log("passed");
//   restart();
// };


//COLLISION

/*COLLISION*/
function collision($div1, $div2) {
       var x1 = $div1.offset().left;
       var y1 = $div1.offset().top;
       var h1 = $div1.outerHeight(true);
       var w1 = $div1.outerWidth(true);
       var b1 = y1 + h1;
       var r1 = x1 + w1;
       var x2 = $div2.offset().left;
       var y2 = $div2.offset().top;
       var h2 = $div2.outerHeight(true);
       var w2 = $div2.outerWidth(true);
       var b2 = y2 + h2;
       var r2 = x2 + w2;

       if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
         return false;
       }
       else {
         collide();

         return true;

       }
     }

var dying = false;

function goombaCrash ($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        return false;
      }
      else if(!dying) {
        dying = true;
        goombaCollide();
      }

    }

setInterval(function () {goombaCrash($('.marioPerson'), $('.goomba'));}, 500);
