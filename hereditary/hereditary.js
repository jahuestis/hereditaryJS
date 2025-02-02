
import Window from './window.js';

const windowWidth = 300;
const windowHeight = 300;
let window1 = new Window('window 1', Math.random() * window.innerWidth, Math.random() * window.innerHeight, windowWidth, windowHeight);
let window2 = new Window('window 2', Math.random() * window.innerWidth, Math.random() * window.innerHeight, windowWidth, windowHeight);

const bodyText = document.createElement('p');
const bodyText2 = document.createElement('p');
bodyText.textContent = 'hello world';
bodyText2.textContent = 'hello world';
window1.appendToBody(bodyText);
window1.appendToBody(bodyText2);
document.body.appendChild(window1.element);
document.body.appendChild(window2.element);