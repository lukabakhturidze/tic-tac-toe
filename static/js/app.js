// option buttons variables>1
const optionButtons = document.querySelectorAll(".option-button");
let choosenSign = true;
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
let TieOrWin= false;
const playEndOptionsWrapper = document.querySelector(".options-after-play-end");
const reloadOptionsWrapper = document.querySelector(".options-for-reload");
let takeNumber = null;
// <turn indicator variables2&4

// go to play board variables>3
const gameOptionButtons = document.querySelectorAll(".game-option-button");
const initialSection = document.getElementById("initial-section");
const PlaySection = document.getElementById("vs-player-section");
let whichGameMode = null;
// <go to play board variables3
// reload variables>5
const reloadButton = document.querySelector(".reload-button");
const reloadAcceptButton = document.querySelector(".reload-accept-button");
const reloadRejectButton = document.querySelector(".reload-reject-button");
// <reload variables5
// play end modal variables>6
const quitButton = document.querySelector(".quit-button");
const nextRoundButton = document.querySelector(".next-round-button");
// play end modal variables>6
//option buttons action>1
optionButtons.forEach(buttonActiveHandler);
function buttonActiveHandler(optionButton, index, arr)
{
    optionButton.addEventListener("click", ()=>{
        for(let i = 0; i < arr.length; i++)
        {
            if(i == index)
            {
                if(index == 0)
                {
                    choosenSign = true;
                }
                else if(index == 1)
                {
                    choosenSign = false;
                }
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
function moveOnPages()
{
    initialSection.classList.toggle("display-flex");
    initialSection.classList.toggle("display-none");
    PlaySection.classList.toggle("display-none");
    PlaySection.classList.toggle("display-grid");
}
// go to play board handler>3
gameOptionButtons.forEach((optionButton, index)=>{
    optionButton.addEventListener('click', () =>{
        if(index == 0)
        {
            whichGameMode = false;
        }
        else if(index == 1){
            whichGameMode = true;
        }
        moveOnPages();
        gameAction();
    });
});
// <go to play board handler3

// blocks click event handler>4

    //open/close modal>
function openCloseModal()
{
    modalSection.classList.toggle("display-none");
    modalSection.classList.toggle("display-flex");
    playBoard.classList.toggle("overflow-hidden");
}
    //<open/close modal

    //win results execution>
function winExecution(classForCheck, TieOrWin,winBlocks)
{
    alreadyWon = true;
    if(classForCheck == "x-chosen" && TieOrWin == true)
    {
        p1Score++;
        p1.innerHTML = p1Score;
        for(let i = 0; i < winBlocks.length; i++)
        {
            winBlocks[i].classList.add("win");
        }
        modalWinDeclaration.classList.add("display-block");
        modalWinDeclaration.classList.remove("display-none");
        modalWinDeclaration.innerHTML = "player 1 wins";
        modalXO.classList.add("x-modal-win");
        modalXO.classList.remove("o-modal-win");
        modalResult.innerHTML = "TAKES THE ROUND";
        modalResult.classList.add("blue-text");
        modalResult.classList.remove("yellow-text");
        modalResult.classList.remove("gray-text");
        reloadOptionsWrapper.classList.replace("display-flex", "display-none");
        playEndOptionsWrapper.classList.remove("display-none");
        playEndOptionsWrapper.classList.add("display-flex");
        
    }
    else if(classForCheck == "o-chosen" && TieOrWin == true)
    {
        p2Score++;
        p2.innerHTML = p2Score;
        for(let i = 0; i < winBlocks.length; i++)
        {
            winBlocks[i].classList.add("win");
        }
        modalWinDeclaration.classList.add("display-block");
        modalWinDeclaration.classList.remove("display-none");
        modalWinDeclaration.innerHTML = "player 2 wins";
        modalXO.classList.add("o-modal-win");
        modalXO.classList.remove("x-modal-win");
        modalResult.innerHTML = "TAKES THE ROUND";
        modalResult.classList.add("yellow-text");
        modalResult.classList.remove("blue-text");
        modalResult.classList.remove("gray-text");
        reloadOptionsWrapper.classList.replace("display-flex", "display-none");
        playEndOptionsWrapper.classList.remove("display-none");
        playEndOptionsWrapper.classList.add("display-flex");
    }
    else if(TieOrWin == false)
    {
        modalWinDeclaration.classList.add("display-none");
        modalWinDeclaration.classList.remove("display-block");
        modalXO.classList.remove("o-modal-win");
        modalXO.classList.remove("x-modal-win");
        modalResult.innerHTML = "ROUND TIED";
        modalResult.classList.add("gray-text");
        modalResult.classList.remove("yellow-text");
        modalResult.classList.remove("blue-text");
        reloadOptionsWrapper.classList.replace("display-flex", "display-none");
        playEndOptionsWrapper.classList.remove("display-none");
        playEndOptionsWrapper.classList.add("display-flex");
    }
    if(whichGameMode == false)
    {
        whichTurn = true;
        turnIndicatorHandler();
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
            TieOrWin = true;
            winExecution(classForCheck, TieOrWin,[array[i], array[i + 3], array[i + 6]]);
            return;
        }
        else if(array[3 * i].classList.contains(classForCheck) && array[(3 * i) + 1].classList.contains(classForCheck) && array[(3 * i) + 2].classList.contains(classForCheck))
        {
            TieOrWin = true;
            winExecution(classForCheck, TieOrWin, [array[3 * i], array[(3 * i) + 1], array[(3 * i) + 2]]);
            return;
        }
    }
    if(array[0].classList.contains(classForCheck) && array[4].classList.contains(classForCheck) && array[8].classList.contains(classForCheck))
    {
        TieOrWin = true;
        winExecution(classForCheck, TieOrWin,[array[0], array[4], array[8]]);
        return;
    }
    else if(array[2].classList.contains(classForCheck) && array[4].classList.contains(classForCheck) && array[6].classList.contains(classForCheck))
    {
        TieOrWin = true;
        winExecution(classForCheck, TieOrWin, [array[2], array[4], array[6]]);
        return;
    }
    else if(tieChecker >= 9)
    {
        tieChecker = 0;
        tieScore++;
        tie.innerHTML = tieScore;
        winExecution(classForCheck, TieOrWin, []);
        return;
    }
}
    //<win conbinations checker

    //cpu playing function>
function cpuPlaying(blockArray, initialChecker, checkerAlterer)
{
    setTimeout(() => {
        if(alreadyWon == false)
        {
            do{
                takeNumber = Math.floor(Math.random() * 9);
            }while(blocksArray[takeNumber].classList.contains("x-chosen") || blocksArray[takeNumber].classList.contains("o-chosen"));
        }
        if(blocksArray[takeNumber].classList.contains(initialChecker) && alreadyWon == false)
        {
            blockArray[takeNumber].classList.replace(initialChecker, checkerAlterer);
            whichTurn = !whichTurn;
            turnIndicatorHandler();
            winChecker(blockArray, checkerAlterer);
        }
    }, 1000)
}
        //<cpu playing function
function gameAction()
{
    if(choosenSign == false && whichTurn == true && alreadyWon == false && whichGameMode == false)
    {
        cpuPlaying(blocksArray, "ready-for-x", "x-chosen");
    }
    blocksArray.forEach((block, index, blockArray) =>{
        if(choosenSign == false && alreadyWon == false && whichGameMode == false)
        {
            block.addEventListener('click', () => {
                if(choosenSign == false && whichTurn == false && block.classList.contains("ready-for-o") && alreadyWon == false && whichGameMode == false)
                {
                    block.classList.replace("ready-for-o", "o-chosen");
                    whichTurn = !whichTurn;
                    turnIndicatorHandler();
                    winChecker(blockArray, "o-chosen");
                    cpuPlaying(blocksArray, "ready-for-x", "x-chosen");
                }
            })
        }
        block.addEventListener('click', () => {
            if(whichTurn == true && block.classList.contains("ready-for-x") && alreadyWon == false && whichGameMode == true)
            {
                block.classList.replace("ready-for-x", "x-chosen");
                whichTurn = !whichTurn;
                turnIndicatorHandler();
                winChecker(blockArray, "x-chosen");
            }
            else if(whichTurn == false && block.classList.contains("ready-for-o") && alreadyWon == false && whichGameMode == true)
            {
                block.classList.replace("ready-for-o", "o-chosen");
                whichTurn = !whichTurn;
                turnIndicatorHandler();
                winChecker(blockArray, "o-chosen");
            }
            else if(whichGameMode == false)
            {
                if(whichTurn == choosenSign == true && block.classList.contains("ready-for-x") && alreadyWon == false)
                {
                    block.classList.replace("ready-for-x", "x-chosen");
                    whichTurn = !whichTurn;
                    turnIndicatorHandler();
                    winChecker(blockArray, "x-chosen");
                    cpuPlaying(blockArray, "ready-for-o", "o-chosen");
                }
            }
        });
    });
}

// <blocks click event handler4
    // reset and common reset functions>
function resetBoard()
{
    blocksArray.forEach((block)=>{
        tieChecker = 0;
        if(whichTurn == false)
        {
            if(block.classList.contains("ready-for-o"))
            {
                return;
            }
            else
            {
                block.classList.add("ready-for-o");
                block.classList.remove("ready-for-x");
            }
        }
        else
        {
            if(block.classList.contains("ready-for-x"))
            {
                return;
            }
            else
            {
                block.classList.add("ready-for-x");
                block.classList.remove("ready-for-o");
            }
        }
        block.classList.remove("o-chosen");
        block.classList.remove("x-chosen");
        block.classList.remove("win");
    });
}
function commonReset()
{
    openCloseModal();
    resetBoard();
    alreadyWon = false;
    TieOrWin = false;
}
    // <reset and common reset functions

// reload handler>5
reloadButton.addEventListener('click', () =>{
    if(alreadyWon == false)
    {
        if(whichGameMode == false && whichTurn == !choosenSign){
            return;
        }
        else{
            modalXO.classList.remove("o-modal-win");
            modalXO.classList.remove("x-modal-win");
            modalResult.innerHTML = "RESTART GAME?";
            modalResult.classList.add("gray-text");
            modalWinDeclaration.classList.add("display-none");
            modalWinDeclaration.classList.remove("display-block");
            playEndOptionsWrapper.classList.replace("display-flex", "display-none");
            reloadOptionsWrapper.classList.remove("display-none");
            reloadOptionsWrapper.classList.add("display-flex");
            openCloseModal();
        }
    }
    else
    {
        return;
    }
});
reloadRejectButton.addEventListener('click', () =>{
    openCloseModal();
});
reloadAcceptButton.addEventListener('click', ()=>{
    openCloseModal();
    if(whichGameMode == false)
    {
        whichTurn = true;
        turnIndicatorHandler();
        if(choosenSign == false && alreadyWon == false && whichGameMode == false)
        {
            cpuPlaying(blocksArray, "ready-for-x", "x-chosen");
        }
    }
    resetBoard();
});
// <reload handler5
// play end modal handler>6
nextRoundButton.addEventListener('click', ()=>{
    commonReset();
    if(whichGameMode == false)
    {
        whichTurn = true;
        turnIndicatorHandler();
        if(choosenSign == false && alreadyWon == false && whichGameMode == false)
        {
            cpuPlaying(blocksArray, "ready-for-x", "x-chosen");
        }
    }
});
quitButton.addEventListener('click', ()=>{
    whichTurn = true;
    turnIndicatorHandler();
    commonReset();
    p1Score = 0;
    p2Score = 0;
    tieScore = 0;
    p1.innerHTML = p1Score;
    p2.innerHTML = p2Score;
    tie.innerHTML = tieScore;
    moveOnPages();
});
// <play end modal handler6


