// elements 
const grid = document.querySelector('#grid')

const audio = new Audio('../assets/8bitninja.wav')
const currentScore = document.querySelector('.currentScore')
const endScore = document.querySelector('#gameOverScore')

const muteBtn = document.querySelector('#mute')

const startBtn = document.querySelector('#startGame')

const ninja = document.querySelector('#grid section.ninja')

const resetBtn = document.querySelector('#resetGame')
const startScreen = document.querySelector('#startScreen')

const collision1 = document.querySelector('#grid section.collision1')
const collision2 = document.querySelector('#grid section.collision2')
const collision3 = document.querySelector('#grid section.collision3')
const collision4 = document.querySelector('#grid section.collision4')


const timeRemaining = document.querySelector('#timeRemaining')


const gameOverDisp = document.querySelector('#gameOverDisp')
const lifes = Array.from(document.querySelectorAll('#lives img'))

//variables
let lives = 3

const startPosition = 110
let currentPos = startPosition
let score = 0


const cells = []




let timeLeft = 100
let gameActive = false

const width = 13 
const height = 9
const cellCount = height * width 
let collision1Pos = 103
let collision2Pos = 65
let collision3Pos = 64
let collision4Pos = 26
const rockPos = [86, 87, 81, 82, 44, 45, 46, 15, 16, 17, 21, 22, 23 ]


let goalItemPos = 6
const collision1Row = Math.floor(collision1Pos / width)
const collision2Row = Math.floor(collision2Pos / width)
const collision3Row = Math.floor(collision3Pos / width)
const collision4Row = Math.floor(collision4Pos / width)

let actionLeft1
let actionRight1
let actionLeft2
let actionRight2
//executions
function startGame() {
  gameActive = true
  startScreen.style.display = 'none'
  playAudio('../assets/8bitninja.wav')
  collision1Pos = collisionActionLeft(collision1Pos, collision1Row, addClass, removeClass, 'collision1')
  collision3Pos = collisionActionLeft(collision3Pos, collision3Row, addClass, removeClass, 'collision3')
  collision2Pos = collisionActionRight(collision2Pos, collision2Row, addClass, removeClass, 'collision2')
  collision4Pos = collisionActionRight(collision4Pos, collision4Row, addClass, removeClass, 'collision4')
  
  

  goalItemAdd()
  document.addEventListener('keydown', keyPress)
  actionLeft1 = setInterval(() => { 
    collision1Pos = collisionActionLeft(collision1Pos, collision1Row, addClass, removeClass, 'collision1')
  }, 300)
  actionRight1 = setInterval(() => {
    collision2Pos = collisionActionRight(collision2Pos, collision2Row, addClass, removeClass, 'collision2')
  }, 200)
  actionLeft2 = setInterval(() => {
    collision3Pos = collisionActionLeft(collision3Pos, collision3Row, addClass, removeClass, 'collision3')
  }, 220)
  actionRight2 = setInterval(() => {
    collision4Pos = collisionActionRight(collision4Pos, collision4Row, addClass, removeClass, 'collision4')
  }, 100)
} 
  



function createGrid(){
  
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('section')
    // cell.innerText = i // remove to delete numbers in cells 
    cell.id = i
    // Set width and height of the div cells
    cell.style.width = `${100 / width}%`
    grid.append(cell)
    cells.push(cell)
  }
  
  gameOverDisp.style.display = 'none'
    
  addNinja()
  addRock()
  
}

function addNinja(){
  cells[currentPos].classList.add('ninja')
}

function removeNinja(){
  cells[currentPos].classList.remove('ninja')
}

function goalItemAdd(){
  cells[goalItemPos].classList.add('goalItem')
}
function goalItemRemove(){
  cells[goalItemPos].classList.remove('goalItem')
}
function collision1add(){
  cells[collision1Pos].classList.add('collision1')

}

function addClass(collisionPos, cssClass){
  cells[collisionPos].classList.add(cssClass)

}

function removeClass(collisionPos, cssClass){
  cells[collisionPos].classList.remove(cssClass)
}



// }
function resetNinja(){
  cells[currentPos].classList.remove('ninja') 
  currentPos = startPosition 
  addNinja() 
  
}
function addRock(){
  

  for (const position of rockPos) {
    cells[position].classList.add('wall')
  }
}
//when goalitem is reached reset ninja to start position




// start game 
//enable game active




// setInterval (collisionItem2 move opposite direction at faster speed)


