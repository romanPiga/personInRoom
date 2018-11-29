const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const block = new Image();
const door = new Image();
const person = new Image();

block.src = "./js/img/block.png";
door.src = "./js/img/door.png"
person.src = "./js/img/person.png";

const blockSize = 50;
const personRealSize = 64;

let dMove = 0;
let xPos = 250;
let yPos = 350;
let stop = false;
const blockPositions = [
    [100, 50],
    [100, 100],
    [150, 100],
    [150, 150],
    [200, 150],
    [250, 150],
    [300, 150],
    [200, 200],
    [250, 250],
    [100, 250],
    [100, 300],
    [100, 350],
    [200, 250],
    [250, 250]
];
const move = (e) => {   
    if(e.code==="ArrowRight"){
        console.log("right");
        dMove = personRealSize*2;
        if(xPos<350){
            let flag = true;
            blockPositions.map(el => {
                if(el[0]===xPos+50 && el[1]===yPos) flag = false;
            })
            if(flag) xPos+=50;
        }
        ctx.clearRect(50, 50, 350, 350);
    }  
    if(e.code==="ArrowLeft"){
        console.log("left");
        dMove = personRealSize;
        if(xPos>50){
            let flag = true;
            blockPositions.map(el => {
                if(el[0]===xPos-50 && el[1]===yPos) flag = false;
            })
            if(flag) xPos-=50;
        }     
        ctx.clearRect(50, 50, 350, 350);
    }  
    if(e.code==="ArrowUp"){
        console.log("Up");
        dMove = personRealSize*3;
        if(yPos>50){
            let flag = true;
            blockPositions.map(el => {
                if(el[0]===xPos && el[1]===yPos-50) flag = false;
            })
            if(flag) yPos-=50;
        }
        ctx.clearRect(50, 50, 350, 350);
    }
    if(e.code==="ArrowDown"){
        console.log("Down");
        dMove = personRealSize*0;
        if(yPos<350){
            let flag = true;
            blockPositions.map(el => {
                if(el[0]===xPos && el[1]===yPos+50) flag = false;
            })
            if(flag) yPos+=50;
        }
        ctx.clearRect(50, 50, 350, 350);
    }
}

function moveLeft(){
        console.log("left");
        dMove = personRealSize;
        if(xPos>50){
            let flag = true;
            blockPositions.map(el => {
                if(el[0]===xPos-50 && el[1]===yPos) flag = false;
            })
            if(flag) xPos-=50;
            else {
                ctx.clearRect(50, 50, 350, 350);
                moveUp();
            } 
        }   
        ctx.clearRect(50, 50, 350, 350);
}

function moveUp(){
    let flag = true;
    blockPositions.map((el, i, ar) => {
        if(el[0]===xPos-50 && el[1]===yPos && yPos===50) flag = false;

        //очень тупиковая ситуация
        let flag2 = false;
        let flag3 = false;
        if(el[0]===xPos-50 && el[1]===yPos) flag2 = true;
        ar.map(e => {
            if(e[0]===xPos && e[1]===yPos-50) flag3 = true;
        })
        if(flag2&&flag3) flag = false;
    })

    if(flag){
    console.log("Up");
    dMove = personRealSize*3;
    if(yPos>50){
        let flag = true;
        blockPositions.map(el => {
            if(el[0]===xPos && el[1]===yPos-50) flag = false;
        })
        if(flag) yPos-=50;
        else{
            ctx.clearRect(50, 50, 350, 350);
            moveLeft();
        } 
    }
    else moveLeft();
    ctx.clearRect(50, 50, 350, 350);
    }
}
setInterval(()=>{
    if(!stop)
        moveUp();
}, 1000)


const draw = () => {
    //walls
    for(let i=0; i<8; i++){
        ctx.drawImage(block, i*blockSize, 0, blockSize, blockSize);
        ctx.drawImage(block, 450-blockSize, i*blockSize, blockSize, blockSize);
        ctx.drawImage(block, (i+1)*blockSize, 450-blockSize, blockSize, blockSize);
        ctx.drawImage(block, 0, (i+1)*blockSize, blockSize, blockSize);
    }
    //inside room
    blockPositions.map(el => {
        ctx.drawImage(block, el[0], el[1], blockSize, blockSize);
    })
    ctx.drawImage(door, 50, 0, blockSize, blockSize);
    ctx.drawImage(person, 0, dMove, personRealSize, personRealSize, xPos, yPos, 50, 50);
   
    if(xPos===50 && yPos===50){
        ctx.fillStyle = "gold";
        ctx.font = "54px Verdana";
        ctx.fillText("Победа!", 110, 230);
        document.removeEventListener("keydown", move);
        stop = true;
    } 
    else {
        requestAnimationFrame(draw);
    } 
}

document.addEventListener("keydown", move);

person.onload = draw;

 