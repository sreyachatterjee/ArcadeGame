// Enemies our player must avoid
var Enemy = function(xAxis,yAxis,speedVal){
    this.x = xAxis;
    this.y = yAxis;
    this.speed = speedVal;
    this.getImage(speedVal);    
};

Enemy.prototype.getImage=function enm(spd){
    spd%2==0? this.sprite ='images/stone-block.png':
    this.sprite ='images/enemy-bug.png';    
}

// Updating enemy's position
Enemy.prototype.update = function(dt) {

    this.x += parseInt(this.speed)*dt;

    if (parseInt(this.x) > 550){
        this.x = -80;
        this.speed = 100 + Math.floor(Math.random()*500);
    }

    //reseting player position after collison
    if ((player.x < (this.x + 50)) && ((player.x + 50) > this.x) && (player.y < (this.y + 50)) && 
    ((50 + player.y)>this.y)) {
        player.x = 303;     
        player.y = 405;     
    }      
};

// Drawing the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player class
var MyPlayer = function(xAxis,yAxis){
    this.x = xAxis;
    this.y = yAxis;
    this.playerImg = 'images/char-boy.png';
    this.gameFinished = false;
}

MyPlayer.prototype.update = function(){
    
}

// Drawing the player on the screen
MyPlayer.prototype.render = function(){
    ctx.drawImage(Resources.get(this.playerImg),this.x, this.y);
}

// Moving player 
MyPlayer.prototype.moveLeft  = function(){this.x > 0 ? this.x-=102:this.doNothing()}
MyPlayer.prototype.moveRight  = function(){this.x < 405 ? this.x+=102:this.doNothing()}
MyPlayer.prototype.moveUp  = function(){this.y > 0 ? this.y-=83:this.doNothing()}
MyPlayer.prototype.moveDown  = function(){this.y < 405 ? this.y+=83:this.doNothing()}
MyPlayer.prototype.doNothing = function(){}

MyPlayer.prototype.handleInput = function(pressedButton){
    if (!this.gameFinished){
        pressedButton == 'left'? this.moveLeft():this.doNothing();
        pressedButton == 'right'? this.moveRight():this.doNothing()
        pressedButton == 'up'? this.moveUp():this.doNothing();
        pressedButton == 'down'? this.moveDown():this.doNothing()
    }
}

// Instantiating object of player and placing the object in a variable called player
var player = new MyPlayer(303,405);

// Placing all enemy objects in an array called allEnemies
var allEnemies =[];
var enemyLocation = [63,147,147,230];

enemyLocation.forEach(function (locationY){
    enemy = new Enemy(0, locationY,  100 + Math.floor(Math.random()*500) );
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to player.handleInput() method 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
   
    if (player.y < 0 && !player.gameFinished){
        player.gameFinished = true
        setTimeout(function(){
        keyRest(player)},250)
    };
});

// Reset player position and display the winning message
function keyRest(pl) {
    alert("Congrats!! You WON!!");

    pl.x = 303;
    pl.y = 405;
    pl.gameFinished = false
}

