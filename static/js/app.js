// option buttons variables>1
const optionButtons = document.querySelectorAll(".option-button");
// <option buttons variables1
// turn indicator variables>2
let whichTurn = false;
const turnX = document.getElementById("turn-x");
const turnO = document.getElementById("turn-o");
const blocksArray = document.querySelectorAll(".play-board .x-o-block");
// <turn indicator variables2

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

