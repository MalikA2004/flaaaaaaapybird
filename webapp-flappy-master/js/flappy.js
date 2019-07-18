// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var height = 400;
var width = 790;
var gravity = 100;
var batman = [];
var superman = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

  // game.load.image("playerimg", "../assets/jamesBond.gif");
  game.load.image("playerimg2", "../assets/flappy_batman.png");
  game.load.image("playerimg", "../assets/star.png");
  game.load.image("backgroundImg", "../assets/png-night-sky-nightsky-png-1024.png");
  game.load.audio("Score", "../assets/point.ogg");
  game.load.image("pipeBlock", "../assets/pipe_pink.png")
  game.load.audio("music", "../assets/Queen-BohemianRhapsody.ogg")
  game.load.image("batman", "../assets/flappy_batman.png");
  game.load.image("superman", "../assets/flappy_superman.png")
  game.load.image("alien", "../assets/alien.png")



}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  game.sound.play("music");
  game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.image(0, 0, "backgroundImg");





  game.stage.setBackgroundColor("#55d997");
    game.input.onDown.add(clickHandler);

     player = game.add.sprite(50,80, "playerimg");
     game.physics.arcade.enable(player);

     player.body.gravity.y = 100  ;

     labelScore = game.add.text(20, 20, "0",  { font: "50px Arial", fill: "#FFC0CB"});

     game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(playerJump);


  var pipeInterval = 2.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval, generatePipe

  );

  generate();

  start();
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
    player, pipes, gameOver
  );
  if(player.body.y<0) {
      gameOver();
  }
  if(player.body.y>400) {
    gameOver();
  }
  for(var i = batman.length - 1; i >= 0; i--){
   game.physics.arcade.overlap(player, batman[i], function(){
     changeGravity(- 50);
     batman[i].destroy();
     batman.splice(i, 1);
   });
  }
  for(var i = superman.length - 1; i >= 0; i--){
   game.physics.arcade.overlap(player, superman[i], function(){
     changeGravity(+ 50);
     superman[i].destroy();
     superman.splice(i, 1);
   });
  }
}

function gameOver(){
  // location.reload();
  registerScore(score);
 game.state.restart();
 score = 0;
 gameGravity = 200;
}


function playerJump() {
  player.body.velocity.y = -95;
}

function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -220 ;
}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
  for (var y=gapStart; y > 0; y -= blockHeight) {
    addPipeBlock(width, y - blockHeight);
  }
  for(var y = gapStart + gapSize; y < height; y+= blockHeight) {
    addPipeBlock(width, y);
  }
   changeScore();
}
function moveRIGHT() {
  player.x = player.x + 10;
  changeScore();
}

function moveLEFT() {
  player.x = player.x - 10;
  changeScore();
}


function moveDOWN() {
  player.y = player.y + 10;
  changeScore();
}

function clickHandler(event) {
  var player2 = game.add.sprite(event.x, event.y, "playerimg");

  function changeGravity(g) {
    game.Gravity += g;
    player.body.gravity.y = gameGravity;
  }




}

// function spaceHandler() {
//    changeScore();
//
//    // game.sound.play("Score");
//  }

   function changeScore() {
     score = score + 1;
     labelScore.setText(score.toString())
     game.sound.play("Score");
   }

 function generateBatman(){
  var bonus = game.add.sprite(width, height, "batman");
  batman.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
 }

function generateSuperman() {
  var bonus = game.add.sprite(width, height, "superman");
  superman.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60, 100)

}


function generate() {
var diceRoll = game.rnd.integerInRange(1, 10);
if(diceRoll==1) {
generateBatman();
} else if(diceRoll==2) {
generateSuperman();
} else {
generatePipe();
}
}

function checkBonus(bonusArray, bonusEffect){
  for(var i = bonusArray.length - 1; i >=0; i--){
    game.phsics.arcade.overlap(player, bonusArray[i], function(){
      changeGravity(bonusEffect);
      bonusArray[i].destroy();
      bonusArray.splice(i,1);
    });
  }
}

// function start() {
//   ame.sound.play("music");
//   game.physics.startSystem(Phaser.Physics.ARCADE);
//
//    player.body.gravity.y = 100  ;
//
//    game.input
// .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
// .onDown.add(playerJump);
//
// var pipeInterval = 2.75 * Phaser.Timer.SECOND;
// game.time.events.loop(
//   pipeInterval, generatePipe
//
// );
// }
