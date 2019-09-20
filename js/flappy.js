/** @function
 * @name newElement 
 * @description Creates a new HTML element with a class name 
 * @param {string} tagName 
 * @param {string} className 
 * @return {Object} elem
 */
function newElement(tagName, className) {
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem;
}

/** @function
 * @name ConstructPipe
 * @description A constructor function wich creates a new pipe element
 * @param {boolean} reverse 
 * @return {null} null
 */
function ConstructPipe(reverse = false) {
    this.element = newElement('div', 'pipe');

    const borderElement = newElement('div', 'border');
    const bodyElement = newElement('div', 'body');

    // Append border and body in pipe element accordind reverse value
    this.element.appendChild(reverse ? bodyElement : borderElement);
    this.element.appendChild(reverse ? borderElement : bodyElement);

    this.setHeight = height => bodyElement.style.height = `${height}px`;
}

function parOfPipes(height, slot, xAxis) {
    this.element = newElement('div', 'par-of-pipes');

    this.superior = new ConstructPipe(true);
    this.inferior = new ConstructPipe(false);

    this.element.appendChild(this.superior.element);
    this.element.appendChild(this.inferior.element);

    this.raffleSlot = () => {
        const superiorHeight = Math.random() * (height - slot);
        const inferiorHeight = height - slot - superiorHeight;
        this.superior.setHeight(superiorHeight);
        this.inferior.setHeight(inferiorHeight);
    }

    this.getX = () => parseInt(this.element.style.left.split('px')[0]);
    this.setX = x => this.element.style.left = `${x}px`;
    this.getWidth = () => this.element.clientWidth;

    this.raffleSlot();
    this.setX(xAxis);
}

const pipe1 = new parOfPipes(700, 200, 800);
document.querySelector('[wm-flappy]').appendChild(pipe1.element);