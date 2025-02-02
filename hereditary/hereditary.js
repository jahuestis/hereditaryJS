
import Window from './window.js';

const windowWidth = 300;
const windowHeight = 300;
let window1 = new Window('window1', Math.random() * window.innerWidth, Math.random() * window.innerHeight, windowWidth, windowHeight);
let window2 = new Window('window2', Math.random() * window.innerWidth, Math.random() * window.innerHeight, windowWidth, windowHeight);

let window1BodyText = document.createElement('p');
window1BodyText.textContent = 'hello world';
window1.element.appendChild(window1BodyText);
document.body.appendChild(window1.element);
document.body.appendChild(window2.element);