
canvasBg = document.getElementById('game');
ctxBg = canvasBg.getContext('2d');
canvasPlayer1 = document.getElementById('player1');
ctxPlayer1 = canvasPlayer1.getContext('2d');
canvasHUD = document.getElementById('HUD');
ctxHUD = canvasHUD.getContext('2d');

var game = {
	STATE_STARTING_SCREEN : 1,
	STATE_PLAYING : 2,
	STATE_GAMEOVER_SCREEN : 3,
	STATE_HELP_SCREEN : 4,
	STATE_DEAD_SCREEN : 5,
	STATE_STARTING_SCREEN2 : 6,
	state : 0,
	
	currentLevel: 0
};

var isPlaying = false;

var pressedKeys = [];
var KEY = {
	D: 68,
	A: 65,
	W: 87,
	S: 83,
	SHIFT: 16,
	SPACE: 32,
	C: 67,

	UP: 104,
	LEFT: 100,
	RIGHT: 102,
	DOWN: 101,
	ZERO: 96
};

var width;
var height;

var mouseX = 0;
var mouseY = 0;

var spd = 8;
var frameCount = 0;
var fps = 50;

var score = 0;
var newRectangles;
var factor = 150;
var factor2 = 350;  

var dragging;

//player variables
var bulletDelay;
var bulletDelay2;
var bulletList = [];
var bulletList2 = [];
var bullet1IsColliding;
var bullet1IsVisible = false;
var bulletSpd = 20;
var bd = 5;
var bd2 = 5;
var bulletPlayer1Sound = document.getElementById('bulletPlayer1');
bulletPlayer1Sound.volume = .2;
var playerHealth = 6;
var playerHealth2 = 6;
//player variables

var bulletDelay3;
var bd3 = 15;

//enemy variables
var enemyList1 = [];
var enemySpd = 2;
var enemyCount1 = 4;
var bulletEnemyList = [];
var enemyBulletDelay = Math.floor((Math.random() * 30) + 50);
var ebd = enemyBulletDelay;
var bulletDelayEnemy = ebd;
//enemy variables

//Bosses
var bossEnemyList1 = [];
var bulletBossEnemyList1 = [];
var bossHealth1 = 6;

var bossEnemyList2 = [];
var bulletBossEnemyList2 = [];
var bulletBossEnemyListt2 = [];
var bossHealth2 = 6;
var bbd = 10
var bossBulletDelay = bbd;
//Bosses

//image variables
var img = new Image();
img.src = "images/SeaTrial.png";
var planeImage1 = new Image();
planeImage1.src = "images/KillPlane1.png";
var planeImage2 = new Image();
planeImage2.src = "images/KillPlane2.png";
var planeBullet1 = new Image();
planeBullet1.src = "images/Bullet1.png";
var enemyImage1 = new Image();
enemyImage1.src = "images/EnemyOwn1.png";
var enemyBullet1 = new Image();
enemyBullet1.src = "images/EnemyBullet1.png";
var explosionImg = new Image();
explosionImg.src = "images/Explosion.png";
var healthBarImg = new Image();
healthBarImg.src = "images/HealthBar.png";
var healthItemImg = new Image();
healthItemImg.src = "images/HealthItem.png";
var healthBarImg2 = new Image();
healthBarImg2.src = "images/HealthBar2.png";
var coinItemImg = new Image();
coinItemImg.src = "images/GoldCoin.png";
var bossEnemyBullet1 = new Image();
bossEnemyBullet1.src = "images/EnemyBullet2.png";
var enemyImage3 = new Image();
enemyImage3.src = "images/EnemyOwn3.png";
var enemyBullet3 = new Image();
enemyBullet3.src = "images/EnemyBullet3-1.png";
var enemyBullett3 = new Image();
enemyBullett3.src = "images/EnemyBullet3-2.png";
//image variables

//object variables
var bg1 = new Background();
var bg2 = new Background();
var player1 = new Player();
var player2 = new Player();
//object variables

var explosionList = [];
var explosionSound = document.getElementById('explosion');
explosionSound.volume = .4;

var introSound = document.getElementById('menuSong');
introSound.volume = .4;

var gameSound = document.getElementById('gameSong');
gameSound.volume = .4;

//Button Objects
var playButton = new Button(230, 410, 355, 440);
var helpButton = new Button(205, 410, 450, 550);
var backHelpButton = new Button(435, 560, 740, 780);
var player1Button = new Button(145, 455, 200, 305);
var player2Button = new Button(130, 485, 325, 415);
var tryAgainButton = new Button(160, 390, 670, 705);
var mainMenuButton = new Button(160, 390, 750, 785);

//Health THings
var healthBarList = [];
var healthBarCount = 1;
var healthBarList2 = [];
var healthBarCount2 = 1;

//Item Things
var healthItemList = [];
var coinItemList = [];

var dead = false;
var dead2 = false;

var drawInterval;
var updateInterval;
var timer = 8;

function initialization(){
	player1.drawX = 575 / 2 - 22;
	player1.drawY = 550;

	bg2.drawY = -800;
	
	$(document).keydown(function(e){
		pressedKeys[e.which] = true;	});
	$(document).keyup(function(e){
		pressedKeys[e.which] = false;	});	

	bulletDelay = bd;
	bulletDelay3 = bd3;
}

function init() {	
	game.state = game.STATE_STARTING_SCREEN;
	document.removeEventListener('click', playGame1Player, false);
	document.removeEventListener('click', playGame2Player, false);
	document.addEventListener('click', menuScreen2, false);	
	document.addEventListener('click', helpScreen, false);

	introSound.loop = true;
	introSound.play();
	
	initialization();

	width = 575;
	height = 800;
}

