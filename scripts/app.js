// elements 
const grid = document.querySelector('#grid')

const currentScore = document.querySelector('.currentScore')
const endScore = document.querySelector('#gameOverScore')
// .currentScore
const muteBtn = document.querySelector('#mute')
// .muteBtn
const startBtn = document.querySelector('#startGame')
// .startBtn
const ninja = document.querySelector('#grid section.ninja')
// .ninja
const resetBtn = document.querySelector('#resetGame')

// .collision1
const collision1 = document.querySelector('#grid section.collision1')
const collision2 = document.querySelector('#grid section.collision2')
const collision3 = document.querySelector('#grid section.collision3')
const collision4 = document.querySelector('#grid section.collision4')

// .collision2

// .timeRemaining
const timeRemaining = document.querySelector('#timeRemaining')

// const goalItem = document.querySelector()
// .goalItem

// .gameOverDisp
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
let collision3Pos = 26
let collision4Pos = 64
const rockPos = [86, 87, 81, 82, 44, 45, 46, 15, 16, 17, 21, 22, 23 ]
// [103, 77]

// const row = 
//executions
let goalItemPos = 6
const collision1Row = Math.floor(collision1Pos / width)
const collision2Row = Math.floor(collision2Pos / width)
const collision3Row = Math.floor(collision3Pos / width)
const collision4Row = Math.floor(collision4Pos / width)

let actionLeft1
let actionRight1
let actionLeft2
let actionRight2

function startGame() {
  gameActive = true

  collision1Pos = collisionActionLeft(collision1Pos, collision1Row, addClass, removeClass, 'collision1')
  collision3Pos = collisionActionLeft(collision3Pos, collision3Row, addClass, removeClass, 'collision3')
  collision2Pos = collisionActionRight(collision2Pos, collision2Row, addClass, removeClass, 'collision2')
  collision4Pos = collisionActionRight(collision4Pos, collision4Row, addClass, removeClass, 'collision4')
  
  // collision1Action()
  // collision2Action()
  // collision3Action()
  // collision4Action()

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
  }, 300)
  actionRight2 = setInterval(() => {
    collision4Pos = collisionActionRight(collision4Pos, collision4Row, addClass, removeClass, 'collision4')
  }, 100)
} 
  



function createGrid(){
  
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('section')
    cell.innerText = i // remove to delete numbers in cells 
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


// function collision1remove(){
//   cells[collision1Pos].classList.remove('collision1')

// }
// function collision2add(){
  
//   cells[collision2Pos].classList.add('collision2')

// }
// function collision2remove(){
//   cells[collision2Pos].classList.remove('collision2')

// }
// function collision3add(){
//   cells[collision3Pos].classList.add('collision3')

// }
// function collision3remove(){
//   cells[collision3Pos].classList.remove('collision3')

// }
// function collision4add(){
  
//   cells[collision4Pos].classList.add('collision4')

// }
// function collision4remove(){
//   cells[collision4Pos].classList.remove('collision4')

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
    
    document.removeEventListener('keydown', keyPress)
    clearInterval(timer)
  }
    

}
const timer = setInterval(gameEnd, 1000)


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
    collisionPos = collisionPos - 1
    add(collisionPos, cssClass)
  } else {
    remove(collisionPos, cssClass)
    collisionPos =  collisionRow * width + (width - 1)
    add(collisionPos, cssClass)
  } 
  if (collisionPos === currentPos){
    return damage()
  } 
  return collisionPos

}
function collisionActionRight(collisionPos, collisionRow, add, remove, cssClass){
  if ( collisionPos  % width !== width - 1) {
    remove(collisionPos, cssClass)
    collisionPos = collisionPos + 1
    add(collisionPos, cssClass)
  } else {
    remove(collisionPos, cssClass)
    collisionPos =  collisionRow * width 
    add(collisionPos, cssClass)
  } 
  if (collisionPos === currentPos){
    return damage()
  } 
  return collisionPos

}





// function collision1Action(){
//   if ( collision1Pos  % width !== 0) {
//     collision1remove()
//     collision1Pos--
//     collision1add()
//   } else {
//     collision1remove()
//     collision1Pos = collision1Row * width + (width - 1)
      
//     collision1add()
    
//   } 
//   // collision1Pos of is the same as current pos of ninja take damage
//   if (collision1Pos === currentPos){
//     return damage()
//   }
// }  
// function collision2Action(){
//   if ( collision2Pos  % width !== width - 1) {
//     collision2remove()
//     collision2Pos++
//     collision2add()
//   } else {
//     collision2remove()
//     collision2Pos = collision2Row * width 
      
//     collision2add()
    
//   } 
//   // collision1Pos of is the same as current pos of ninja take damage
//   if (collision2Pos === currentPos){
//     return damage()
//   }
// }  
// function collision3Action(){
//   if ( collision3Pos  % width !== 0) {
//     collision3remove()
//     collision3Pos--
//     collision3add()
//   } else {
//     collision3remove()
//     collision3Pos =  collision3Row * width + (width - 1)
//     collision3add()
    
//   } 
//   // collision1Pos of is the same as current pos of ninja take damage
//   if (collision3Pos === currentPos){
//     return damage()
//   }
// }  
// function collision4Action(){
//   if ( collision4Pos  % width !== width - 1) {
//     collision4remove()
//     collision4Pos++
//     collision4add()
//   } else {
//     collision4remove()
//     collision4Pos = collision4Row * width 
      
//     collision4add()
    
//   } 
//   // collision1Pos of is the same as current pos of ninja take damage
//   if (collision4Pos === currentPos){
//     return damage()
//   }
// }  

  


console.log(currentScore)
// function to decreaseLife lives by 1 when ninja collides with collisionItem
//ninja collision logic if ninja currentpos = collisionPos -1 life
//ninja goes back to start position
function damage() {
  lives -= 1
  lifes[lives].style.visibility = 'hidden'
  resetNinja()
  
}  
  


function resetGame(){
  lifes[lives].style.visibility = ''
  startBtn.removeEventListener('click', gameEnd) 
  resetGV()
  gameOverDisp.style.display = 'hidden'
}

function resetGV(){
  collision1Pos = 103
  collision2Pos = 65
  collision3Pos = 26
  collision4Pos = 64
  timeLeft = 100
  score = 0
  currentPos = startPosition
  lives = 3
  goalItemPos = 6
  clearInterval(actionLeft1)
  clearInterval(actionLeft2)
  clearInterval(actionRight1)
  clearInterval(actionRight2)
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
//maybe's
//pause game btn
//high score log
// class wall arrow return nothin so ninja cant move into cell

createGrid()
