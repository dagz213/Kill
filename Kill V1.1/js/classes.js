function Player() {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 44;
    this.height = 64;
    this.drawX = 0;
    this.drawY = 0;
    this.img = planeImage1;
}

Player.prototype.draw = function() {

	ctxPlayer1.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Item(drawX, drawY) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 20;
    this.height = 20;
    this.drawX = drawX;
    this.drawY = drawY;
    this.img = healthItemImg;
}

Item.prototype.draw = function() {

	ctxPlayer1.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Health(drawX) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 30;
    this.height = 30;
    this.drawX = drawX;
    this.drawY = 10;
    this.img = healthBarImg;
}

Health.prototype.draw = function() {

	ctxHUD.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Enemy(drawX, drawY) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 34;
    this.height = 50;
    this.drawX = drawX;
    this.drawY = drawY;
    this.img = enemyImage1;
    this.hasHit = false;
}

Enemy.prototype.draw = function() {
	//ctxEnemy1.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	ctxPlayer1.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Bullet(drawX, drawY) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 16;
    this.height = 10;
    this.drawX = drawX;
    this.drawY = drawY;
    this.img = planeBullet1;  
}

Bullet.prototype.draw = function() {

	ctxPlayer1.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

//Background
function Background() {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 575;
    this.height = 800;
    this.drawX = 0;
    this.drawY = 0;
    this.spd = 3;
}

Background.prototype.draw = function() {

	ctxBg.drawImage(img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY += this.spd, this.width, this.height);
}

function Explosion(drawX, drawY) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 45;
    this.height = 45;
    this.drawX = drawX;
    this.drawY = drawY;
    this.frameCount = 0;
    this.hasHit = false;
}

Explosion.prototype.update = function() {
		if(this.frameCount < 25)
		{
			this.frameCount++;

			if(frameCount % 5 == 0)
			{
				this.srcY += 45;
			}
			if(this.frameCount == 25)
			{
				this.frameCount = 0;
				this.hasHit = false;
			}

		}
}

Explosion.prototype.draw = function() {
	if(this.hasHit)
	{
		ctxPlayer1.drawImage(explosionImg, this.srcX = (this.frameCount * this.width), this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
		
	}			
}