function menuScreenTwo() {

	$('#game').removeClass().addClass('menuScreen2');
	if(game.state == game.STATE_STARTING_SCREEN2)
	{
		document.addEventListener('click', backHelp2, false);

		document.addEventListener('click', playGame1Player, false);
		document.addEventListener('click', playGame2Player, false);
	}
}

function helpScreenOne() {

	$('#game').removeClass().addClass('helpScreen');

	document.addEventListener('click', backHelp, false);
}

function Dead() {
	$('#game').removeClass().addClass('deadScreen');
	ctxBg.clearRect(0,0, width, height);
	ctxPlayer1.clearRect(0,0, width, height);
	ctxHUD.clearRect(0,0, width, height);

	document.addEventListener('click', tryAgain, false);
	document.addEventListener('click', mainMenu, false);
}

function Update() {
	$("#score").html("Score: " + (score));
	//plane movement
	plane1Movement();
	player1ScreenBoundary();
	
	if(pressedKeys[KEY.C])
	{
		shootBulletsPlayer1();
		//bulletPlayer1Sound.play();
	}
	else
	{
		bulletDelay = 1.0;
	}
	updateBulletsPlayer1();

	loadEnemies1();

	document.addEventListener('mousedown', mouseDownListener, false)

	shootBulletsEnemy1();
	updateBulletsEnemy1();
	updateCollision();
	updateHealthBar();
	checkPlayerHit();
	console.log(timer);
	if((dead) && (timer <= 8))
	{
		timer--;
	}
	if(timer <= 2)
	{
		game.state = game.STATE_DEAD_SCREEN;
		Dead();
		gameSound.pause();
		clearInterval(drawInterval);
		clearInterval(updateInterval);
		isPlaying = false;
	}

	if(!dead)
	{
		timer = 8;
	}
}

function Draw() {
	drawBackgrounds();
	drawPlayer1();
	drawBulletPlayer1();
	drawEnemies1();
	drawBulletEnemy1();
	drawExplosion();
	drawHealthBar();
	drawItem();		
}

function checkEnemyHit() {
	var x = Math.floor((Math.random() * 99) + 1);

	//Small Enemies
	for(var i = 0; i < enemyList1.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(bulletList[j].drawX >= enemyList1[i].drawX - (enemyList1[i].width/2) &&
				bulletList[j].drawX <= enemyList1[i].drawX + enemyList1[i].width &&
				bulletList[j].drawY >= enemyList1[i].drawY &&
				bulletList[j].drawY <= enemyList1[i].drawY + enemyList1[i].height)
			{
				var explosion = new Explosion(enemyList1[i].drawX, enemyList1[i].drawY);
				var healthItem = new Item(enemyList1[i].drawX, enemyList1[i].drawY);
				var coinItem = new Item(enemyList1[i].drawX, enemyList1[i].drawY);
				coinItem.width = 10;
				coinItem.height = 20;
				coinItem.img = coinItemImg;

				explosion.hasHit = true;
				explosionList.push(explosion);

				if(x > 85)
				{
					healthItemList.push(healthItem);
				}
				if(x < 90)
				{
					coinItemList.push(coinItem);
				}

				score += 20;
				enemyList1.splice(i, 1);
				bulletList.splice(j, 1);
				explosionSound.play();						
			}
		}
	}

	//Boss1
	for(var i = 0; i < bossEnemyList1.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(bulletList[j].drawX >= bossEnemyList1[i].drawX - (bossEnemyList1[i].width/2) &&
				bulletList[j].drawX <= bossEnemyList1[i].drawX + bossEnemyList1[i].width &&
				bulletList[j].drawY >= bossEnemyList1[i].drawY &&
				bulletList[j].drawY <= bossEnemyList1[i].drawY + bossEnemyList1[i].height)
			{
				var explosion = new Explosion(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				var healthItem = new Item(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				var coinItem = new Item(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				coinItem.width = 10;
				coinItem.height = 20;
				coinItem.img = coinItemImg;

				bossHealth1--;
				if(bossHealth1 == 0)
				{
					explosion.hasHit = true;
					explosionList.push(explosion);

					if(x > 85)
					{
						healthItemList.push(healthItem);
					}
					if(x < 90)
					{
						coinItemList.push(coinItem);
					}
					explosionSound.play();
					score += 100;
					
					bossEnemyList1.splice(i, 1);
					bossHealth1 = 6;
				}

				bulletList.splice(j, 1);
										
			}
		}
	}

	//Boss 2
	for(var i = 0; i < bossEnemyList2.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(bulletList[j].drawX >= bossEnemyList2[i].drawX &&
				bulletList[j].drawX <= bossEnemyList2[i].drawX + bossEnemyList2[i].width &&
				bulletList[j].drawY >= bossEnemyList2[i].drawY &&
				bulletList[j].drawY <= bossEnemyList2[i].drawY + bossEnemyList2[i].height)
			{
				var explosion = new Explosion(bossEnemyList2[i].drawX + 50, bossEnemyList2[i].drawY + 50);
				var healthItem = new Item(bossEnemyList2[i].drawX + 50, bossEnemyList2[i].drawY + 50);
				var coinItem = new Item(bossEnemyList2[i].drawX + 50, bossEnemyList2[i].drawY + 50);
				coinItem.width = 10;
				coinItem.height = 20;
				coinItem.img = coinItemImg;

				bossHealth2--;
				if(bossHealth2 == 0)
				{
					explosion.hasHit = true;
					explosionList.push(explosion);

					if(x > 85)
					{
						healthItemList.push(healthItem);
					}
					if(x < 90)
					{
						coinItemList.push(coinItem);
					}
					explosionSound.play();
					score += 100;
					
					bossEnemyList2.splice(i, 1);
					bossHealth2 = 6;
				}

				bulletList.splice(j, 1);
										
			}
		}
	}
}

