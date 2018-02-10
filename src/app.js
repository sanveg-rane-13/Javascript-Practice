let gamePiece;
let obstacles = [];
let score;

/**
 * Object that defines structure and layout of the game canvas
 */
let gameArea = {
    canvas: document.createElement("canvas"),
    start: function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");

        document.body.insertBefore(this.canvas, document.body.childNodes[0]); // inserted canvas into DOM

        this.frameNumber = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

/**
 * 
 * @param {*} width 
 * @param {*} height 
 * @param {*} color 
 * @param {*} xCo 
 * @param {*} yCo
 * 
 * @description Function that initializes and manages the component on DOM
 */
let component = function (width, height, color, xCo, yCo, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = xCo;
    this.y = yCo;
    this.gravity = 0;
    this.gravitySpeed = 0;

    this.update = function () {
        let gameAreaContext = gameArea.context;
        if (this.type === "text") {
            gameAreaContext.font = this.width + " " + this.height;
            gameAreaContext.fillStyle = color;
            gameAreaContext.fillText(this.text, this.x, this.y);
        } else {
            gameAreaContext.fillStyle = color;
            gameAreaContext.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPosition = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBottom();
    }

    this.hitBottom = function () {
        let rockBottom = gameArea.canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = 0;
        }
    }

    this.crashWith = function (obstacle) {
        let objLeft = this.x;
        let objRight = this.x + this.width;
        let objTop = this.y;
        let objBottom = this.y + this.height;

        let obstacleLeft = obstacle.x;
        let obstacleRight = obstacle.x + obstacle.width;
        let obstacleTop = obstacle.y;
        let obstacleBottom = obstacle.y + obstacle.height;

        let crash = true;

        if ((objBottom < obstacleTop) || (objTop > obstacleBottom) || (objRight < obstacleLeft) || (objLeft > obstacleRight)) {
            crash = false;
        }
        return crash;
    }
}

/**
 * Check if gamePiece is crashed, generate obstacles and update score.
 */
let updateGameArea = function () {
    for (let i = 0; i < obstacles.length; i++) {
        if (gamePiece.crashWith(obstacles[i])) {
            return;
        }
    }

    gameArea.clear();
    gameArea.frameNumber += 1;

    if (gameArea.frameNumber === 1 || everyinterval(150)) {
        let x = gameArea.canvas.width;

        let minHeight = 20;
        let maxHeight = 200;
        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

        let minGap = 50;
        let maxGap = 200;
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        obstacles.push(new component(10, height, "green", x, 0));
        obstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }

    score.text = "Score: " + gameArea.frameNumber;
    score.update();

    gamePiece.newPosition();
    gamePiece.update();
}

function everyinterval(n) {
    if ((gameArea.frameNumber / n) % 1 == 0) { return true; }
    return false;
}

let accelerate = function (n) {
    gamePiece.gravity = n;
}

/**
 * 
 * @param {*} width 
 * @param {*} height 
 * 
 * @description Function that bootstraps the canvas from the html with initial width and height
 */
let startGame = function (width = 480, height = 270) {
    gamePiece = new component(30, 30, "red", 10, 120);
    gamePiece.gravity = 0.05;
    score = new component("30px", "Consolas", "black", 280, 40, "text");
    gameArea.start(width, height);
}

