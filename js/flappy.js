/** @function
 * @name newElement
 * @description Creates a new element with a class name - tagName.className
 * @param {string} tagName
 * @param {string} className
 * @return {Object} elem
 */
function newElement(tagName, className) {
  const elem = document.createElement(tagName);
  elem.className = className;
  return elem;
}
// How to use it:
// const newElementBorder = newElement('div', 'border');
// const newElementBody = newElement('div', 'body');
// const newElementPipe = newElement('div', 'pipe');
// newElementPipe.appendChild(newElementBody);
// newElementPipe.appendChild(newElementBorder);
// document.querySelector('[wm-flappy]').appendChild(newElementPipe);



/** @function
 * @name Pipe
 * @description A constructor function wich creates a new Pipe element - .pipe
 * @param {boolean} reverse
 * @return {undefined} undefined - Constructor function
 */
function Pipe(reverse = false) {
  this.element = newElement('div', 'pipe');

  const borderElement = newElement('div', 'border');
  const bodyElement = newElement('div', 'body');

  // Append border and body in pipe element accordind reverse value
  this.element.appendChild(reverse ? bodyElement : borderElement);
  this.element.appendChild(reverse ? borderElement : bodyElement);

  this.setHeight = height => bodyElement.style.height = `${height}px`;
}
// How to use it:
// const pipe_1 = new Pipe();
// pipe_1.setHeight(300);
// document.querySelector('[wm-flappy]').appendChild(pipe_1);



/** @function
 * @name ParOfPipes
 * @description A constructor function wich creates a new ParOfPipes element - .par-of-pipes
 * @param {number} height The height of screen(or game area)
 * @param {number} slot The size of slot
 * @param {number} xAxis The main axis - horizontal - position
 * @return {undefined} undefined - Constructor function
 */
function ParOfPipes(height, slot, xAxis) {
  this.element = newElement('div', 'par-of-pipes');

  this.superior = new Pipe(true);
  this.inferior = new Pipe(false);

  this.element.appendChild(this.superior.element);
  this.element.appendChild(this.inferior.element);

  this.raffleSlot = () => {
    const superiorHeight = Math.random() * (height - slot);
    const inferiorHeight = height - slot - superiorHeight;
    this.superior.setHeight(superiorHeight);
    this.inferior.setHeight(inferiorHeight);
  }

  this.getXAxis = () => parseInt(this.element.style.left.split('px')[0]);
  this.setXAxis = x => this.element.style.left = `${x}px`;

  this.getWidth = () => this.element.clientWidth;

  this.raffleSlot();
  this.setXAxis(xAxis);
}
// How to use it:
// const parsOfPipes_1 = new ParOfPipes(400, 200, 0);
// const parsOfPipes_2 = new ParOfPipes(400, 200, 150);
// const parsOfPipes_3 = new ParOfPipes(400, 200, 300);
// document.querySelector('[wm-flappy]').appendChild(parsOfPipes_1.element);
// document.querySelector('[wm-flappy]').appendChild(parsOfPipes_2.element);
// document.querySelector('[wm-flappy]').appendChild(parsOfPipes_3.element);



/** @function
 * @name ConstructPipes
 * @description A constructor function wich creates n ParOfPipes elements
 * @param {number} heightArea The height of screen(or game area)
 * @param {number} widthArea The width of screen(or game area)
 * @param {number} slot The vertical free space between two Pipe elements
 * @param {number} space The horizontal free space between each ParOfPipes element
 * @param {function} notifyCrossedCenter A function wich notify as soon as a ParOfPipes cross the middle of the screen
 * @return {undefined} undefined - Constructor function
 */
function ConstructPipes(heightArea, widthArea, slot, space, notifyCrossedCenter) {
  this.parsOfPipes = [
    new ParOfPipes(heightArea, slot, widthArea),
    new ParOfPipes(heightArea, slot, widthArea + space),
    new ParOfPipes(heightArea, slot, widthArea + space * 2),
    new ParOfPipes(heightArea, slot, widthArea + space * 3),
  ];

  const displacement = 3; // the number of pixels to displace ParOfPipes on animate then

  this.animate = () => {
    this.parsOfPipes.forEach(par => {
      par.setXAxis(par.getXAxis() - displacement);

      // When element goes out from game area, then set it X axis to the beggining of game area
      if (par.getXAxis() < -par.getWidth()) {
        par.setXAxis(par.getXAxis() + space * this.parsOfPipes.length);
        par.raffleSlot()
      }

      const middle = widthArea / 2;
      const crossedMiddleOfGameArea = par.getXAxis() + displacement >= middle && par.getXAxis() < middle;
      crossedMiddleOfGameArea && notifyCrossedCenter()
    });
  }
}
// how to use it:
// const constructPipes = new ConstructPipes(500, 900, 200, 400, () => { });
// const gameArea = document.querySelector('[wm-flappy]');
// constructPipes.parsOfPipes.forEach(parOfPipe => gameArea.appendChild(parOfPipe.element));
// setInterval(() => {
//     constructPipes.animate();
// }, 20);