function drawItem() {
	for(var i = 0; i < healthItemList.length; i++)
	{
		healthItemList[i].drawY += 3;
		healthItemList[i].draw();

		if(healthItemList[i].drawY >= 800)
		{
			healthItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < coinItemList.length; i++)
	{
		coinItemList[i].drawY += 3;
		coinItemList[i].draw();

		if(coinItemList[i].drawY >= 800)
		{
			coinItemList.splice(i, 1);
		}
	}	
}

function checkPlayerHit() {
	for(var i = 0; i < bulletEnemyList.length; i++)
	{
		if(bulletEnemyList[i].drawX >= player1.drawX - (player1.width/2) &&
			bulletEnemyList[i].drawX <= player1.drawX + player1.width &&
			bulletEnemyList[i].drawY >= player1.drawY &&
			bulletEnemyList[i].drawY <= player1.drawY + player1.height)
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth--;
			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			bulletEnemyList.splice(i, 1);	
		}
	}

	for(var i = 0; i < healthItemList.length; i++) 
	{
		if(healthItemList[i].drawX >= player1.drawX - (player1.width/2) &&
			healthItemList[i].drawX <= player1.drawX + player1.width &&
			healthItemList[i].drawY >= player1.drawY &&
			healthItemList[i].drawY <= player1.drawY + player1.height)
		{
			
			if (healthBarList.length < playerHealth && playerHealth < 6)
			{
				playerHealth++;
				var healthBar = new Health((playerHealth * 30) - 50);
				healthBarList.push(healthBar);
			}
			score += 20;
			healthItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < coinItemList.length; i++) 
	{
		if(coinItemList[i].drawX >= player1.drawX - (player1.width/2) &&
			coinItemList[i].drawX <= player1.drawX + player1.width &&
			coinItemList[i].drawY >= player1.drawY &&
			coinItemList[i].drawY <= player1.drawY + player1.height)
		{
			score += 20;
			coinItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < bulletBossEnemyList1.length; i++)
	{
		if(bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 >= player1.drawX - 50 &&
			bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 <= (player1.drawX + player1.width + 50) &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height >= player1.drawY &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height <= player1.drawY + player1.height)
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth -= 2;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			healthBarList.pop();
			bulletBossEnemyList1.splice(i, 1);	
		}
	}

	//boss 2 bullet 1
	for(var i = 0; i < bulletBossEnemyList2.length; i++)
	{
		if(bulletBossEnemyList2[i].drawX + bulletBossEnemyList2[i].width / 2 >= player1.drawX - 10 &&
			bulletBossEnemyList2[i].drawX + bulletBossEnemyList2[i].width / 2 <= (player1.drawX + player1.width + 10) &&
			bulletBossEnemyList2[i].drawY + bulletBossEnemyList2[i].height >= player1.drawY &&
			bulletBossEnemyList2[i].drawY + bulletBossEnemyList2[i].height <= player1.drawY + player1.height)
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth -= 1;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			bulletBossEnemyList2.splice(i, 1);	
		}
	}

	//boss 2 bullet 2
	for(var i = 0; i < bulletBossEnemyListt2.length; i++)
	{
		if(bulletBossEnemyListt2[i].drawX + bulletBossEnemyListt2[i].width / 2 >= player1.drawX - 4 &&
			bulletBossEnemyListt2[i].drawX + bulletBossEnemyListt2[i].width / 2 <= (player1.drawX + player1.width + 4) &&
			bulletBossEnemyListt2[i].drawY + bulletBossEnemyListt2[i].height >= player1.drawY &&
			bulletBossEnemyListt2[i].drawY + bulletBossEnemyListt2[i].height <= player1.drawY + player1.height)
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth -= 2;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			healthBarList.pop();
			bulletBossEnemyListt2.splice(i, 1);	
		}
	}
}

function drawExplosion () {
	for(var i = 0; i < explosionList.length; i++)
	{			
			explosionList[i].draw();
			explosionList[i].update();
	}
}

function updateCollision() {
	for(var i = 0; i < explosionList.length; i++)
	{	
		if(!explosionList[i].hasHit)
		{		
			explosionList.splice(i, 1);
		}
	}
	checkEnemyHit();
}

function updateHealthBar() {
	if (healthBarCount < playerHealth)
	{
		healthBarCount++;
		var healthBar = new Health((healthBarCount * 30) - 50);
		healthBarList.push(healthBar);
	}	
}

function drawHealthBar() {
	ctxHUD.clearRect(0,0,575,800);
	for(var i = 0; i < healthBarList.length; i++)
	{
		healthBarList[i].draw();
	}	
}
//Background functions
function drawBackgrounds() {
	ctxBg.clearRect(0,0,575,800);	
	bg1.draw();
	bg2.draw();
	if(bg1.drawY >= height)
	{
		bg1.drawY = 0;
		bg2.drawY = -height;
	}
}
//Player1 Functions
function plane1Movement() {
	if(pressedKeys[KEY.D])
	{
		player1.drawX += spd;
	}
	if(pressedKeys[KEY.A])
	{
		player1.drawX -= spd;
	}
	if(pressedKeys[KEY.W])
	{
		player1.drawY -= spd;
	}
	if(pressedKeys[KEY.S])
	{
		player1.drawY += spd;
	}
	if(pressedKeys[KEY.SHIFT])
	{
		spd = 13;
	}
	else
	{
		spd = 8;
	}
}

