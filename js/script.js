
// grab a reference of our "canvas" using its id
const canvas = document.getElementById('canvas');

/* get a "context". Without "context", we can't draw on canvas */
const ctx = canvas.getContext('2d');

const user1 = {
    width: 5,
    height: canvas.height/3,
    x:5,
    y: canvas.height/3,
    color: 'white',
    score: 0
}

const user2 = {
    width: 5,
    height: canvas.height/3,
    x:canvas.width - 10,
    y: canvas.height/3,
    color: 'white',
    score: 0
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
    velocityX: 5,
    velocityY: 5,
}

const drawBoard = () => {
    // draw board
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const drawPaddle = (x, y, width, height, color) => {
    // draw paddle
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
}
    
render();