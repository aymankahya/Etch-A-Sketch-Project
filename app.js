
const parentNode = document.querySelector('#canvas');
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
const colorInput = document.querySelector("#color-choice");
const eraserToggle = document.querySelector("#eraser");
const canvasReset = document.querySelector("#reset");
sliderValue.innerHTML = `${slider.defaultValue}X${slider.defaultValue}`;
var colorValue = "undefined";
var eraserMode = false;
const canvasHeight = 500;
const canvasWidth = 500;


function createColumn(){

    const childNode = document.createElement('div');
    childNode.classList.add('column');
    childNode.setAttribute('style', 'border: 0px solid red; flex : 1; display:flex; flex-direction: column;');
    parentNode.appendChild(childNode);
}

function populateColumn(size){
    /* Brief description of what needed :
        - In the column created by the function createColumn(), I should generate n number
        of boxes
        - Styling specifications :
            + No margin between boxes
            + Change color to white when clicked on

        - Sizing Specifications :
            +  number of boxes generated = n = gridHeight / gridSize
    */
   


    for(let i = 1 ; i <= size; i++ ){

        const childNode = document.createElement('div');
        childNode.classList.add('box');
        let height = canvasHeight / size;
        let width = canvasWidth / size;
        console.log(`canvas height : ${canvasHeight}\ncanvas width : ${canvasWidth}\nheight : ${height}\nwidth : ${width}`);
        childNode.setAttribute('style',`border: 0px solid white; height: ${height}px; width: ${width}px`);
        parentNode.lastElementChild.appendChild(childNode);  // Parent node in this function, AKA last created column
        childNode.addEventListener('mouseover', function(){
            if (mouseDown && !mouseUp){
                if(eraserMode == false){
                    if(colorValue == "undefined"){
                        childNode.style.backgroundColor = 'white';
                    }else{
                        childNode.style.backgroundColor = colorValue;
                    }
                }else{
                    childNode.style.backgroundColor = null;
                }
                
            }
        });

        childNode.addEventListener('mousedown', function(){
            if(eraserMode == false){
                if(colorValue == "undefined"){
                    childNode.style.backgroundColor = 'white';
                }else{
                    childNode.style.backgroundColor = colorValue;
                }
            }else{
                childNode.style.backgroundColor = null;
            }

        });
    
}
}

   
function generateCanvas(size){

    for (i = 1 ; i <= size ; i++){
        createColumn();
        populateColumn(size);
    }
}


generateCanvas(slider.defaultValue);

let mouseDown = false;
let mouseUp = true;

document.body.onmousedown = (event) => {mouseDown = event.isTrusted; mouseUp = false;};
document.body.onmouseup = (event) => {mouseUp = event.isTrusted; mouseDown = false;};


slider.addEventListener('change' , function(){
    console.log(slider.value);
    sliderValue.innerHTML = `${slider.value}X${slider.value}`;
    parentNode.innerHTML = "";
    generateCanvas(slider.value);

});


colorInput.addEventListener('input' , function(){
    colorValue = colorInput.value;
})

eraserToggle.addEventListener('change', function(){
    eraserMode = eraserToggle.checked;
})

canvasReset.addEventListener('click', function(){
    parentNode.innerHTML = "";
    generateCanvas(slider.value);
})

