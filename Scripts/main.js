$(document).ready(function () {

var width = $(window).width();
var height = $(window).height();

var mario = $('#marioId');
$(document).keydown(function (key) {
switch(parseInt(key.which, 10)) {

case 37:
if(mario.position().left + 10 < 0) {
  console.log(mario.position().left);
  break;
};
mario.css({left: mario.position().left - 10});
// mario.animate({left: '-=10px'}, 'fast');
break;


case 38:
// console.log(mario.position());
// if(mario.position().top - 60 < 0) {
//   mario.animate({top: 60})
// }
if(mario.position().top == (height - 87)) {
  mario.animate({bottom: '+=100px'}, 'fast', 'swing', function() {
  $(this).animate({bottom: '-=100px'}, 'medium');
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
mario.css({left: mario.position().left + 10});
// mario.animate({left: "+=10px"}, 'fast');
break;
default:
break;
}
});


});


$('div.mario').click(function(){
	var mario = $(this);
	mario.find('div.box').css('margin-top','-25px');
	if (mario.find('span.coin').hasClass( "play" ) ) {
		mario.find('div.box').addClass('empty');
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
		mario.find('span.coin').addClass('play');
		setTimeout(function(){
			mario.find('div.box').addClass('empty');
		}, 150);
	}

	setTimeout(function(){
		mario.find('div.box').css('margin-top','0');
	}, 200);
});

/* OFF-TOPIC */
$('a.replay').click(function(){
	$('div.mario span.coin.play').removeClass('play');
	$('div.mario div.box').removeClass('empty');
});