/** @function
 * @name Bird
 * @description A constructor function wich creates and animates a new Bird element
 * @param {number} heightArea The height of screen(or game area)
 * @return {undefined} undefined - Constructor function
 */
function Bird(heightArea) {
  let flying = false;

  this.element = newElement('img', 'bird');
  this.element.src = './imgs/bird.png';

  this.getYAxis = () => parseInt(this.element.style.bottom.split('px')[0]);
  this.setYAxis = (yAxis) => this.element.style.bottom = `${yAxis}px`;

  window.onkeydown = e => flying = true;
  window.onkeyup = e => flying = false;

  this.animate = () => {
    const newYAxis = this.getYAxis() + (flying ? 7 : -4); // 8: -5
    const maxHeightBirdCanFly = heightArea - this.element.clientHeight;

    if (newYAxis <= 0) { this.setYAxis(0); }
    else if (newYAxis >= maxHeightBirdCanFly) { this.setYAxis(maxHeightBirdCanFly); }
    else { this.setYAxis(newYAxis); }
  }

  this.setYAxis(heightArea / 2);
}
// how to use it:
// const bird = new Bird(500);
// const constructPipes = new ConstructPipes(500, 900, 200, 400, () => { });
// const gameArea = document.querySelector('[wm-flappy]');
// gameArea.appendChild(bird.element);
// constructPipes.parsOfPipes.forEach(parOfPipe => gameArea.appendChild(parOfPipe.element));
// setInterval(() => {
//     constructPipes.animate();
//     bird.animate();
// }, 30);


/** @function
 * @name Progress
 * @description A constructor function wich creates a Progress element to count the score
 * @return {undefined} undefined - Constructor function
 */
function Progress() {
  this.element = newElement('span', 'progress');
  this.updateGameScore = score => {
    this.element.innerHTML = score;
  }
  this.updateGameScore(0);
}
// how to use it:
// const bird = new Bird(500);
// const progress = new Progress();
// const constructPipes = new ConstructPipes(500, 900, 200, 400, () => { });
// const gameArea = document.querySelector('[wm-flappy]');
// gameArea.appendChild(bird.element);
// gameArea.appendChild(progress.element);
// constructPipes.parsOfPipes.forEach(parOfPipe => gameArea.appendChild(parOfPipe.element));
// setInterval(() => {
//     constructPipes.animate();
//     bird.animate();
// }, 30);


/** @function
 * @name overlappingElements
 * @description A function to check if two elements occupy the same space
 * @return {bool} horizontal && vertical
 */
function overlappingElements(elementX, elementY) {
  const x = elementX.getBoundingClientRect();
  const y = elementY.getBoundingClientRect();
  const horizontal = x.left + x.width >= y.left && y.left + y.width >= x.left;
  const vertical = x.top + x.height >= y.top && y.top + y.height >= x.top;
  return horizontal && vertical;
}

/** @function
 * @name collisionTest
 * @description A function to test if bird element collided with any Pipe element
 * @return {bool} collided
 */
function collisionTest(bird, pipes) {
  let collided = false;
  pipes.parsOfPipes.forEach((parOfPipe) => {
    if (!collided) {
      const superior = parOfPipe.superior.element;
      const inferior = parOfPipe.inferior.element;
      collided = overlappingElements(bird.element, superior)
        || overlappingElements(bird.element, inferior);
    }
  });
  return collided;
}

/** @function
 * @name FlappyBird
 * @description A constructor function wich creates all game structure and starts it
 * @return {undefined} undefined - Constructor function
 */
function FlappyBird() {
  let score = 0;
  const gameArea = document.querySelector('[wm-flappy]');
  const heightArea = gameArea.clientHeight;
  const widthArea = gameArea.clientWidth;
  const progress = new Progress();
  const constructPipes = new ConstructPipes(heightArea, widthArea, 200, 400, () => {
    progress.updateGameScore(++score);
  });
  const bird = new Bird(heightArea);
  gameArea.appendChild(progress.element);
  gameArea.appendChild(bird.element);
  constructPipes.parsOfPipes.forEach(parOfPipe => gameArea.appendChild(parOfPipe.element));

  this.start = () => {
    const timer = setInterval(() => {
      constructPipes.animate();
      bird.animate();

      if (collisionTest(bird, constructPipes)) clearInterval(timer);
    }, 20)
  }
}

new FlappyBird().start();
