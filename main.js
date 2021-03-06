let stars;
let playerImage;
let meteorImage;
let meteorChance = 0.02;
let pillowChance = 0.005;
let score = 0;  //NEW
let GAMEOVER = 0; //NEW
let player = {
    x:500,
    y:550,
    hp: 100,
    xVel:0,
    dazed:0
}
let meteors = [{
    x:500,
    y:0,
    yVel:0
}];
let pillows = [{
    x:500,
    y:0,
    yVel:0
}];
let keysPressed = {};
function preload(){
    stars = loadImage("stars.png");
    over = loadImage("gameover.png");
    playerImage = loadImage("link.png");
    meteorImage = loadImage("unnamed.png");
    pillowImage = loadImage("PillowOfLife.png");
}

function setup(){
    createCanvas(1000,700);
}
function draw(){
    if(GAMEOVER == 0){
        background(0);
        image(stars,0,0,1000,700);

        //the next three lines draw the score
        textSize(32);
        fill(255, 255, 255);
        text(score, 900, 40);

        image(playerImage, player.x, player.y);
        noFill();
        stroke(255);
        strokeWeight(3);
        //rect(player.x,player.y,playerImage.width,playerImage.height);
        rect(10,10,100,20);
        fill(0,255,0);
        strokeWeight(0);
        rect(10,10, player.hp * 0.98,18);
        if (keysPressed["ArrowRight"]&& player.dazed <= 0){
            player.xVel +=1;
        }else if (keysPressed["ArrowLeft"]&& player.dazed <= 0){
            player.xVel -=1;
        }
        player.xVel *= 0.9;
        player.x += player.xVel;
        player.dazed-=1;

        if(player.x<0 ||player.x >1000 - playerImage.width && player.dazed <= 0){
            player.xVel *= -1;
            player.dazed = 30;
        }
    meteors.forEach(meteor => {
        image(meteorImage,meteor.x,meteor.y,48,48);
        let touchingPlayer = overlappingRects(player.x, player.y, playerImage.width, playerImage.height, meteor.x, meteor.y, meteorImage.width, meteorImage.height);
        if (touchingPlayer && player.hp>0){
            player.hp -= .10;
        }
        noFill();
        if (touchingPlayer){
            stroke(255,0,0);
        } else{
            stroke(255);
        }
            stroke(255);
            strokeWeight(3);
            //rect(meteor.x,meteor.y,48,48);
        meteor.yVel += 0.25;
        meteor.y += meteor.yVel;

    });
    meteors.forEach((meteor,i) =>{
        if(meteor.y> height){
            meteors.splice(i,1);
            score += 1; //new line right here
        }
    })
    pillows.forEach(pillow => {
        image(pillowImage,pillow.x,pillow.y,48,48);
        let touchingPlayer = overlappingRects(player.x, player.y, playerImage.width, playerImage.height, pillow.x, pillow.y, pillowImage.width, pillowImage.height);
        if (touchingPlayer && player.hp>0){
            player.hp += 1;
        }
        noFill();
        if (touchingPlayer){
            stroke(255,0,0);
        } else{
            stroke(255);
        }
            stroke(255);
            strokeWeight(3);
            //rect(meteor.x,meteor.y,48,48);
            pillow.yVel += 0.25;
            pillow.y += pillow.yVel;

    });
    pillows.forEach((pillow,i) =>{
        if(pillow.y> height){
            pillows.splice(i,1);
            score += 1; //new line right here
        }
    })
    if(Math.random()<meteorChance){
        meteors.push({
            x: random(1000),
            y : 0,
            yVel : 0
        }) 
    }
    if(Math.random()<pillowChance){
        pillows.push({
            x: random(1000),
            y : 0,
            yVel : 0
        }) 
    }
    if (Math.random()<0.005){
        meteorChance += 0.01;
    }
    }   //NEW 
   if (player.hp <= 0){ //NEW
       GAMEOVER = 1;  //NEW 
   }  //NEW
   if(GAMEOVER == 1){
   background(0);
   image(over,0,0,1000,700);
   }
}

function keyPressed(){
    keysPressed[key]  = true;
}

function keyReleased(){
    keysPressed[key] = false;
}

function overlappingRects(x1, y1, w1, h1, x2, y2, w2, h2) {
    
    if ((x1<=x2 && x2<=x1+w1)&&(y1<=y2 && y2<=y1+h1)){
        return true;
    }
    if ((x1<=x2+w2 && x2+w2<=x1+w1)&&(y1<=y2 && y2<=y1+h1)){
        return true;
    }
    if ((x1<=x2 && x2<=x1+w1)&&(y1<=y2+h2 && y2+h2<=y1+h1)){
        return true;
    }
    if ((x1<=x2+w2 && x2+w2<=x1+w1)&&(y1<=y2+h2 && y2+h2<=y1+h1)){
        return true;
    }
    return false;
}