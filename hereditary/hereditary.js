
import Window from './window.js';
import Daisy from './daisy.js';


function createDropdown(_class, options) {
    const dropdown = document.createElement("select");
    dropdown.classList.add(_class);
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option");
        option.textContent = options[i];
        dropdown.appendChild(option);
    }
    return dropdown;
}

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

function drawFlower(canvas, petalCount, petalRadius, centerRadius) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const ctx = canvas.getContext("2d");
    // Draw the petals
    ctx.fillStyle = 'white';
    for (let i = 0; i < petalCount; i++) {
        let angle = (i * 2 * Math.PI) / petalCount; // Evenly space petals
        let petalX = x + Math.cos(angle) * (centerRadius + petalRadius / 4);  // X position of petal
        let petalY = y + Math.sin(angle) * (centerRadius + petalRadius / 4);  // Y position of petal
        ctx.beginPath();
        ctx.arc(petalX, petalY, petalRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Draw the center of the flower
    ctx.fillStyle = '#ffb700';
    ctx.beginPath();
    ctx.arc(x, y, centerRadius, 0, 2 * Math.PI); // Center circle
    ctx.fill();
}

class DaisyWindow extends Window {
    constructor(daisy, x, y, width, height, hasCloser = false) {
        super(daisy.name, x, y, width, height, hasCloser);
        this.daisy = daisy;
        this.initializeWindowBody();
    }

    initializeWindowBody() {
        const parentsP = document.createElement("p");
        if (this.daisy.parent1 === null) { 
            parentsP.textContent = "Parents: n/a";
        } else {
            parentsP.textContent = "Parents: " + daisy.parent1.name + ", " + daisy.parent2.name;
        }
        this.appendToBody(parentsP);

        const dnaP = document.createElement("p");
        dnaP.textContent = "DNA: " + readableDNA(this.daisy.dnaDecoded);
        
        this.appendToBody(dnaP);

        const expressedP = document.createElement("p");
        expressedP.textContent = "Expressed: " + this.daisy.expressed + " petals";
        this.appendToBody(expressedP);
        
        const daisyCanvas = document.createElement("canvas");
        daisyCanvas.classList.add("daisy-canvas");
        daisyCanvas.width = 400;
        daisyCanvas.height = 400;
        drawFlower(daisyCanvas, this.daisy.expressed, 60, 120);
        this.appendToBody(daisyCanvas);

        const breedDiv = document.createElement("div");
        breedDiv.classList.add("breed-div");

        const breedButton = document.createElement("button");
        breedButton.classList.add("breed-button");
        breedButton.textContent = "Breed";

        const breedDropdown = createDropdown("breed-dropdown", daisys.map(daisy => daisy.daisy.name));

        breedDiv.appendChild(breedButton);
        breedDiv.appendChild(breedDropdown);
        this.appendToBody(breedDiv);
    }

    updateBreedOptions() {
        const breedDropdown = this.element.querySelector(".breed-dropdown");
        const options = daisys.map(daisy => daisy.daisy.name);
        breedDropdown.innerHTML = "";
        for (let i = 0; i < options.length; i++) {
            const option = document.createElement("option");
            option.textContent = options[i];
            breedDropdown.appendChild(option);
        }
    }
}


const windowWidth = 300;
const windowHeight = 300;

let daisyCounter = 0;

let daisys = [];

for (let i = 0; i < 2; i++) {
    const daisyWindow = new DaisyWindow(new Daisy("Daisy " + daisyCounter++), window.innerWidth / 2 - 350 + i * 400, 150, windowWidth, windowHeight);
    daisys.push(daisyWindow);
    document.body.appendChild(daisyWindow.element);
}

daisys.forEach(daisy => daisy.updateBreedOptions());



