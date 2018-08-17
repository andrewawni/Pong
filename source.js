var ball_x, ball_y;
var ball_vx, ball_vy;

var radius = 5;
var MAXSPEED = 13;

var pWidth = 15, pHeight = 75;
var lpad_y;
var rpad_y;
var padding = 5;

var scoreA = 0, scoreB = 0;
var scr = "menu";

var AI;


function setup() {
    createCanvas(800, 450);
    noStroke();

    ellipseMode(RADIUS);
    frameRate(60);
    ball_x = width / 2;
    ball_y = height / 2;
    lpad_y = height / 2 - pHeight / 2;
    rpad_y = height / 2 - pHeight / 2;
    ball_vx = MAXSPEED;
    ball_vy = 0;

}
function draw() {
    
    if(scr == "menu")
    {
        menu();
    }
    else
    {
        if(scr == "2P") 
             AI = false;
        else 
            AI = true;
        
        playGame(AI);
    } 
}





function updateCanvas() {
    background(0);
}
function updateDeflection() {
    
    if (ball_y > height - radius || ball_y < radius)
        ball_vy *= -1;
    }
function updateBall() {
        ball_y = ball_y + ball_vy;
    ball_x = ball_x + ball_vx;
    ellipse(ball_x, ball_y, radius, radius);
}
function updatePaddles(AI) {
    
    /*  left paddle */
    //move up
    if (keyIsDown(65) && lpad_y > 0 + padding) {
        lpad_y -= 5;
    }
    //move down
    if (keyIsDown(90) && lpad_y < height - pHeight - padding) {
        lpad_y += 5;
    }
    rect(0 + padding, 0 + lpad_y, pWidth, pHeight);

    
    /*  right paddle */
    var predictedPos = ball_y;
    if(AI == false)
    {
        //move up
        if (keyIsDown(75) && rpad_y > 0 + padding) {
            rpad_y -= 5;
        }
        //move down
        if (keyIsDown(77) && rpad_y < height - pHeight - padding) {
            rpad_y += 5;
        }
    }
    else
    {
        if(ball_vx<0)
        {
            predictedPos = height/2;
        }
        else
        {
            
            predictedPos += ball_vy*4;
            
        }
        console.log(predictedPos);
        if ( predictedPos + 2< rpad_y + pHeight/2 && rpad_y > 0 + padding) {
            rpad_y -= 4;
        }
        //move down
        else if (predictedPos -2 > rpad_y + pHeight/2 && rpad_y < height - pHeight - padding) {
            rpad_y += 4;
        }
        
    }
    rect(width - (padding + pWidth), 0 + rpad_y, pWidth, pHeight);
}

function reset(p) {

   
    ball_x = width / 2;
    ball_y = height / 2;
    
    if (p === 1) {
        ball_vx = MAXSPEED;
        ball_vy = 0;
    }
    else {
        ball_vx = MAXSPEED * -1;
        ball_vy = 0;
    }

}
function updateScore(p) {
    if (p === 0)
        scoreA++;
    else
        scoreB++;
    
}
function updateScoreUI(){
    stroke(255);
    for(var i =0; i<height; i+=14 )
         rect(width / 2, i, 2, 4);
    textSize(32);
    text(scoreA, width / 2 - 75, 30);
    text(scoreB, width / 2 + 60, 30);
    fill(255);
}
function updateCollison () {

    
    if (ball_x - radius <= padding + pWidth) {

        var a = lpad_y;
        var b = lpad_y + pHeight;
        if (ball_x + radius <= 0) {
            reset(1);
            updateScore(1);
        }


        if (ball_y >= a && ball_y <= b) {
            var relativeIntersect = (lpad_y + (pHeight / 2) - ball_y) * -1;
            // a = pHeight/2;
            // b = -a;
            relativeIntersect = relativeIntersect / (pHeight / 2);
            // ball_vx = 0;
            // ball_vy = 0;
            var bounceAngle = relativeIntersect * 1 * Math.PI / 4;
            ball_vx = MAXSPEED * Math.cos(bounceAngle);
            ball_vy = MAXSPEED * Math.sin(bounceAngle);
        }
        
    }


    if (ball_x + radius >= width - padding - pWidth) {
        var a = rpad_y;
        var b = rpad_y + pHeight;
        if (ball_x - radius >= width) {
            reset(0);
            updateScore(0);
        }
        if (ball_y >= a && ball_y <= b) {
            var relativeIntersect = (rpad_y + (pHeight / 2) - ball_y) * -1;
            // a = pHeight/2;
            // b = -a;
            relativeIntersect = relativeIntersect / (pHeight / 2);
            // ball_vx = 0;
            // ball_vy = 0;
            var bounceAngle = relativeIntersect * 1 * Math.PI / 4;
            ball_vx = -MAXSPEED * Math.cos(bounceAngle);
            ball_vy = MAXSPEED * Math.sin(bounceAngle);
        }
       
    }
    
}




function menu() {

    background(0);

    //buttons
    stroke(0);
    fill(255,255,255);
    rect(150,210,500,10);
    rect(150,310,500,10);
  
    
   
    //button text black
    textSize(35);
    fill(255,255,255)
    text("1-Player",150,200);
    text("2-Players",150,300);
    
    
    //title
    textSize(50);
    fill(255,255,255);
    text("PONG!",320,100);



    if(mouseX >=150 && mouseX <=650){
        if(mouseY >=150 && mouseY <= 220)
        {
            if(mouseIsPressed)
            {
               
                scr = "1P";
            
            }
        }
        else if(mouseY >= 260 && mouseY <= 320)
        {
            if(mouseIsPressed)
            {
                scr = "2P";
                
            }
        }
    }
    


}
function playGame(AI_)
{
    updateCanvas();
    
    updateBall();
    updatePaddles(AI_);
        
       
    updateDeflection();
    updateCollison();
    updateScoreUI();

}








