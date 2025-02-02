
export default class Window {
    constructor(label, x, y, width = 250, height = 250) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.element = this.createElement();

        this.updatePosition(this.element);
        
    }

    createElement() {
        const windowElement = document.createElement('div');
        windowElement.classList.add('window')

        const windowBody = document.createElement('div');
        windowBody.classList.add('window-body');

        const windowHeader = document.createElement('div');
        windowHeader.classList.add('window-header');

        const windowLabel = document.createElement('div');
        windowLabel.classList.add('window-label');
        windowLabel.addEventListener('mousedown', (event) => {
            event.preventDefault();
            windowElement.style.zIndex = performance.now();
            console.log(windowElement.style.zIndex);
            if (event.button === 0) {
                const offsetX = this.x - event.clientX;
                const offsetY = this.y - event.clientY;

                const onDrag = (event) => this.onDrag(event, windowElement, offsetX, offsetY);
                document.addEventListener('mousemove', onDrag);

                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', onDrag);
                });
            }
        });

        const windowLabelText = document.createElement('p');
        windowLabelText.classList.add('window-label-text');
        windowLabelText.textContent = this.label;

        const windowCloser = document.createElement('button');
        windowCloser.classList.add('window-closer');
        windowCloser.textContent = 'X';
        windowCloser.addEventListener('click', () => {
            windowElement.remove();
        });

        windowLabel.appendChild(windowLabelText);
        windowHeader.appendChild(windowLabel);
        windowHeader.appendChild(windowCloser);
        windowElement.appendChild(windowHeader);
        windowElement.appendChild(windowBody);


        

        return windowElement
    }




    onDrag(event, windowElement, offsetX, offsetY) {
        this.x = event.clientX + offsetX
        this.y = event.clientY + offsetY;
        this.updatePosition(windowElement);
    }

    updatePosition(windowElement) {
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > window.innerWidth - this.width - 10) {
            this.x = window.innerWidth - this.width - 10;
        }
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > window.innerHeight - this.height - 10) {
            this.y = window.innerHeight - this.height - 10;
        }

        windowElement.style.left = this.x + 'px';
        windowElement.style.top = this.y + 'px';
    }
}