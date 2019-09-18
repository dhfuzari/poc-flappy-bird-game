/** @function
 * @name newElement 
 * @description Creates a new HTML element with a class name 
 * @param {string} tagName 
 * @param {string} className 
 * @return {Object} elem
 */

function newElement(tagName, className) {
    const elem = document.creacteElement(tagName);
    elem.className = className;
    return elem;
}

/** @function
 * @name constructPipe
 * @description A factory function wich creates a new pipe element
 * @param {boolean} reverse 
 * @return {null} null
 */
function constructPipe(reverse = false) {
    this.element = newElement('div', 'pipe');

    const border = newElement('div', 'border');
    const body = newElement('div', 'body');

    // Append border and body in pipe element accordind reverse value
    this.element.appendChild(reverse ? body : border);
    this.element.appendChild(reverse ? border : body);

    this.setHeight = height => body.style.height = `${height}px`;
}