function drawPlayer1(){
	ctxPlayer1.clearRect(0, 0, 575, 800);
	//playerHealth >= 1
	if(!dead)
	{
		player1.draw();
	}

	if(pressedKeys[KEY.D])
	{
		player1.srcY = 0;
		frameCount++;

	    player1.srcX = (frameCount * player1.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }    
	}
	
	if((!pressedKeys[KEY.D]) && (!pressedKeys[KEY.A]))
	{
		frameCount = 0;
		player1.srcX = (frameCount * player1.width);
	}

	if(pressedKeys[KEY.A])
	{
		frameCount++;

	    player1.srcX = (frameCount * player1.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }

	    player1.srcY = 64;
	}
}

function player1ScreenBoundary() {
	if (player1.drawX <= 0 - 2) {
		player1.drawX = 0 - 2;
	}
	if (player1.drawX >= width - 42) {
		player1.drawX = width - 42;	
	}
	if (player1.drawY <= 0) {
		player1.drawY = 0;
	}
	if (player1.drawY >= height - 64) {
		player1.drawY = height - 64;
	}
}

function shootBulletsPlayer1() {
	if(bulletDelay >= 0)
	{
		bulletDelay--;
	}

	if(bulletDelay <= 0)
	{
		var newBulletPlayer1 = new Bullet(player1.drawX + 14, player1.drawY + 32);
		bullet1IsVisible = true;

		if(bulletList.length < 20)
		{
			bulletList.push(newBulletPlayer1);
		}
	}

	if (bulletDelay == 0)
		bulletDelay = bd;
}

function updateBulletsPlayer1() {
	for(var i = 0; i < bulletList.length; i++)
	{
		bulletList[i].drawY -= bulletSpd;

		if(bulletList[i].drawY <= -10)
		{
			bulletList.splice(i, 1);
		}
		
	}
}

function drawBulletPlayer1(){	
	for(var i = 0; i < bulletList.length; i++) {
		bulletList[i].draw();

		
	}		
}

//Enemy Functions
function loadEnemies1() {
	
	var x = Math.floor((Math.random() * 525) + 25);
	var y = Math.floor((Math.random() * -400) - 100);

	var newEnemy1 = new Enemy(x, y);

	var bossImage1 = new Image();
	bossImage1.src = "images/EnemyOwn2.png";
	var newBoss1 = new Enemy(Math.floor((Math.random() * 350) + 75), y);
	newBoss1.width = 100;
	newBoss1.height = 100;
	newBoss1.img = bossImage1;

	var newBoss2 = new Enemy(Math.floor((Math.random() * 150) + 100), y);
	newBoss2.width = 300;
	newBoss2.height = 100;
	newBoss2.img = enemyImage3;

	if(enemyList1.length < enemyCount1)
	{
		enemyList1.push(newEnemy1);		
	}

	//boss 1 logic
	//so when the score is 160 or 180, boss one will appear
	//will keep on respawn on every 300 score
	if ((score % factor == 10) || (score % factor == 30))
	{
		enemyCount1++;
		factor += 300;
		bossEnemyList1.push(newBoss1);
	}

	//boss 2 logic
	if(score % factor2 == 10)
	{
		factor2 += 600;
		bossEnemyList2.push(newBoss2);
	}

	//movement
	for (var i = 0; i < enemyList1.length; i++)
	{
		enemyList1[i].drawY += enemySpd;

		if(enemyList1[i].drawY >= 800)
		{
			enemyList1.splice(i, 1);
		}
	}

	for (var i = 0; i < bossEnemyList1.length; i++)
	{
		bossEnemyList1[i].drawY += enemySpd;

		if(bossEnemyList1[i].drawY >= 800)
		{
			bossEnemyList1.splice(i, 1);
		}
	}

	for (var i = 0; i < bossEnemyList2.length; i++)
	{
		bossEnemyList2[i].drawY += enemySpd;

		if(bossEnemyList2[i].drawY >= 800)
		{
			bossEnemyList2.splice(i, 1);
		}
	}
}

function drawEnemies1() {
	for(var i = 0; i < enemyList1.length; i++) {
		enemyList1[i].draw();
	}
	for (var i = 0; i < bossEnemyList1.length; i++) {
		bossEnemyList1[i].draw();
	}
	for (var i = 0; i < bossEnemyList2.length; i++) {
		bossEnemyList2[i].draw();
	}
}

