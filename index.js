const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newgameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    newgameBtn.classList.remove("active");
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.classList=`box box${index+1}`;
        box.style.pointerEvents="";
    })
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}
initGame();

boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        swapTurn();
        checkGameOver();

    }
}
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}

function checkGameOver(){
    let ans="";
    winningPositions.forEach((position)=> {
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="" ) &&( gameGrid[position[0]]===gameGrid[position[1]] )&& (gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[0]]=="X"){
                ans="X";
            }
            else{
                ans="O";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });
    if(ans!==""){
        gameInfo.innerText=`Winner Player-${ans}`;
        newgameBtn.classList.add("active");
          return;
    }
    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillcount++;
        }
    });
    if(fillcount===9){
        gameInfo.innerText=`Game Tied`;
        newgameBtn.classList.add("active");
    } 


}

newgameBtn.addEventListener("click",initGame);