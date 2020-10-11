let tipEle = document.querySelector("#tips")
let boardEle= document.querySelector('#board')

// 1:⭕️   2:❌
let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

const enmu = {
  0: "",
  1: "⭕️",
  2: "❌"
}
let color = 1
let gameOver = false

function show() {
  
  boardEle.innerHTML = ""

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = enmu[pattern[i][j]]
      cell.addEventListener('click', () => userMove(i, j))
      boardEle.appendChild(cell)
    }
    boardEle.appendChild(document.createElement('br'))
  }

}
function userMove(i, j) {
  if(gameOver){
    alert('Game over！！')
    return false
  }

  if (pattern[i][j] == 0 ) {

    pattern[i][j] = color
    if (check(pattern, color)) {
      tipEle.innerText = enmu[color]
    }
    color = 3 - color
    show()
    if (willWin(pattern, color)) {
      tipEle.innerText = enmu[color]
    }
    computerMove()
  }
}

function computerMove() {
  let choice = bestChoice(pattern, color)
  if (choice.point) {
    pattern[choice.point[0]][choice.point[1]] = color
  }
  if (check(pattern, color)) {
    tipEle.innerText = enmu[color]+'is winner！'
    gameOver = true
  }
  color = 3 - color
  show()
}

function check(pattern, color) {
  for (let i = 0; i < 3; i++) {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== color) {
        win = false
      }
    }
    if (win) return true
  }
  for (let i = 0; i < 3; i++) {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[j][i] !== color) {
        win = false
      }
    }
    if (win) return true
  }
  {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[j][j] !== color) {
        win = false
      }
    }
    if (win) return true
  }
  {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[j][2 - j] !== color) {
        win = false
      }
    }
    if (win) return true
  }
  return false
}

function clone(pattern) {
  return JSON.parse(JSON.stringify(pattern))
}


function willWin(pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j]) continue
      let temp = clone(pattern)
      temp[i][j] = color
      if (check(temp, color)) return [i, j]
    }
  }
  return null
}


function bestChoice(pattern, color) {
  let p
  if (p = willWin(pattern, color)) {
    return {
      point: p,
      result: 1
    }
  }
  let result = -2
  let point = null
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j]) continue
      let temp = clone(pattern)
      temp[i][j] = color
      let r = bestChoice(temp, 3 - color).result

      if (-r > result) {
        result = -r
        point = [i, j]
      }
      if (result == 1) {
        break outer
      }

    }
  }

  return {
    point: point,
    result: point ? result : 0
  }
}

show()
console.log(bestChoice(pattern, color))