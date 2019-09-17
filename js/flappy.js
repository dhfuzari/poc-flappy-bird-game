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