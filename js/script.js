
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
    StartY: 0,
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

// render function draws everything on to canvas
function render() {

    // draw board
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // draw paddle 1
    ctx.fillStyle = user1.color
    ctx.fillRect(user1.x, user1.y, user1.width, user1.height)
    
    // draw paddle 2
    ctx.fillStyle = user2.color
    ctx.fillRect(user2.x, user2.y, user2.width, user2.height)

    // draw score on left
    ctx.textBaseline = 'bottom';
    ctx.font = "30px serif"
    ctx.fillText(user1.score.toString(), canvas.width/4, canvas.height/8)
    
    // draw score on right
    ctx.textBaseline = 'botton';
    ctx.font = "30px serif"
    ctx.fillText(user2.score.toString(), 3 * canvas.width/4, canvas.height/8)

    // draw net
    ctx.beginPath()
    ctx.lineWidth = net.lineWidth.toString()
    ctx.strokeStyle = "white"
    ctx.moveTo(net.startX, net.StartY)
    ctx.lineTo(net.endX, net.endY)
    ctx.stroke()
    
    // draw ball
    ctx.beginPath()
    ctx.strokeStyle = ball.color
    ctx.fillStyle = ball.color
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, true)
    ctx.fill()
    ctx.stroke()

}
    
render();