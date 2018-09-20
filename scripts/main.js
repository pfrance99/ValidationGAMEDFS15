$(document).ready(function() {

  var colors = ['#A00000', '#650068', '#230A6E', '#008000', '#809A00', '#A08400', '#A05A00'];
  var firstColor, secondColor, timer, similarity, score;
  var clicked = false;


  $('#start-game').on('click', function () {
    $('.square').removeClass('presentation');
    $('#start-game').attr('disabled', 'disabled');
    score = 0;
    $('#score-actual').html(score);
    $('.buzzer').css('display', 'inline');
    clicked = false;
    firstColor = colors[getRandomInt(colors.length)];
    secondColor = colors[getRandomInt(colors.length)];
    similarity = firstColor === secondColor;
    $('#square1').css('background-color', firstColor);
    $('#square2').css('background-color', secondColor);
    timer = setInterval(function () {
      clicked = false;
      firstColor = colors[getRandomInt(colors.length)];
      secondColor = colors[getRandomInt(colors.length)];
      similarity = firstColor === secondColor;
      $('#square1').css('background-color', firstColor);
      $('#square2').css('background-color', secondColor);
    }, 1000);
  });

  $('#stop-game').on('click', function () {
    $('.square').addClass('presentation');
    $('#start-game').removeAttr("disabled");
    clearInterval(timer);
    $('#square1').css('background-color', '#447684');
    $('#square2').css('background-color', '#447684');
    $('.buzzer').css('display', 'none');
  });

  $('.buzzer').on('click', function () {
    if(clicked) {
      return;
    }
    if(similarity) {
      score++;
      $('#score-actual').html(score);
      clicked = true;
      $('.square').css('border', '10px solid green');
      setTimeout(function () {
        $('.square').css('border', '10px solid white');
      }, 100);
    } else {
      score--;
      $('#score-actual').html(score);
      $('.square').css('border', '10px solid red');
      setTimeout(function () {
        $('.square').css('border', '10px solid white');
      }, 100);
    }
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

});
