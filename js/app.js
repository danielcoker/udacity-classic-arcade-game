// A Game object to help in soe gae fnctionality
class Game {
    constructor() {
        this.playerImage = 'images/char-boy.png';
    }

    // Assign the playerImage property to the image the user clicked
    setPlayerImage(playerImage) {
        this.playerImage = playerImage;
        this.updatePlayerImage();
    }

    // update the sprite property of the player obect to current player image
    updatePlayerImage() {
        player.sprite = this.playerImage;
    }
}

// Instatiating the game object
let game = new Game();

// set cookie playerImage to default image
// document.cookie = "playerImage = images/char-boy.png";

// Get playerImmages container
const playerDivImages = document.querySelector('.playerImages');

// On click, change player immage and reload page.
playerDivImages.addEventListener('click', function(event) {
    let element = event.target;
    if (element.hasAttribute('src')) {
        const playerImage = element.getAttribute('src');
        game.setPlayerImage(playerImage);

        // Set clicked class to currently active player Image
        const playerDivChildren = playerDivImages.children;
        for (playerDivChild of playerDivChildren) {
            playerDivChild.classList.remove('clicked');
            element.classList.add('clicked');
        }
    }
});

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Re-position enemies to the beginning of the board when they go off the convas.
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between plater and enemy
    // alert the player has collided with an enemy
    if (player.x < this.x + 60 &&
        player.x + 3 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
            alert('You lost! You collided with an enemy.');
            player.x = 200;
            player.y = 480;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = game.playerImage;
};

Player.prototype.update = function() {
    // Prevent player from moving off the canvas
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // check if player has won the game by reaching the top of the canvas
    // show a 'you won' modal
    // reset player back to the start position
    if (this.y < 0) {
        modal.open();
        this.x = 200;
        this.y = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress === 'left') {
        this.x -= this.speed + 50;
    } else if (keyPress === 'right') {
        this.x += this.speed + 50;
    } else if (keyPress === 'up') {
        this.y -= this.speed + 30;
    } else if (keyPress === 'down') {
        this.y += this.speed + 30;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

const enemyPosition = [60, 140, 220];
const player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Don't allow the browser scroll up when the up and down key is pressed.
window.addEventListener('keydown', function (e) {
    if (e.keyCode === 38 || e.keyCode === 40) { // 38 === up and 40 === down
        e.preventDefault();
    }
});