
// grab a reference of our "canvas" using its id
const canvas = document.getElementById('canvas');

/* get a "context". Without "context", we can't draw on canvas */
const ctx = canvas.getContext('2d');

const user1 = {
    width: 5,
    height: canvas.height/3,
    x:5,
    y: canvas.height/3,
    color: 'white'
}

const user2 = {
    width: 5,
    height: canvas.height/3,
    x:canvas.width - 10,
    y: canvas.height/3,
    color: 'white'
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

    // draw score on right

    // draw net

    // draw ball

}
    
render();