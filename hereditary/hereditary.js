
import Window from './window.js';
import Daisy from './daisy.js';

const windowWidth = 300;
const windowHeight = 300;

let daisyCounter = 0;

const daisy1 = new Daisy("Daisy" + daisyCounter++);
const daisy2 = new Daisy("Daisy" + daisyCounter++);
const daisy3 = daisy1.breed(daisy2, "Daisy" + daisyCounter++);

function readableDNA(dnaDecoded) {
    let dnaString = "";
    dnaString += dnaDecoded.slice(0, 4)
    dnaString += "(";
    for (let i = 8; i < 12; i++) {
        if (dnaDecoded[i] === '1') {
            dnaString += "D";
        } else {
            dnaString += "R";
        }
    }
    dnaString += ") ";
    dnaString += dnaDecoded.slice(4, 8);
    dnaString += "(";
    for (let i = 12; i < 16; i++) {
        if (dnaDecoded[i] === '1') {
            dnaString += "D";
        } else {
            dnaString += "R";
        }
    }
    dnaString += ")";

    return dnaString;
    
}
function createDaisyWindow(daisy, x, y, width, height, hasCloser = true) {
    const daisyWindow = new Window(daisy.name, x, y, width, height, hasCloser);

    const parentsP = document.createElement("p");
    if (daisy.parent1 === null) { 
        parentsP.textContent = "Parents: n/a";
    } else {
        parentsP.textContent = "Parents: " + daisy.parent1.name + ", " + daisy.parent2.name;
    }
    daisyWindow.appendToBody(parentsP);

    const dnaP = document.createElement("p");
    dnaP.textContent = "DNA: " + readableDNA(daisy.dnaDecoded);
    
    daisyWindow.appendToBody(dnaP);

    const expressedP = document.createElement("p");
    expressedP.textContent = "Expressed: " + daisy.expressed + " petals";
    daisyWindow.appendToBody(expressedP);
    
    
    return daisyWindow;
}

let window1 = createDaisyWindow(daisy1, 100, 100, windowWidth, windowHeight);
let window2 = createDaisyWindow(daisy2, 500, 100, windowWidth, windowHeight);
let window3 = createDaisyWindow(daisy3, 900, 100, windowWidth, windowHeight);

document.body.appendChild(window1.element);
document.body.appendChild(window2.element);
document.body.appendChild(window3.element);


