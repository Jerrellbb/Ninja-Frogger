// elements 
const grid = document.querySelector('#grid')

const currentScore = document.querySelectorAll('.currentScore')
// .currentScore
const muteBtn = document.querySelector('#mute')
// .muteBtn
const startBtn = document.querySelector('#startGame')
// .startBtn
const ninja = document.querySelector('#grid section.ninja')
// .ninja

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
let gameActive = false



let timeLeft = 100


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
function startGame() {
  gameActive = true

  // collisionActionLeft(collision1Pos, addClass(collision1Pos, collision1), removeClass(collision1Pos, collision1), collision1Row)
  
  // collisionActionLeft(collision3Pos, addClass(collision3Pos, collision3), removeClass(collision3Pos, collision3), collision3Row)

  
  // collisionActionRight(collision2Pos, addClass(collision2Pos, collision2), removeClass(collision2Pos, collision2), collision2Row)
  // collisionActionRight(collision4Pos, addClass(collision4Pos, collision4), removeClass(collision4Pos, collision4), collision4Row)
  
  collision1Action()
  collision2Action()
  collision3Action()
  collision4Action()

  goalItemAdd()
  document.addEventListener('keydown', keyPress)
  setInterval(collision1Action, 300)
  setInterval(collision2Action, 200)
  setInterval(collision3Action, 300)
  setInterval(collision4Action, 100)
  
} 
  


createGrid()
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
  
  // gameOverDisp.style.display = 'none'
    
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

// function addClass(collisionPos, cssClass){
//   cells[collisionPos].classList.add(cssClass)

// }

// function removeClass(collisionPos, cssClass){
//   cells[collisionPos].classList.remove(cssClass)
// }

function collision1remove(){
  cells[collision1Pos].classList.remove('collision1')

}
function collision2add(){
  
  cells[collision2Pos].classList.add('collision2')

}
function collision2remove(){
  cells[collision2Pos].classList.remove('collision2')

}
function collision3add(){
  cells[collision3Pos].classList.add('collision3')

}
function collision3remove(){
  cells[collision3Pos].classList.remove('collision3')

}
function collision4add(){
  
  cells[collision4Pos].classList.add('collision4')

}
function collision4remove(){
  cells[collision4Pos].classList.remove('collision4')

}
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

//rnadom spawn on a row


// start game 
//enable game active
function gameEnable(){
  if (gameActive === false){
    document.removeEventListener('keydown', keyPress)
  } else (gameActive === true)
  document.addEventListener('keydown', keyPress)
}




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
    gameActive = false
    gameOverDisp.style.display = ''
    
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

// function collisionActionLeft(collisionPos, addClass, removeClass, collisionRow){
//   if ( collisionPos  % width !== 0) {
//     addClass()
//     collisionPos--
//     removeClass()
//   } else {
//     removeClass()
//     collisionPos =  collisionRow * width + (width - 1)
//     addClass()
//   } 
//   if (collisionPos === currentPos){
//     return damage()
//   } 


// }

// function collisionActionRight(collisionPos, addClass, removeClass, collisionRow){
//   if ( collisionPos  % width !== 0) {
//     addClass()
//     collisionPos--
//     removeClass()
//   } else {
//     removeClass()
//     collisionPos =  collisionRow * width 
//     addClass()
//   } 
//   if (collisionPos === currentPos){
//     return damage()
//   }
// }
  
function collision1Action(){
  if ( collision1Pos  % width !== width - 1) {
    collision1remove()
    collision1Pos++
    collision1add()
  } else {
    collision1remove()
    collision1Pos = collision1Row * width 
      
    collision1add()
    
  } 
  // collision1Pos of is the same as current pos of ninja take damage
  if (collision1Pos === currentPos){
    return damage()
  }
}  
function collision2Action(){
  if ( collision2Pos  % width !== width - 1) {
    collision2remove()
    collision2Pos++
    collision2add()
  } else {
    collision2remove()
    collision2Pos = collision2Row * width 
      
    collision2add()
    
  } 
  // collision1Pos of is the same as current pos of ninja take damage
  if (collision2Pos === currentPos){
    return damage()
  }
}  
function collision3Action(){
  if ( collision3Pos  % width !== 0) {
    collision3remove()
    collision3Pos--
    collision3add()
  } else {
    collision3remove()
    collision3Pos =  collision3Row * width + (width - 1)
    collision3add()
    
  } 
  // collision1Pos of is the same as current pos of ninja take damage
  if (collision3Pos === currentPos){
    return damage()
  }
}  
function collision4Action(){
  if ( collision4Pos  % width !== width - 1) {
    collision4remove()
    collision4Pos++
    collision4add()
  } else {
    collision4remove()
    collision4Pos = collision4Row * width 
      
    collision4add()
    
  } 
  // collision1Pos of is the same as current pos of ninja take damage
  if (collision4Pos === currentPos){
    return damage()
  }
}  

  



// function to decreaseLife lives by 1 when ninja collides with collisionItem
//ninja collision logic if ninja currentpos = collisionPos -1 life
//ninja goes back to start position
function damage() {
  lives -= 1
  lifes[lives].style.visibility = 'hidden'
  resetNinja()
  console.log(lives)
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
//maybe's
//pause game btn
//high score log
// class wall arrow return nothin so ninja cant move into cell