function shootBulletsEnemy1() {
	if(bulletDelayEnemy > 0)
	{
		bulletDelayEnemy--;
	}

	if(bossBulletDelay > 0)
	{
		bossBulletDelay--;
	}

	for (var i = 0; i < enemyList1.length; i++)
	{	
		var newBulletEnemy1 = new Bullet(enemyList1[i].drawX + 3, enemyList1[i].drawY + 11);
		newBulletEnemy1.width = 28;
		newBulletEnemy1.img = enemyBullet1;

		if(bulletDelayEnemy <= 0)
		{
			if(bulletEnemyList.length < 5)
			{
				bulletEnemyList.push(newBulletEnemy1);
			}
		}
	}
	for (var i = 0; i < bossEnemyList1.length; i++)
	{
		var newBulletBoss1 = new Bullet(bossEnemyList1[i].drawX + 12, bossEnemyList1[i].drawY + 100);
		newBulletBoss1.width = 68;
		newBulletBoss1.height = 50;
		newBulletBoss1.img = bossEnemyBullet1;

		if(bulletDelayEnemy <= 0)
		{
			if(bulletBossEnemyList1.length < 3)
			{
				bulletBossEnemyList1.push(newBulletBoss1);
			}
		}
	}

	for (var i = 0; i < bossEnemyList2.length; i++)
	{
		var newBulletBoss1 = new Bullet(bossEnemyList2[i].drawX + 53, bossEnemyList2[i].drawY + 90);
		newBulletBoss1.width = 15;
		newBulletBoss1.height = 10;
		newBulletBoss1.img = enemyBullet3;

		var newBulletBoss2 = new Bullet(bossEnemyList2[i].drawX + 225, bossEnemyList2[i].drawY + 90);
		newBulletBoss2.width = 15;
		newBulletBoss2.height = 10;
		newBulletBoss2.img = enemyBullet3;

		if(bossBulletDelay <= 0)
		{
			if(bulletBossEnemyList2.length < 16)
			{
				bulletBossEnemyList2.push(newBulletBoss1);
				bulletBossEnemyList2.push(newBulletBoss2);
			}
		}
	}

	for (var i = 0; i < bossEnemyList2.length; i++)
	{
		var newBulletBoss1 = new Bullet(bossEnemyList2[i].drawX + 123, bossEnemyList2[i].drawY + 98);
		newBulletBoss1.width = 8;
		newBulletBoss1.height = 24;
		newBulletBoss1.img = enemyBullett3;

		var newBulletBoss2 = new Bullet(bossEnemyList2[i].drawX + 170, bossEnemyList2[i].drawY + 98);
		newBulletBoss2.width = 8;
		newBulletBoss2.height = 24;
		newBulletBoss2.img = enemyBullett3;

		if(bulletDelayEnemy <= 0)
		{
			if(bulletBossEnemyListt2.length < 4)
			{
				bulletBossEnemyListt2.push(newBulletBoss1);
				bulletBossEnemyListt2.push(newBulletBoss2);
			}
		}
	}

	if (bulletDelayEnemy == 0)
		bulletDelayEnemy = ebd;

	if (bossBulletDelay == 0)
		bossBulletDelay = bbd;
}

function updateBulletsEnemy1() {

	for(var i = 0; i < bulletEnemyList.length; i++)
	{
		bulletEnemyList[i].drawY += 10;

		if(bulletEnemyList[i].drawY >= 800)
		{
			bulletEnemyList.splice(i, 1);
		}
	}

	for (var i = 0; i < bulletBossEnemyList1.length; i++)
	{
		bulletBossEnemyList1[i].drawY += 8;

		if(bulletBossEnemyList1[i].drawY >= 800)
		{
			bulletBossEnemyList1.splice(i, 1);
		}
	}

	for (var i = 0; i < bulletBossEnemyList2.length; i++)
	{
		bulletBossEnemyList2[i].drawY += 8;

		if(bulletBossEnemyList2[i].drawY >= 800)
		{
			bulletBossEnemyList2.splice(i, 1);
		}
	}

	for (var i = 0; i < bulletBossEnemyListt2.length; i++)
	{
		bulletBossEnemyListt2[i].drawY += 15;

		if(bulletBossEnemyListt2[i].drawY >= 800)
		{
			bulletBossEnemyListt2.splice(i, 1);
		}
	}
}

function drawBulletEnemy1(){
	for(var i = 0; i < bulletEnemyList.length; i++) {
		bulletEnemyList[i].draw();
	}

	for(var i = 0; i < bulletBossEnemyList1.length; i++) {
		bulletBossEnemyList1[i].draw();
	}

	for(var i = 0; i < bulletBossEnemyList2.length; i++) {
		bulletBossEnemyList2[i].draw();
	}

	for(var i = 0; i < bulletBossEnemyListt2.length; i++) {
		bulletBossEnemyListt2[i].draw();
	}
}

//Classes
//Player1


function Button(left, right, top, bottom){
	this.l = left;
	this.r = right;
	this.t = top;
	this.b = bottom;
}

Button.prototype.ButtonClicked = function () {
	if(this.l <= mouseX && mouseX <= this.r && this.t <= mouseY && mouseY <= this.b)
		return true;
}

//Event Functions
function menuScreen2(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(playButton.ButtonClicked())
	{
		if(game.state == game.STATE_STARTING_SCREEN)
		{			
			game.state = game.STATE_STARTING_SCREEN2;
			menuScreenTwo();
			//setInterval(Draw, fps);
			//setInterval(Update, fps);
			
		}		
	}
}

function helpScreen(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(helpButton.ButtonClicked())
	{
		if(game.state == game.STATE_STARTING_SCREEN)
		{			
			game.state = game.STATE_HELP_SCREEN;
			helpScreenOne();
			//setInterval(Draw, fps);
			//setInterval(Update, fps);
		}		
	}
}

function backHelp(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(backHelpButton.ButtonClicked())
	{
		if(game.state == game.STATE_HELP_SCREEN)
		{			
			game.state = game.STATE_STARTING_SCREEN;
			$('#game').removeClass().addClass('menuScreen');
			//setInterval(Draw, fps);
			//setInterval(Update, fps);
		}		
	}
}

function backHelp2(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(backHelpButton.ButtonClicked())
	{
		if(game.state == game.STATE_STARTING_SCREEN2)
		{			
			game.state = game.STATE_STARTING_SCREEN;
			init();
			$('#game').removeClass().addClass('menuScreen');
			//setInterval(Draw, fps);
			//setInterval(Update, fps);

			document.removeEventListener('click', playGame1Player, false);
			document.removeEventListener('click', playGame2Player, false);
		}		
	}
}

