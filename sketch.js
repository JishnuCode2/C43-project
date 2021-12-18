var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;
var blast;

var life =5;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png");


  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 600);

  backBoard= createSprite(80, 400 , 60,90);
  backBoard.addImage(backBoardImg);
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  

  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,gun.y-180)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,gun.y-180)

  if(gameState===1){
    if(keyDown(UP_ARROW)){
      gun.y -= 8;
    }
    if(keyDown(DOWN_ARROW)){
      gun.y += 8;
    }
    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }
    if(score>=15){
      gameState = 3
    }

    drawSprites();
  }
  if(gameState === 2){

    heading.html("You lost. Press enter to play again")
    heading.style('color:red'); 
    heading.position(200,250)
 
    scoreboard.html("Your Score: "+score)
    scoreboard.style('color:red'); 
    scoreboard.position(340,280);


  }
  if(gameState === 3){
    heading.html("You Won")
    heading.style('color:red'); 
    heading.position(340,250)
 
    scoreboard.html("Press ENTER to play again")
    scoreboard.style('color:red'); 
    scoreboard.position(250,280);
    
  }
if(gameState !== 1){
  if(keyDown(ENTER)){
    gameState = 1
    score = 0
    life = 5
  }
}


  
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(80,700),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(60,720),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}



function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg)

   //  blast= sprite(bullet.x+60, bullet.y, 50,50);
   // blast.addImage(blastImg)

   //  blast= createSprite(bullet.x+60, bullet.y, 50,50);
   // blast.addImage(blastImg)

   //  blast= createSprite(bullet.x+60, bullet.y, 50,50);
   // image(blastImg)


   blast.scale=0.3
   blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
    }
  
}
