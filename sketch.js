var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,ground;
var gameState,time;
var PLAY=1;
var END=0;
var eat,over;

function preload(){
  
  monkey_running = loadAnimation("https://assets.editor.p5js.org/5fec426b882b050024f5a37d/c3528ae6-b883-49cb-bc59-cf14a5249fb1.png","https://assets.editor.p5js.org/5fec426b882b050024f5a37d/0eb16db3-cfff-438f-be1c-ca2479db517a.png","https://assets.editor.p5js.org/5fec426b882b050024f5a37d/98629eb7-d141-48ba-9d39-ff5429af3be8.png","https://assets.editor.p5js.org/5fec426b882b050024f5a37d/0e6f86aa-f2ec-4045-bf3c-118e86630d43.png","https://assets.editor.p5js.org/5fec426b882b050024f5a37d/72256fc4-8927-4ed1-9453-dfa06524fa43.png","https://assets.editor.p5js.org/5fec426b882b050024f5a37d/f9138352-4208-4d5f-9ea3-3d774d32f016.png","https://assets.editor.p5js.org/5fec426b882b050024f5a37d/1f84b284-50c9-4dc9-972b-6c2b8d91e701.png","https://assets.editor.p5js.org/5fec426b882b050024f5a37d/709d807e-05b1-43cb-af37-1fb0688dd391.png","https://assets.editor.p5js.org/5fec426b882b050024f5a37d/98f935b6-4611-42b9-9222-bb906ba288da.png")
  
  bananaImage = loadImage("https://assets.editor.p5js.org/5fec426b882b050024f5a37d/8efb1531-4f15-41ca-8acf-f62f910a6373.png");
  obstacleImage = loadImage("https://assets.editor.p5js.org/5fec426b882b050024f5a37d/2dbb2624-190b-43ea-8970-12f4ac4b269f.png");

  eat=loadSound("https://assets.editor.p5js.org/5fec426b882b050024f5a37d/d6fe2b21-cefc-431c-8dfd-89e5c78fc492.wav");
  over=loadSound("https://assets.editor.p5js.org/5fec426b882b050024f5a37d/9068fd61-cb01-49f0-8dba-745aef8bbb14.wav");
  
}



function setup() {
  createCanvas(500,500);

  monkey=createSprite(150,300,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  
  ground=createSprite(250,400,900,10);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  monkey.setCollider("circle",0,0,300);
  
  score=0;
  gameState=PLAY;
 
  time=0;
}


function draw() {
  background("lightblue");
     
  drawSprites();
  
  if(gameState===PLAY){
  ground.velocityX=-4;
  
  if(ground.x===50){
  ground.x=250;
  }  
    
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(keyDown("space")&&monkey.y>=347){
    monkey.velocityY=-14;
  }
    
  bananas();
  obstacles();
    
  time=time+Math.round(getFrameRate()/60);
    
     if(monkey.isTouching(obstacleGroup)){
       gameState=END;
       over.play();
     }
    
    if(monkey.isTouching(FoodGroup)){
      score=score+1;
      FoodGroup.destroyEach();
      eat.play();
    }
    
    
  } else if(gameState===END){
    textSize(20);
    fill("green");
    text("Press R to restart",180,200);
    
    monkey.velocityY=0;
    monkey.visible=false;
    
    ground.velocityX=0;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    
    if(gameState===END && keyDown("r")){
    gameState=PLAY;
      
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
      
    monkey.visible=true;
          
    score=0;
    time=0;
    }
  }
  
  textSize(20)
  fill("pink")
  text("Score: "+score,250,70);
  
  monkey.collide(ground);

}

function bananas(){
  if(frameCount%80===0){
    banana=createSprite(300,300,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6-time/80;
    banana.x=600;
    banana.y=Math.round(random(165,250));
    banana.lifetime=140;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%150===0){
    obstacle=createSprite(600,375,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-5-time/80;
    obstacle.lifetime=140;
    obstacleGroup.add(obstacle);
    
  }
}
