 // Create a style element
    var style = document.createElement('style');
    style.type = 'text/css';

    // Add the CSS rules
    style.innerHTML = `
    .context-window {
        position: absolute;
        border: 1px solid black;
        background-color: white;
        z-index: 1000;
        width: auto;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .context-window-title {
        background-color: #ccc;
        padding: 5px;
        cursor: move;
        font-weight: bold;
        border: 1px solid black;
    }

    .context-window-content {
        padding: 10px;
    }
    `;

    // Append the style element to the head of the document
    document.head.appendChild(style);

      let zIndexCounter = 1000; // Global z-index counter

class ContextWindow {
    constructor(title, startX = 0, startY = 0, amountOfButtonLevels = 5) {
        this.div = document.createElement('div');
        this.div.className = 'context-window';
        this.div.style.left = `${startX}px`;
        this.div.style.top = `${startY}px`;
        this.div.style.zIndex = zIndexCounter++; // Set initial z-index

        this.titleBar = document.createElement('div');
        this.titleBar.className = 'context-window-title';
        this.titleBar.innerText = title;

        // Toggle visibility button
        this.toggleButton = document.createElement('button');
        this.toggleButton.innerText = 'X';
        this.toggleButton.className = 'context-window-toggle';
        this.toggleButton.onclick = () => this.toggleVisibility();
        this.titleBar.appendChild(this.toggleButton);
        this.titleBar.style.right = "5px";

        this.div.appendChild(this.titleBar);

        this.content = document.createElement('div');
        this.content.className = 'context-window-content';
        this.div.appendChild(this.content);

        // New div for buttons
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = 'context-window-buttons';
        this.div.appendChild(this.buttonContainer);

        this.amountOfButtonLevels = amountOfButtonLevels;

        // Divs for different levels
        this.buttonLevels = [];
        for (let i = 0; i < amountOfButtonLevels; i++) {
            let levelDiv = document.createElement('div');
            levelDiv.className = `button-level-${i + 1}`;
            this.buttonContainer.appendChild(levelDiv);
            this.buttonLevels.push(levelDiv);
        }

        document.body.appendChild(this.div);

        this.text = '';

        this.initDrag();
        this.initFocus();
    }

    setText(text) {
        this.text = text;
        this.content.innerHTML = this.text; // Only update text content
    }

    addButton(label, onClick, level = 1) {
        const button = document.createElement('button');
        button.innerText = label;
        button.onclick = onClick; // Assign the provided click handler
        // Append button to the appropriate level container
        if (level >= 1 && level <= this.amountOfButtonLevels) {
            this.buttonLevels[level - 1].appendChild(button);
        } else {
            console.log("level out of range...");
        }
    }
    addButtonBreak(level = 1) {
    // Create a break element
    const breakElement = document.createElement('br');

    // Append the break element to the appropriate level container
    if (level >= 1 && level <= this.amountOfButtonLevels) {
        this.buttonLevels[level - 1].appendChild(breakElement);
    } else {
        console.log("level out of range...");
    }
}

    initDrag() {
        this.titleBar.onmousedown = this.onMouseDown.bind(this);
    }

    onMouseDown(event) {
        event.preventDefault();
        this.offsetX = event.clientX - this.div.offsetLeft;
        this.offsetY = event.clientY - this.div.offsetTop;
        this.dragging = true;

        document.onmouseup = this.onMouseUp.bind(this);
        document.onmousemove = this.onMouseMove.bind(this);

        this.bringToFront(); // Bring window to front when clicked
    }

    onMouseUp(event) {
        this.dragging = false;
        document.onmouseup = null;
        document.onmousemove = null;
    }

    onMouseMove(event) {
        event.preventDefault();
        if (this.dragging) {
            this.div.style.left = (event.clientX - this.offsetX) + 'px';
            this.div.style.top = (event.clientY - this.offsetY) + 'px';
        }
    }

    initFocus() {
        this.div.onclick = this.bringToFront.bind(this);
    }

    bringToFront() {
        this.div.style.zIndex = zIndexCounter++;
    }

    toggleVisibility(option = "undefined") {
        if (option === "undefined") {
            if (this.div.style.display === 'none') {
                this.div.style.display = 'block';
            } else {
                this.div.style.display = 'none';
            }
        } else if (option === "visible") {
            this.div.style.display = 'block';
        } else if (option === "hidden") {
            this.div.style.display = 'none';
        }
    }

    setButtonVisibility(level, visible) {
        if (level >= 1 && level <= this.amountOfButtonLevels) {
            this.buttonLevels[level - 1].style.display = visible ? 'block' : 'none';
        }
    }
    changeFontColor(color){
       this.content.style.color = color;
    }
    changeFontSize(size){
       this.content.style.fontSize = size;
    }
    changeBackgroundColor(color){
       this.div.style.backgroundColor = color;
    }

};

