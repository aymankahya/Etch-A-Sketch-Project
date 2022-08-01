/*

======================
Etch a sketch Project
======================

- Created a way to generate the grid based on the desired grid size
    + to create a grid : 1- Create adjacent column inside a flex box   // function createColumn()
                         2- Populate each column with the number of boxes (pixels or tiles)   //function populateColumn(size)

- Add the drawing behavior :
    + The tiles should become colored when a certain behaviour is in action
    + The behaviour is as follows :
         - When the user clicks and holds the mousedown state, the color changing action is possible
         - When the user drags the mouse cursor over the tiles its color changes,
         - Once the user releases the mousedown state the color changing function stops.


    + Detailed description of the behaviour :
        - (mousedown = active) and (cursor above tile = true) => changeColor();
        - (mousedown = not active) => stop changeColor();


- Some useful tools :
    + onmousedown event : occurs on a press on a mouse button over an element.
    + onmouseup event : executes a JavaScript when releasing a mouse button over a paragraph,

*/

const parentNode = document.querySelector('#canvas');

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
   
    const canvasHeight = parseInt(getComputedStyle(parentNode).height);
    const canvasWidth = parseInt(getComputedStyle(parentNode).width);

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
                childNode.style.backgroundColor = 'red';
            }
        });

        childNode.addEventListener('mousedown', function(){
                childNode.style.backgroundColor = 'red';

        });
    
}
}

   
function generateCanvas(size){

    for (i = 1 ; i <= size ; i++){
        createColumn();
        populateColumn(size);
    }
}




generateCanvas(100);

let mouseDown = false;
let mouseUp = true;

document.body.onmousedown = (event) => {mouseDown = event.isTrusted; mouseUp = false;};
document.body.onmouseup = (event) => {mouseUp = event.isTrusted; mouseDown = false;};