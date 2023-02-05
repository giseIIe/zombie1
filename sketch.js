var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet;
var bulletImg;
var bullets=100;
var zombieGroup;
var zombie, zombieImg;
var bulletGroup;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImg = loadImage("assets/bullet.png")
  zombieImg = loadImage ("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bulletGroup = new Group();
zombieGroup = new Group();
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 
spawnZombies();



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 bullet=createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.addImage(bulletImg)
 bullet.scale=0.06
 bulletGroup.add(bullet)

 //bullet.shapeColor="black"
 bullet.velocityX=20
bullet.depth=player.depth
player.depth=player.depth+1

if (bullets>0){
  bullets=bullets-1
}
 
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

drawSprites();

}

function spawnZombies (){
  if (frameCount%60===0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.velocityX=-3
    zombie.scale=0.15
    zombie.lifetime=500
    zombieGroup.add(zombie)
  }
}