function playGame1Player(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	
	if(!isPlaying)
	{
		if(player1Button.ButtonClicked())
		{
			if(game.state == game.STATE_STARTING_SCREEN2)
			{			
				game.state = game.STATE_PLAYING;
				$('#game').removeClass().addClass('playGame1');
				drawInterval = setInterval(Draw, fps);
				updateInterval = setInterval(Update, fps);
				introSound.pause();
				gameSound.loop = true;
				gameSound.play();
			}		
		}
	}
}

function playGame2Player(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	
	if(!isPlaying)
	{
		if(player2Button.ButtonClicked())
		{
			if(game.state == game.STATE_STARTING_SCREEN2)
			{			
				game.state = game.STATE_PLAYING;
				$('#game').removeClass().addClass('playGame1');
				setInterval(Draw2, fps);
				setInterval(Update2, fps);

				player1.drawX = 575 / 4 - 22;
				player1.drawY = 550;

				player2.drawX = (((575 / 2) + (575 / 4)) + 22);
				player2.drawY = 550;

				bulletDelay2 = bd2;

				introSound.pause();
				gameSound.loop = true;
				gameSound.play();
			}		
		}
	}
}

function tryAgain(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(!isPlaying)
	{
		if(tryAgainButton.ButtonClicked())
		{
			if(game.state == game.STATE_DEAD_SCREEN)
			{			
				game.state = game.STATE_PLAYING;
				$('#game').removeClass().addClass('playGame1');
				drawInterval = setInterval(Draw, fps);
				updateInterval = setInterval(Update, fps);
				ctxBg.clearRect(0,0, width, height);
				ctxPlayer1.clearRect(0,0, width, height);
				ctxHUD.clearRect(0,0, width, height);
				introSound.pause();
				gameSound.loop = true;
				gameSound.play();
				dead = false;
				playerHealth = 6;
				healthBarCount = 1;
				isPlaying = true;
				score = 0;
			}		
		}
	}
}

function mainMenu(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(mainMenuButton.ButtonClicked())
	{
		if(game.state == game.STATE_DEAD_SCREEN)
		{			
			init();
			dead = false;
			$('#game').removeClass().addClass('menuScreen');
		}		
	}
}



//try only
//if u click the player it follows the mouse and shoots
function mouseDownListener(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	
	if(player1.drawX <= mouseX && mouseX <= player1.drawX + player1.width && player1.drawY <= mouseY && mouseY <= player1.drawY + player1.height)
	{
		if(game.state == game.STATE_PLAYING)
		{			
			dragging = true;
		}		
	}

	if(dragging)
	{
		document.addEventListener('mousemove', mouseMoveListener, false);
	}
	document.removeEventListener('mousedown', mouseDownListener, false);
	document.addEventListener('mouseup', mouseUpListener, false);
}

function mouseMoveListener(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	
	if(player1.drawX <= mouseX && mouseX <= player1.drawX + player1.width && player1.drawY <= mouseY && mouseY <= player1.drawY + player1.height)
	{
		if(game.state == game.STATE_PLAYING)
		{			
			player1.drawX = mouseX - (player1.width / 2);
			player1.drawY = mouseY - (player1.height / 2);
			shootBulletsPlayer123();
			console.log(bulletDelay3);
		}		
	}
}

function mouseUpListener(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	document.addEventListener("mousedown", mouseDownListener, false);
	document.removeEventListener("mouseup", mouseUpListener, false);
	if (dragging) {
		dragging = false;
		document.removeEventListener("mousemove", mouseMoveListener, false);
	}
}


