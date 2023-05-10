// option buttons variables>
const optionButtons = document.querySelectorAll(".option-button");
// <option buttons variables
//option buttons action>
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
//<option buttons action

