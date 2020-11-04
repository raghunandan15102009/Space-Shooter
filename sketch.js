var spaceShip, bullet, bulletGroup, gem, score = 0,
  coins = 0,
  gems = 0,
  deaths = 0,
  PLAY = 1,
  END = 0,
  START =2   
  gameState = START;
var backGround, scoreboard, coin, coinGroup, enemy, enemyGroup, diamondGroup, boundary1, boundary2, fake, fake2, fake3, fake4, fake5,player,overlap;

function preload() {
  spaceShipImg = loadAnimation("player.png");
  backGroundImg = loadImage("space.png");
  enemyImage = loadImage("enemy.png");
  coinImage = loadImage("coin.png");
  gemImage = loadImage("gem.png");
  missileImage = loadImage("missile.png");
  skullImage = loadAnimation("skull.png");
  heartImage = loadImage("heart.png");
  image1 = loadAnimation("blue shield.png");
  image2 = loadAnimation("red shield.png");
  image3 = loadAnimation("god.png");
  alienImage = loadImage("alien.png");
}

function setup() {
  createCanvas(400,400);
  backGround = createSprite(200,200,400,400);
  backGround.shapeColor = "pink";
  backGround.addImage(backGroundImg);
  backGround.scale = 0.5;
    overlap=createSprite(200,200,400,400);
  overlap.addImage(alienImage);
  overlap.scale=0.8
    spaceShip = createSprite(200, 300, 30, 30);
  spaceShip.addAnimation("spaceship", spaceShipImg);
  spaceShip.addAnimation("skull", skullImage);
  spaceShip.scale = 0.3;
  player=createSprite(200,70,20,20);
  player.addAnimation("blue",image1);
  player.addAnimation("red",image2);
  player.addAnimation("god",image3);
  player.scale=0.1;
  boundary1 = createSprite(0, 200, 1, 400);
  boundary2 = createSprite(400, 200, 1, 400);
  fake = createSprite(155, 45, 20, 20);
  fake.addImage(coinImage);
  fake.scale = 0.06;
  fake2 = createSprite(235, 45, 20, 20);
  fake2.addImage(gemImage);
  fake2.scale = 0.06;
  fake3 = createSprite(305, 45, 20, 20);
  fake3.addImage(heartImage);
  fake3.scale = 0.08
  fake4 = createSprite(335, 45, 20, 20);
  fake4.addImage(heartImage);
  fake4.scale = 0.08
  fake5 = createSprite(365, 45, 20, 20);
  fake5.addImage(heartImage);
  fake5.scale = 0.08
  bulletGroup = new Group();
  enemyGroup = new Group();
  coinGroup = new Group();
  diamondGroup = new Group();
}

