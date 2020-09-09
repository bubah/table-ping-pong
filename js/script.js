
// grab a reference of our "canvas" using its id
const canvas = document.getElementById('canvas');

/* get a "context". Without "context", we can't draw on canvas */
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', keyDownHandler)
window.addEventListener('keyup', keyUpHandler)

const paddleHitSound = new Audio('../sounds/boing_spring.wav')
const wallHitSound = new Audio('../sounds/wallHitSound.wav')
const scoreSound = new Audio('../sounds/scoreSound.wav')
const winnerSound = new Audio('../sounds/cheering.wav')

function keyDownHandler(event) {
    switch(event.keyCode) {
        case 65:
            user1.pressUpArrow = true
            break
        case 38:
            user2.pressUpArrow = true
            break
        case 90:
            user1.pressDownArrow = true
            break
        case 40:
            user2.pressDownArrow = true
            break
        case 32:
            if(user1.winner || user2.winner) {
                user1.winner = false
                user2.winner = false 
                user1.score = 0
                user2.score = 0   
            }

            if(ball.velocityX == 0 & ball.velocityY == 0) {
                ball.velocityX = 5
                ball.velocityY = 5
            }
            break
        default:
            break
    }
}

function keyUpHandler(event) {
    switch(event.keyCode) {
        case 65:
            user1.pressUpArrow = false
            break
        case 38:
            user2.pressUpArrow = false
            break
        case 90:
            user1.pressDownArrow = false
            break
        case 40:
            user2.pressDownArrow = false
            break
        default:
            break
    }
}


const user1 = {
    width: 5,
    height: canvas.height/3,
    x:5,
    y: canvas.height/3,
    color: 'white',
    score: 0,
    pressUpArrow: false,
    pressDownArrow: false,
    winner: false
}

const user2 = {
    width: 5,
    height: canvas.height/3,
    x:canvas.width - 10,
    y: canvas.height/3,
    color: 'white',
    score: 0,
    pressUpArrow: false,
    pressDownArrow: false,
    winner: false
}

const net = {
    startX: canvas.width/2,
    startY: 0,
    endX: canvas.width/2,
    endY: canvas.height,
    lineWidth: 5,
    color: 'white'
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 8,
    color: "green",
    velocityX: 0,
    velocityY: 0,
}

const drawBoard = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const drawPaddle = (x, y, width, height, color) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

const drawScore = (score, font, x, y) => {
    ctx.textBaseline = 'bottom'
    ctx.font = `${font}px serif`
    ctx.fillText(score.toString(), x, y)
}

const drawNet = (startX, startY, endX, endY, strokeStyle, lineWidth) =>  {
    ctx.beginPath()
    ctx.lineWidth = lineWidth.toString()
    ctx.strokeStyle = strokeStyle
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
}

const drawBall = (x, y, radius, beginArc, endArc, counterClockWise, color) => {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.arc(x, y, radius, beginArc, endArc, counterClockWise)
    ctx.fill()
    ctx.stroke()
}

function reset() {
    ball.x = canvas.width/2
    ball.y = canvas.height/2
    ball.velocityX = 0
    ball.velocityY = 0
}

function player2Win() {
    return user2.score >= 2
}
function player1Win() {
    return user1.score >= 2
}
function gameLoop() {

    // Start Game
    // Update --------------------------aaaaaaaaaaaaaazzzzzzzzzzzzzzz
    // User1 paddle
    if(user1.pressUpArrow) {
        if(user1.y > 0) {
            user1.y += -5
        }
    } else if(user1.pressDownArrow) {
        if(user1.y < canvas.height - user2.height) {
            user1.y += 5
        }
    }
    
    // User2 paddle
    if(user2.pressUpArrow) {
        if(user2.y > 0) {
            user2.y += -5
        }
    } else if(user2.pressDownArrow) {
        if(user2.y < canvas.height - user2.height) {
            user2.y += 5
        }
    }

    // Paddle collision
    if (ball.y >= user1.y & ball.y <= (user1.y + user1.height) & ball.x <= (0 + user1.x + user1.width + ball.radius)) {
        ball.velocityX = -ball.velocityX
        ball.x += ball.velocityX
        paddleHitSound.play()
    } else if(ball.y >= user2.y & ball.y <= (user2.y + user2.height) &  ball.x >= (canvas.width - (user2.width + 5) - ball.radius)) {
        ball.velocityX = -ball.velocityX
        ball.x += ball.velocityX
        paddleHitSound.play()
    }

    // Wall collision
    if(ball.y > ball.radius & ball.y < canvas.height - ball.radius) {
        ball.y += ball.velocityY
        ball.x += ball.velocityX
    } else {
        ball.velocityY = -ball.velocityY
        ball.y += ball.velocityY
        wallHitSound.play()
    }

    if(ball.x < 0) {
        user2.score++
        if(player2Win()) {
            user2.winner = true
            winnerSound.play()
        }
        scoreSound.play()
        reset()
    }
    
    if(ball.x > canvas.width) {
        user1.score++
        if(player1Win()) {
            user1.winner = true
            winnerSound.play()
        } 
        scoreSound.play()
        reset()
    }
    
// Update --------------------------
    

    // render
    render()

    // reset
}

function drawWinner() {
    if(user1.winner) {
        ctx.fillStyle = 'white'
        ctx.textBaseline = 'alphabetic'
        ctx.font = "normal 20px serif"
        ctx.fillText("Player 1 Wins!", canvas.width/8, canvas.height/2)
    } else if (user2.winner) {
        ctx.fillStyle = 'white'
        ctx.textBaseline = 'alphabetic'
        ctx.font = "normal 20px serif"
        ctx.fillText("Player 2 Wins!", 5 * canvas.width/8, canvas.height/2)
    }
}

// render function draws everything on to canvas
function render() {
    
    drawBoard()
    
    // draw user1 paddle
    drawPaddle(user1.x, user1.y, user1.width, user1.height, user1.color)
    
    // draw user2 paddle
    drawPaddle(user2.x, user2.y, user2.width, user2.height, user2.color)
    
    // draw score on left
    drawScore(user1.score, 30, canvas.width/4, canvas.height/8)
    
    // draw score on right
    drawScore(user2.score, 30, 3 * canvas.width/4, canvas.height/8)

    drawNet(net.startX, net.startY, net.endX, net.endY, net.color, net.lineWidth)
    
    drawBall(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, true, ball.color)

    drawWinner()
}

setInterval(gameLoop, 1000/60)