/*
function shootBulletsPlayer123() {
	if(bulletDelay3 >= 0)
	{
		bulletDelay3--;
	}

	if(bulletDelay3 <= 0)
	{
		var newBulletPlayer1 = new Bullet(player1.drawX + 14, player1.drawY + 32);
		bullet1IsVisible = true;

		if(bulletList.length < 20)
		{
			bulletList.push(newBulletPlayer1);
		}
	}

	if (bulletDelay3 == 0)
		bulletDelay3 = bd3;
}



//Player 2 Mode

function Update2() {

	$("#score").html("Score: " + (score));
	//plane movement
	plane2Movement();
	player2ScreenBoundary();
	
	if(pressedKeys[KEY.C])
	{
		shootBulletsPlayer1();
		//bulletPlayer1Sound.play();
	}
	else
	{
		bulletDelay = 1.0;
	}
	updateBulletsPlayer1();

	if(pressedKeys[KEY.ZERO])
	{
		shootBulletsPlayer2();
	}
	updateBulletsPlayer2();

	loadEnemies1();

	shootBulletsEnemy1();
	updateBulletsEnemy1();
	updateCollision2();
	updateHealthBar2();
	checkPlayerHit2();
	checkEnemyHit2();
}

function Draw2() {
	drawBackgrounds();
	drawPlayer2();
	drawBulletPlayer1();
	drawBulletPlayer2();
	drawEnemies1();
	drawBulletEnemy1();
	drawExplosion();
	drawHealthBar2();
	drawItem();			
}

function drawPlayer2(){
	ctxPlayer1.clearRect(0, 0, 575, 800);
	player1.draw();

	if(pressedKeys[KEY.D])
	{
		player1.srcY = 0;
		frameCount++;

	    player1.srcX = (frameCount * player1.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }    
	}	
	if((!pressedKeys[KEY.D]) && (!pressedKeys[KEY.A]))
	{
		frameCount = 0;
		player1.srcX = (frameCount * player1.width);
	}
	if(pressedKeys[KEY.A])
	{
		frameCount++;

	    player1.srcX = (frameCount * player1.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }

	    player1.srcY = 64;
	}

	//player 2
	
	player2.img = planeImage2;
	player2.draw();

	if(pressedKeys[KEY.RIGHT])
	{
		player2.srcY = 0;
		frameCount++;

	    player2.srcX = (frameCount * player2.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }    
	}	
	if((!pressedKeys[KEY.RIGHT]) && (!pressedKeys[KEY.LEFT]))
	{
		frameCount = 0;
		player2.srcX = (frameCount * player2.width);
	}
	if(pressedKeys[KEY.LEFT])
	{
		frameCount++;

	    player2.srcX = (frameCount * player2.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }

	    player2.srcY = 64;
	}
}

function plane2Movement() {
	if(pressedKeys[KEY.D])
	{
		player1.drawX += spd;
	}
	if(pressedKeys[KEY.A])
	{
		player1.drawX -= spd;
	}
	if(pressedKeys[KEY.W])
	{
		player1.drawY -= spd;
	}
	if(pressedKeys[KEY.S])
	{
		player1.drawY += spd;
	}
	if(pressedKeys[KEY.SHIFT])
	{
		spd = 13;
	}
	else
	{
		spd = 8;
	}

	if(pressedKeys[KEY.RIGHT])
	{
		player2.drawX += spd;
	}
	if(pressedKeys[KEY.LEFT])
	{
		player2.drawX -= spd;
	}
	if(pressedKeys[KEY.UP])
	{
		player2.drawY -= spd;
	}
	if(pressedKeys[KEY.DOWN])
	{
		player2.drawY += spd;
	}
}

function player2ScreenBoundary() {
	if (player1.drawX <= 0 - 2) {
		player1.drawX = 0 - 2;
	}
	if (player1.drawX >= width - 42) {
		player1.drawX = width - 42;	
	}
	if (player1.drawY <= 0) {
		player1.drawY = 0;
	}
	if (player1.drawY >= height - 64) {
		player1.drawY = height - 64;
	}

	if (player2.drawX <= 0 - 2) {
		player2.drawX = 0 - 2;
	}
	if (player2.drawX >= width - 42) {
		player2.drawX = width - 42;	
	}
	if (player2.drawY <= 0) {
		player2.drawY = 0;
	}
	if (player2.drawY >= height - 64) {
		player2.drawY = height - 64;
	}
}

function shootBulletsPlayer2() {
	if(bulletDelay2 >= 0)
	{
		bulletDelay2--;
	}

	if(bulletDelay2 <= 0)
	{
		var newBulletPlayer2 = new Bullet(player2.drawX + 14, player2.drawY + 32);	

		if(bulletList2.length < 20)
		{
			bulletList2.push(newBulletPlayer2);
		}
	}

	if (bulletDelay2 == 0)
		bulletDelay2 = bd2;
}

function updateBulletsPlayer2() {
	for(var i = 0; i < bulletList2.length; i++)
	{
		bulletList2[i].drawY -= bulletSpd;

		if(bulletList2[i].drawY <= -10)
		{
			bulletList2.splice(i, 1);
		}	
	}
}

function drawBulletPlayer2(){	

	for(var i = 0; i < bulletList2.length; i++) {
		bulletList2[i].draw();	
	}			
}

function checkEnemyHit2() {
	var x = Math.floor((Math.random() * 99) + 1);

	for(var i = 0; i < enemyList1.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(bulletList[j].drawX >= enemyList1[i].drawX - (enemyList1[i].width/2) &&
				bulletList[j].drawX <= enemyList1[i].drawX + enemyList1[i].width &&
				bulletList[j].drawY >= enemyList1[i].drawY &&
				bulletList[j].drawY <= enemyList1[i].drawY + enemyList1[i].height)
			{
				var explosion = new Explosion(enemyList1[i].drawX, enemyList1[i].drawY);
				var healthItem = new Item(enemyList1[i].drawX, enemyList1[i].drawY);
				explosion.hasHit = true;
				explosionList.push(explosion);

				if(x > 85)
				{
					healthItemList.push(healthItem);
				}

				score += 20;
				enemyList1.splice(i, 1);
				bulletList.splice(j, 1);
				explosionSound.play();						
			}
		}
	}

	//Boss1
	for(var i = 0; i < bossEnemyList1.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(bulletList[j].drawX >= bossEnemyList1[i].drawX - (bossEnemyList1[i].width/2) &&
				bulletList[j].drawX <= bossEnemyList1[i].drawX + bossEnemyList1[i].width &&
				bulletList[j].drawY >= bossEnemyList1[i].drawY &&
				bulletList[j].drawY <= bossEnemyList1[i].drawY + bossEnemyList1[i].height)
			{
				var explosion = new Explosion(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				var healthItem = new Item(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);

				bossHealth1--;
				if(bossHealth1 == 0)
				{
					explosion.hasHit = true;
					explosionList.push(explosion);

					if(x > 85)
					{
						healthItemList.push(healthItem);
					}
					explosionSound.play();
					score += 100;
					
					bossEnemyList1.splice(i, 1);
					bossHealth1 = 6;
				}

				bulletList.splice(j, 1);
										
			}
		}
	}

	//Player 2

	for(var i = 0; i < enemyList1.length; i++)
	{
		for(var j = 0; j < bulletList2.length; j++)
		{
			if(bulletList2[j].drawX >= enemyList1[i].drawX - (enemyList1[i].width/2) &&
				bulletList2[j].drawX <= enemyList1[i].drawX + enemyList1[i].width &&
				bulletList2[j].drawY >= enemyList1[i].drawY &&
				bulletList2[j].drawY <= enemyList1[i].drawY + enemyList1[i].height)
			{
				var explosion = new Explosion(enemyList1[i].drawX, enemyList1[i].drawY);
				var healthItem = new Item(enemyList1[i].drawX, enemyList1[i].drawY);
				explosion.hasHit = true;
				explosionList.push(explosion);

				if(x > 85)
				{
					healthItemList.push(healthItem);
				}

				score += 20;
				enemyList1.splice(i, 1);
				bulletList2.splice(j, 1);
				explosionSound.play();						
			}
		}
	}

	//Boss1
	for(var i = 0; i < bossEnemyList1.length; i++)
	{
		for(var j = 0; j < bulletList2.length; j++)
		{
			if(bulletList2[j].drawX >= bossEnemyList1[i].drawX - (bossEnemyList1[i].width/2) &&
				bulletList2[j].drawX <= bossEnemyList1[i].drawX + bossEnemyList1[i].width &&
				bulletList2[j].drawY >= bossEnemyList1[i].drawY &&
				bulletList2[j].drawY <= bossEnemyList1[i].drawY + bossEnemyList1[i].height)
			{
				var explosion = new Explosion(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				var healthItem = new Item(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);

				bossHealth1--;
				if(bossHealth1 == 0)
				{
					explosion.hasHit = true;
					explosionList.push(explosion);

					if(x > 85)
					{
						healthItemList.push(healthItem);
					}
					explosionSound.play();
					score += 100;
					
					bossEnemyList1.splice(i, 1);
					bossHealth1 = 6;
				}

				bulletList2.splice(j, 1);
										
			}
		}
	}
}

function checkPlayerHit2() {
	for(var i = 0; i < bulletEnemyList.length; i++)
	{
		if(bulletEnemyList[i].drawX >= player1.drawX - (player1.width/2) &&
			bulletEnemyList[i].drawX <= player1.drawX + player1.width &&
			bulletEnemyList[i].drawY >= player1.drawY &&
			bulletEnemyList[i].drawY <= player1.drawY + player1.height)
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth--;
			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			bulletEnemyList.splice(i, 1);	
		}
	}

	for(var i = 0; i < healthItemList.length; i++) 
	{
		if(healthItemList[i].drawX >= player1.drawX - (player1.width/2) &&
			healthItemList[i].drawX <= player1.drawX + player1.width &&
			healthItemList[i].drawY >= player1.drawY &&
			healthItemList[i].drawY <= player1.drawY + player1.height)
		{
			
			if (healthBarList.length < playerHealth && playerHealth < 6)
			{
				playerHealth++;
				var healthBar = new Health((playerHealth * 30) - 50);
				healthBarList.push(healthBar);
			}
			score += 20;
			healthItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < bulletBossEnemyList1.length; i++)
	{
		if(bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 >= player1.drawX - 50 &&
			bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 <= (player1.drawX + player1.width + 50) &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height >= player1.drawY &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height <= player1.drawY + player1.height)
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth -= 2;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			healthBarList.pop();
			bulletBossEnemyList1.splice(i, 1);	
		}
	}

	//Player 2
	for(var i = 0; i < bulletEnemyList.length; i++)
	{
		if(bulletEnemyList[i].drawX >= player2.drawX - (player2.width/2) &&
			bulletEnemyList[i].drawX <= player2.drawX + player2.width &&
			bulletEnemyList[i].drawY >= player2.drawY &&
			bulletEnemyList[i].drawY <= player2.drawY + player2.height)
		{
			var explosion = new Explosion(player1.drawX, player2.drawY);
			playerHealth2--;
			if(healthBarList2.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead2 = true;
			}
			
			healthBarList2.pop();
			bulletEnemyList.splice(i, 1);	
		}
	}

	for(var i = 0; i < healthItemList.length; i++) 
	{
		

		if(healthItemList[i].drawX >= player2.drawX - (player2.width/2) &&
			healthItemList[i].drawX <= player2.drawX + player2.width &&
			healthItemList[i].drawY >= player2.drawY &&
			healthItemList[i].drawY <= player2.drawY + player2.height)
		{
			
			if (healthBarList2.length < playerHealth2 && playerHealth2 < 6)
			{
				playerHealth2++;
				var healthBar = new Health((playerHealth2 * 30) + 350);
				healthBar.img = healthBarImg2;
				healthBarList2.push(healthBar);
			}
			score += 20;
			healthItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < bulletBossEnemyList1.length; i++)
	{
		if(bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 >= player2.drawX - 50 &&
			bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 <= (player2.drawX + player2.width + 50) &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height >= player2.drawY &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height <= player2.drawY + player2.height)
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth2 -= 2;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead2 = true;
			}
			
			healthBarList2.pop();
			healthBarList2.pop();
			bulletBossEnemyList1.splice(i, 1);	
		}
	}
}

function updateCollision2() {
	for(var i = 0; i < explosionList.length; i++)
	{	
		if(!explosionList[i].hasHit)
		{		
			explosionList.splice(i, 1);
		}
	}
}

function updateHealthBar2() {
	if (healthBarCount < playerHealth)
	{
		healthBarCount++;
		var healthBar = new Health((healthBarCount * 30) - 50);
		healthBarList.push(healthBar);
	}	

	

	if (healthBarCount2 < playerHealth2)
	{
		healthBarCount2++;
		var healthBar2 = new Health((healthBarCount2 * 30) + 350);
		healthBar2.img = healthBarImg2;
		healthBarList2.push(healthBar2);
	}	
}

function drawHealthBar2() {
	ctxHUD.clearRect(0,0,575,800);
	for(var i = 0; i < healthBarList.length; i++)
	{
		healthBarList[i].draw();
	}	
	for(var i = 0; i < healthBarList2.length; i++)
	{
		healthBarList2[i].draw();
	}
}
*/