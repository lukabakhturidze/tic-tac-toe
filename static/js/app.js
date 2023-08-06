// option buttons variables>1
const optionButtons = document.querySelectorAll(".option-button");
// <option buttons variables1
// turn indicator variables>2&4
let whichTurn = true;
const playBoard = document.querySelector(".play-board");
const turnX = document.getElementById("turn-x");
const turnO = document.getElementById("turn-o");
const blocksArray = document.querySelectorAll(".play-board .x-o-block");
let tieChecker = 0;
let p1Score = 0;
let p2Score = 0;
let tieScore = 0;
const p1 = document.querySelector(".p1-score");
const tie = document.querySelector(".tie-score");
const p2 = document.querySelector(".p2-score");
let alreadyWon = false;
const modalSection = document.querySelector(".modal-section");
const modalWinDeclaration = document.querySelector(".modal-win-declaration");
const modalXO = document.querySelector(".x-o-modal-wrapper");
const modalResult = document.querySelector(".modal-result");
// <turn indicator variables2&4

// go to play board variables>3
const gameOptionButtons = document.querySelectorAll(".game-option-button");
const initialSection = document.getElementById("initial-section");
const PlaySection = document.getElementById("vs-player-section");
// <go to play board variables3
//option buttons action>1
optionButtons.forEach(buttonActiveHandler);
function buttonActiveHandler(optionButton, index, arr)
{
    optionButton.addEventListener("click", ()=>{
        for(let i = 0; i < arr.length; i++)
        {
            if(i == index)
            {
                optionButton.classList.add("option-button-active");
            }
            else
            {
                arr[i].classList.remove("option-button-active");
            }
        } 
    });
}
//<option buttons action1

//turn indicator handler>2
function turnIndicatorHandler()
{
    if(whichTurn == true)
    {
        turnX.classList.replace("display-none", "display-block");
        turnO.classList.replace("display-flex", "display-none");
        blocksArray.forEach((block) =>{
            block.classList.replace("ready-for-o", "ready-for-x");
        });
    }
    else
    {
        turnO.classList.replace("display-none", "display-flex");
        turnX.classList.replace("display-block", "display-none");
        blocksArray.forEach((block) =>{
            block.classList.replace("ready-for-x", "ready-for-o");
        });
    }
}
turnIndicatorHandler();
//<turn indicator handler2
// go to play board handler>3
gameOptionButtons.forEach((optionButton)=>{
    optionButton.addEventListener('click', () =>{
        initialSection.classList.replace("display-flex", "display-none");
        PlaySection.classList.replace("display-none", "display-grid");
    });
});
// <go to play board handler3

// blocks click event handler>4

    //open/close modal>
function openCloseModal()
{
    modalSection.classList.replace("display-none", "display-flex");
    playBoard.classList.replace("display-grid", "display-none");
}
    //<open/close modal

    //win results execution>
function winExecution(classForCheck, winBlocks)
{
        alreadyWon = true;
        if(classForCheck == "x-chosen")
    {
        p1Score++;
        p1.innerHTML = p1Score;
        console.log("p1 " + p1Score);
        for(let i = 0; i < winBlocks.length; i++)
        {
            winBlocks[i].classList.add("win");
        }
        modalWinDeclaration.innerHTML = "player 1 wins";
        modalXO.classList.add("x-modal-win");
        modalXO.classList.remove("o-modal-win");
        modalResult.classList.add("blue-text");
        modalResult.classList.remove("yellow-text");
    }
    else if(classForCheck == "o-chosen")
    {
        p2Score++;
        p2.innerHTML = p2Score;
        console.log("p2 " + p2Score);
        for(let i = 0; i < winBlocks.length; i++)
        {
            winBlocks[i].classList.add("win");
        }
        modalWinDeclaration.innerHTML = "player 2 wins";
        modalXO.classList.add("o-modal-win");
        modalXO.classList.remove("x-modal-win");
        modalResult.classList.add("yellow-text");
        modalResult.classList.remove("blue-text");
    }
    setTimeout(openCloseModal, 1000);
        
}
    //<win results execution

    //win conbinations checker>
function winChecker(array, classForCheck)
{
    tieChecker++;
    for(let i = 0; i < 3; i++)
    {
        if(array[i].classList.contains(classForCheck) && array[i + 3].classList.contains(classForCheck) && array[i + 6].classList.contains(classForCheck))
        {
            winExecution(classForCheck, [array[i], array[i + 3], array[i + 6]]);
            return;
        }
        else if(array[3 * i].classList.contains(classForCheck) && array[(3 * i) + 1].classList.contains(classForCheck) && array[(3 * i) + 2].classList.contains(classForCheck))
        {
            winExecution(classForCheck, [array[3 * i], array[(3 * i) + 1], array[(3 * i) + 2]]);
            return;
        }
    }
    if(array[0].classList.contains(classForCheck) && array[4].classList.contains(classForCheck) && array[8].classList.contains(classForCheck))
    {
        winExecution(classForCheck, [array[0], array[4], array[8]]);
        return;
    }
    else if(array[2].classList.contains(classForCheck) && array[4].classList.contains(classForCheck) && array[6].classList.contains(classForCheck))
    {
        winExecution(classForCheck, [array[2], array[4], array[6]]);
        return;
    }
    else if(tieChecker >= 9)
    {
        tieChecker = 0;
        tieScore++;
        tie.innerHTML = tieScore;
        console.log(tieScore);
        return;
    }
}
    //<win conbinations checker

blocksArray.forEach((block, index, blockArray) =>{
    block.addEventListener('click', () => {
        if(whichTurn == true && block.classList.contains("ready-for-x") && alreadyWon ==false)
        {
            block.classList.replace("ready-for-x", "x-chosen");
            whichTurn = !whichTurn;
            turnIndicatorHandler();
            winChecker(blockArray, "x-chosen");
        }
        else if(whichTurn == false && block.classList.contains("ready-for-o") && alreadyWon ==false)
        {
            block.classList.replace("ready-for-o", "o-chosen");
            whichTurn = !whichTurn;
            turnIndicatorHandler();
            winChecker(blockArray, "o-chosen");
        }
    });
});


// <blocks click event handler4
