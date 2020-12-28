var ground, groundImage;
var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY=1;
var END=2;
var gameState=PLAY;


function preload() {

  monkey_running = loadAnimation("sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {

  createCanvas(600, 600);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background('lightgreen');
  if(gameState===PLAY) {
    handleJump();
    resetGround();
    createFood();
    createObstacle();
    
    // do score
    if (monkey.isTouching(bananaGroup)) {
      score=score+1;
      bananaGroup.destroyEach();
      // todo: delete individual sprite element
      // touched by the monkey to control the score
    }
    
    // prevent survival
    if(monkey.isTouching(obstacleGroup)) {
      gameState=END;
    }
  }
  
  if (gameState == PLAY) {
    
    survivalTime = Math.ceil(frameCount / frameRate());
    
  } else if(gameState==END) {
    
    stroke("red");
    textSize(30);
    fill("red");
    text("GAME OVER", 300,300);
    monkey.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);    
    ground.velocityX=0;

    // restart game
    if (keyDown("space")) {
      score=0;
      survivalTime=0;
      frameCount = 0;
      gameState = PLAY;
    }
  }
  
  drawSprites();

  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score, 400, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("survivalTime: " + survivalTime, 100, 50);
  //console.log(survivalTime);
  //console.log(frameRate()); 
  //console.log(frameCount);
}

function handleJump() {
  
  // jump on space key
  if (keyDown("space")) {
    monkey.velocityY = -10;
  }
  // add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
}

function resetGround() {
  // scroll ground
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
}

function createFood() {
  if ((World.frameCount % 80) === 0) {
    var randY = Math.round(random(120, 210));
    banana = createSprite(450, randY, 20, 20);
    banana.addImage(bananaImage);
    banana.lifetime = 140;
    banana.velocityX = -4;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  }
}

function createObstacle() {
  if ((World.frameCount % 300) === 0) {
    //var randX = Math.round(random(150, 550));
    obstacle = createSprite(600, 327, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 140;
    obstacle.velocityX = -4;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }
}
