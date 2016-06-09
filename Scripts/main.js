// $('.song').trigger('play');
//play song
var scoreCount = 0;

$(document).ready(function () {
  var width = $(window).width();
  var height = $(window).height();

  var mario = $('.marioPerson');
  $(document).keydown(function (key) {
  switch(parseInt(key.which, 10)) {

    case 81:
    location.reload();
    break;

//MOVE LEFT
  case 37:
  if(mario.position().left + 12 < 0) {
    console.log(mario.position().left);
    break;
  };
  mario.css({left: mario.position().left - 12});
  goombaCrash($('.marioPerson'), $('.goomba'));
  goombaCrash($('.marioPerson'), $('.koopa'));
  goombaCrash($('.marioPerson'), $('.plant'));
  goombaCrash($('.marioPerson'), $('.boom'));
  goombaCrash($('.marioPerson'), $('.tunnelPlant'));


  $('.marioPerson').css({'-moz-transform': 'scaleX(-1)',
        '-o-transform': 'scaleX(-1)',
        '-webkit-transform': 'scaleX(-1)',
        'transform': 'scaleX(-1)',
        'filter': 'FlipH',
        '-ms-filter': 'FlipH'});

  // mario.animate({left: '-=10px'}, 'fast');
  break;

//MOVE UP THEN DOWN
  case 32:
  // console.log(mario.position());
  // if(mario.position().top - 60 < 0) {
  //   mario.animate({top: 60})
  // }

  if(mario.position().top == (height - 87)) {
    moveUp = true;
    mario.animate({bottom: '+=120px'}, 'fast', 'swing', function () {

    collision($('.marioPerson'), $('.mario'));//check if the coinbox and mario collide
    goombaCrash($('.marioPerson'), $('.goomba'));
    goombaCrash($('.marioPerson'), $('.koopa'));
    goombaCrash($('.marioPerson'), $('.plant'));
    goombaCrash($('.marioPerson'), $('.boom'));
    goombaCrash($('.marioPerson'), $('.tunnelPlant'));






    $("<audio></audio>").attr({
      'src':'http://themushroomkingdom.net/sounds/wav/smb/smb_jump-small.wav',
      'autoplay':'autoplay'
    }).appendTo("body");

    $(this).animate({bottom: '-=120px'}, 'medium', function() {
      goombaCrash($('.marioPerson'), $('.goomba'));//game over when Mario lands on the goomba
      goombaCrash($('.marioPerson'), $('.koopa'));
      goombaCrash($('.marioPerson'), $('.plant'));
      goombaCrash($('.marioPerson'), $('.boom'));
      goombaCrash($('.marioPerson'), $('.tunnelPlant'));

      moveUp = false;

    });



  });
  };
  break;
  // case 40:
  // $('#mario').animate({bottom: "-=10px"}, 'fast');
  // break;

  //MOVE RIGHT
  case 39:
  if(mario.position().left + 125 > width) {
    console.log(mario.position().left);
    break;
  };

  if(!moveUp) {
  mario.css({left: mario.position().left + 12});
  goombaCrash($('.marioPerson'), $('.goomba'));
  goombaCrash($('.marioPerson'), $('.koopa'));
  goombaCrash($('.marioPerson'), $('.plant'));
  goombaCrash($('.marioPerson'), $('.boom'));
  goombaCrash($('.marioPerson'), $('.tunnelPlant'));

}
else {
  mario.css({left: mario.position().left + 15});
  goombaCrash($('.marioPerson'), $('.goomba'));
  goombaCrash($('.marioPerson'), $('.koopa'));
  goombaCrash($('.marioPerson'), $('.plant'));
  goombaCrash($('.marioPerson'), $('.boom'));
  goombaCrash($('.marioPerson'), $('.tunnelPlant'));

}

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
                }//if the image is reversed, then reverse it back to the original position
  // mario.animate({left: "+=10px"}, 'fast');
  break;
  default:
  break;
  }
  });




});//end of document

var moveUp = false;



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
      scoreCount ++;
      $('.score').html('<p>SCORE: '+scoreCount+' <img src="http://themushroomkingdom.net/images/ani/ani_smwcoin.gif"/><p>')
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
  console.log(true);
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
    $('.koopa').css("animation-play-state", "paused");
    $('.plant').css("animation-play-state", "paused");
    $('.boom').css("animation-play-state", "paused");
    $('.tunnel').css("animation-play-state", "paused");
    $('.tunnelPlant').css("animation-play-state", "paused");

    $('.song').trigger('pause');//pause song
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
$('div.mario div.box').removeClass('empty')}, 15000);//To make the the coin box reset

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

setInterval(function () {
  goombaCrash( $('.marioPerson'), $('.goomba'));
}, 300);
// setInterval(function () {goombaCrash($('.marioPerson'), $('#goomba2'));}, 300);
setInterval(function () {goombaCrash($('.marioPerson'), $('.koopa'));}, 300);
setInterval(function () {goombaCrash($('.marioPerson'), $('#koopa2'));}, 300);
setInterval(function () {goombaCrash($('.marioPerson'), $('.plant'));}, 300);
setInterval(function () {goombaCrash($('.marioPerson'), $('.boom'));}, 300);
setInterval(function () {goombaCrash($('.marioPerson'), $('.tunnelPlant'));}, 300);

setTimeout(function () {$('.goomba').css('display', 'block')}, 5000);
setTimeout(function () {$('#koopa2').css('display', 'block')}, 8000);
setTimeout(function () {$('.boom').css('display', 'block')}, 12000);
setTimeout(function () {$('.tunnel').css('display', 'block')}, 3000);
setTimeout(function () {$('.tunnelPlant').css('display', 'block')}, 3000);