function draw() {
  if(gameState===START&&keyDown("s")){
    gameState=PLAY
    overlap.visible=false;
    score=0;
  }

  overlap.depth=spaceShip.depth+1;
  overlap.depth=player.depth+1;
  overlap.depth=fake.depth+1;
  overlap.depth=fake2.depth+1;
  overlap.depth=fake3.depth+1;
  overlap.depth=fake4.depth+1;
  overlap.depth=fake5.depth+1;
  if (gameState === PLAY) {
    player.visible=false;
    spaceShip.setCollider("circle", 0, 0, 120);
    score = Math.round(frameCount / 2);
    spaceShip.collide(boundary1);
    spaceShip.collide(boundary2);
    if (keyWentDown("RIGHT_ARROW")) {
      spaceShip.velocityX = 8;
    }
    if (keyWentUp("RIGHT_ARROW")) {
      spaceShip.velocityX = 0;
    }
    if (keyWentDown("LEFT_ARROW")) {
      spaceShip.velocityX = -8;
    }
    if (keyWentUp("LEFT_ARROW")) {
      spaceShip.velocityX = 0;
    }
    if (frameCount % 50 === 0) {
      money();
    }
    if (frameCount % 100 === 0) {
      evil();
    }
    if (frameCount % 600 === 0) {
      diamond();
    }
    if (keyDown("space")) {
      fire();
    }
    if (bulletGroup.isTouching(enemyGroup)) {
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
    }
    if (spaceShip.isTouching(coinGroup)) {
      coinGroup.destroyEach();
      coins = coins + 1;
    }
    if (spaceShip.isTouching(diamondGroup)) {
      diamondGroup.destroyEach();
      gems = gems + 1;
    }
    if(score>=500){
      player.visible=true;
    }
    if(score===1000){
      player.visible=true;
      player.changeAnimation("red",image2);
    }
    if(score===5000){
      player.visible=true;
      player.changeAnimation("god",image3);
    }
  }
  if (spaceShip.isTouching(enemyGroup)) {
    enemyGroup.destroyEach();
    deaths = deaths + 1;
  }
  if (deaths >= 1) {
    fake3.visible = false;
  }
  if (deaths >= 2) {
    fake4.visible = false;
  }
  if (deaths === 3) {
    fake5.visible = false;
  }
  if (deaths === 3) {
    gameState = END;
  }
  drawSprites();
    if(gameState===START){
    inf();
    }
  if(gameState===PLAY){
  textSize(13)
  fill("blue")
  text("Score:" + score, 50, 50);
  text("X" + coins, 170, 50);
  text("X" + gems, 250, 50);
  } 
  if (gameState === END) {
    score = score + 0
    textSize(20);
    fill("red");
    text("GAME OVER", 140, 200);
    enemyGroup.setVelocityEach(0);
    coinGroup.setVelocityEach(0);
    diamondGroup.setVelocityEach(0);
    enemyGroup.setLifetimeEach(0);
    coinGroup.setLifetimeEach(0);
    diamondGroup.setLifetimeEach(0);
    score = score + 0;
    coins = 0;
    gems = 0;
    spaceShip.x = 200;
    spaceShip.y = 240;
    spaceShip.changeAnimation("skull", skullImage);
    player.visible=false;
    fake.visible=false;
    fake2.visible=false;
  }
}

function fire() {
  bullet = createSprite(50, 50, 3, 10);
  bullet.x = spaceShip.x;
  bullet.y = spaceShip.y;
  bullet.velocityY = -4;
  bullet.addImage(missileImage);
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
}

function money() {
  coin = createSprite(50, -20, 20, 20);
  coin.x = Math.round(random(50, 350));
  coin.velocityY = 6;
  coin.shapeColor = "yellow";
  coin.scale = 0.08;
  coin.addImage(coinImage);
  coinGroup.add(coin);
}

function evil() {
  enemy = createSprite(50, -20, 30, 30);
  enemy.x = Math.round(random(50, 350));
  enemy.velocityY = 3;
  enemy.shapeColor = "red";
  enemy.addImage(enemyImage);
  enemy.scale = 0.2;
  enemyGroup.add(enemy);
}
function diamond() {
  gem = createSprite(50, -20, 30, 30);
  gem.x = Math.round(random(50, 350));
  gem.velocityY = 6;
  gem.shapeColor = "blue";
  gem.addImage(gemImage);
  gem.scale = 0.1;
  diamondGroup.add(gem);
}
function inf (){
  textSize(14)
  textFont("algerian")
  fill("yellow")
  text("You are Agent-0043",20,50)
  text("Planet Earth is in danger.The kookabookas from ",20,75)
  text("Mars are trying to capture Earth.Your professor",20,100)
  text("and you have created a spaceship to fight against",20,125)
  text("the kookabookas ",20,150)
  text("-> movement: arrow keys ",20,175)
  text("-> attack:space bar",20,200)
  text("-> collect coins and gems ",20,225)
  text("-> three lives",20,250)
  text("-> survive more ,earn better badges",20,275);
  text("everyone has a mission and so do you.",60,300)   
  text("space shooter",150,325)
  text("press'S'to start",145,350)
}