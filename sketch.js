var PLAY = 1
var END = 0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup,stone
var score,survivalTime;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
}



function setup() {
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  score = 0;
  
  ground = createSprite(400,400,900,10);
  //added velocity and reset
  //ground.velocityX=-4;
  ground.x=ground.width/2;
  
  //console.log(ground.x);
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  survivalTime = 0;
}


function draw() {
  
    createCanvas(670,400);
    background("lightBlue");
  textSize(20);
  fill("black");
  text("Survival Time:"+survivalTime,100,50);
  
    if(ground.x<0) {
      ground.velocityX = -4;
      ground.x = ground.width/2
  }
  
  if(gameState===PLAY){
    //monkey.changeAnimation("running",monkey_running);
    
    //survivalTime=Math.ceil(frameCount/frameRate());
    survivalTime = Math.round(frameCount/frameRate());
  
  
      
  
   if(keyDown("space")){
    monkey.velocityY=-10
  }
  
  monkey.velocityY = monkey.velocityY + 0.3;
  
  monkey.collide(ground)
  
   if(World.frameCount%200===0){ 
    banana();
 }
   if(World.frameCount%300==0){ 
  obstacle();
 }
  
  
 if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
   score = score+1;
    } 
  if(monkey.isTouching(obstacleGroup)){
     gameState = END;
  }
  }
    //END
   if (gameState === END) {
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
     
     obstacleGroup.setLifetimeEach(-1);
     //bananaGroup.setLifetimeEach(-1);
     
     monkey.velocityY = 0;
     ground.velocityX = 0;
     
     stroke("red");
      fill("red");
      textSize(30);
    text("Game Over", 110, 200);
   }
  
   drawSprites();
   stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
   stroke("black");
  
  
   
  
}
function banana(){
  var banana=createSprite(670,Math.round(random(170,230)),10,10)
banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3
  bananaGroup.add(banana);
  banana.lifetime = 220;
}
function obstacle(){
var obstacle = createSprite(670,380,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2
  obstacle.velocityX = -5;
  obstacleGroup.add(obstacle);
  obstacle.lifetime = 150;
 
}




