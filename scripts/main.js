$(document).ready(function() {

  const RELOAD_TIME = 700; //vitesse d'apparition des points
  var colors = ['#A00000', '#650068', '#230A6E', '#008000', '#809A00', '#A08400', '#A05A00'];
  var firstColor, secondColor, timer, similarity;
  var clicked = false;
  var score = 0;


  $('#score-actual').html(score); //Initialisation du score dans le html

  //Fonction appellée lors du clic sur le bouton de lancement
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
    //Interval gérant le rechargement des points toutes les RELOAD_TIME secondes
    timer = setInterval(function () {
      if(similarity && !clicked){
        score--;
        $('#score-actual').html(score);
      }
      clicked = false;
      firstColor = colors[getRandomInt(colors.length)];
      secondColor = colors[getRandomInt(colors.length)];
      similarity = firstColor === secondColor;
      $('#square1').css('background-color', firstColor);
      $('#square2').css('background-color', secondColor);
    }, RELOAD_TIME);
  });

  //Fonction appellée lors du clic sur le bouton de réinitialisation
  $('#stop-game').on('click', function () {
    reinitGame();
  });

  //Fonction appellée lors du click sur le buzzer
  $('.buzzer').on('click', function () {
    if(clicked) { //Dans le cas ou tu as un doublon mais tu as déja pressé le buzzer sur ce doublon
      return;
    }
    if(similarity) { //Si tu appuyes et qu'il y a un doublon
      score++;
      $('#score-actual').html(score);
      clicked = true;
      $('.square').css('border', '10px solid green');
      setTimeout(function () {
        $('.square').css('border', '10px solid white');
      }, 100);
    } else { //Si tu appuyes alors qu'il n'y a pas de doublons de couleurs
      score--;
      $('#score-actual').html(score);
      $('.square').css('border', '10px solid red');
      setTimeout(function () {
        $('.square').css('border', '10px solid white');
      }, 100);
    }
  });

  /** Retourne un entier aléatoire compris entre 0 et max
   * @param {Number} max entier majorant l'interval de random sans être compris
   * @return {Number} entier aléatoire entre 0 et max-1
   */
  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //Réinitialise le jeu à l'état initial
  var reinitGame = function () {
    $('.square').addClass('presentation');
    $('#start-game').removeAttr("disabled");
    clearInterval(timer);
    $('#square1').css('background-color', '#447684');
    $('#square2').css('background-color', '#447684');
    $('.buzzer').css('display', 'none');
  }
});