//function for game over with lives or time over
// setTimeout for gameover when timer runs down to 0
// remove display none from gameOverdisp
// game active false
function gameEnd(){
  if (gameActive === true){
    timeLeft--
    timeRemaining.innerText = timeLeft
  }
  if (timeLeft === 0 || lives === 0){
    
    gameOverDisp.style.display = ''
    removeNinja()
    goalItemRemove()

    document.removeEventListener('keydown', keyPress)
    clearInterval(timer)
  }
  
}
let timer = setInterval(gameEnd, 1000)


// function to increase currentScore when collecting goalItem
//replace goalItem class with hidden
//+ currentScore
//ninja start position
//replace hidden class goalItem so u can collect it again
function point() {
  if (currentPos === goalItemPos){
    goalItemRemove()
    score += 100
    currentScore.innerText = score
    endScore.innerText = score
    resetNinja()
    goalItemPos = rndmPos(0)
    setTimeout(goalItemAdd, 3000)
    
  }
}

function rndmPos(row) {
  //  random position in  row
  return row * width + Math.floor(Math.random() * width)
}


// setInterval (collisionItem1 left across grid at speed)

function collisionActionLeft(collisionPos, collisionRow, add, remove, cssClass){
  
  if ( collisionPos  % width !== 0) {
    remove(collisionPos, cssClass)
    collisionPos --
    add(collisionPos, cssClass)
  } else {
    remove(collisionPos, cssClass)
    collisionPos =  collisionRow * width + (width - 1)
    add(collisionPos, cssClass)
  } 
  if (collisionPos === currentPos){
    
    damage()
    
  } 
  return collisionPos

}

function collisionActionRight(collisionPos, collisionRow, add, remove, cssClass){
  if ( collisionPos  % width !== width - 1) {
    remove(collisionPos, cssClass)
    collisionPos ++
    add(collisionPos, cssClass)
  } else {
    remove(collisionPos, cssClass)
    collisionPos =  collisionRow * width 
    add(collisionPos, cssClass)
  } 
  if (collisionPos === currentPos){
    damage()
  } 
  return collisionPos

}






// function to decreaseLife lives by 1 when ninja collides with collisionItem
//ninja collision logic if ninja currentpos = collisionPos -1 life
//ninja goes back to start position
function damage() {
  lives -= 1
  lifes[lives].style.visibility = 'hidden'
  resetNinja()
  
}  
  

function resetGame(){
  resetVar()
  
  lifes.forEach((life) => (life.style.visibility = 'visible'))
  clearInterval(actionLeft1)
  clearInterval(actionLeft2)
  clearInterval(actionRight1)
  clearInterval(actionRight2)
  clearInterval(timer)
  gameOverDisp.style.display = 'none'
  removeNinja()
  startGame()
  addNinja()
  timer = setInterval(gameEnd,1000)
  
}

function resetVar(){
  collision1Pos = 103
  collision2Pos = 65
  collision3Pos = 26
  collision4Pos = 64
  timeLeft = 100
  score = 0
  currentPos = startPosition
  lives = 3
  goalItemPos = 6
  currentScore.innerText = score
  endScore.innerText = score
  timeRemaining.innerText = timeLeft
}


//if game active false remove move ninja evenlistener


// moveNinja()
///events
// move ninja on keypress
function keyPress(evt){
  const key = evt.code
  const prevPos = currentPos
  removeNinja()

  if (key === 'ArrowUp' && currentPos >= width) {
    currentPos -= width
  } else if (key === 'ArrowDown' && currentPos + width < cells.length) {
    currentPos += width
  } else if (key === 'ArrowLeft' && currentPos % width !== 0) {
    currentPos--
  } else if (key === 'ArrowRight' && currentPos % width !== width - 1) {
    currentPos++
  }
  if (cells[currentPos].classList.contains('wall')) {
    currentPos = prevPos
  }
  addNinja()
  point()
  if (currentPos === collision1Pos || currentPos === collision2Pos || currentPos === collision3Pos || currentPos === collision4Pos){
    return damage()
  }
}


// mute sound on button click
//start game on button click
startBtn.addEventListener('click', startGame) 
startBtn.addEventListener('click', gameEnd) 
resetBtn.addEventListener('click', resetGame)
muteBtn.addEventListener('click', audioMute)



function audioMute(){
  if (audio.muted === false){
    audio.muted = true
  } else {
    audio.muted === true
    audio.muted = false
  }
}
//maybe's
//pause game btn
//high score log

function playAudio(){
  audio.muted = false
  audio.loop = true
  audio.volume = 0.2
  audio.autoplay
  audio.currentTime = 0
  audio.play('../assets/8bitninja.wav')
  
}


createGrid()
