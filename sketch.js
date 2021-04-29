var PLAY=1;
var END=0;
var gameState=1;

var gameoverSound,knifeSwooshSound;

var knife,fruit,monster,fruitGroup,monsterGroup,score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadImage("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");

  gameoverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
}



function setup() {
  createCanvas(600, 600);

   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7

  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){

    fruits();
    Monster();

    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
 
    if(fruitGroup.isTouching(knife)){
      score = score+2;
      fruitGroup.destroyEach();
      
    }
    else
    {
if(monsterGroup.isTouching(knife)){
   gameState=END;
      
    
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
 
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX = -8;
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
    if(position==1)
    {
    fruit.x=600;
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
      fruit.velocityX= 7;
      }
    }
    
    fruit.scale=0.2;
     fruit.debug=false;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}