let Logic = {}

Logic.createGameMap = function (m, n) {
  let gameMap = Array.apply(null, Array(m)).map(Array.prototype.valueOf, Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0))

  gameMap = gameMap.map(row => {
    return row.map(col => {
      let rand = Math.random()
      if (rand <= 0.20) return -1
      else return 0
    })
  })

  gameMap.forEach((row, i) => {
    return row.forEach((col, j) => {
      let left = true
      let upleft = true
      let up = true
      let upright = true
      let right = true
      let downright = true
      let down = true
      let downleft = true

      if (gameMap[i][j] === -1) {
        // up
        if (i === 0) {
          upleft = false
          up = false
          upright = false
        } else {
          if (j === 0 || gameMap[i - 1][j - 1] === -1) upleft = false
          if (gameMap[i - 1][j] === -1) up = false
          if (j === n - 1 || gameMap[i - 1][j + 1] === -1) upright = false
        }
        // down
        if (i === m - 1) {
          downleft = false
          down = false
          downright = false
        } else {
          if (j === 0 || gameMap[i + 1][j - 1] === -1) downleft = false
          if (gameMap[i + 1][j] === -1) down = false
          if (j === n - 1 || gameMap[i + 1][j + 1] === -1) downright = false
        }
        // left
        if (j === 0) {
          upleft = false
          left = false
          downleft = false
        } else {
          if (i === 0 || gameMap[i - 1][j - 1] === -1) upleft = false
          if (gameMap[i][j - 1] === -1) left = false
          if (i === m - 1 || gameMap[i + 1][j - 1] === -1) downleft = false
        }
        // right
        if (j === n - 1) {
          upright = false
          right = false
          downright = false
        } else {
          if (i === 0 || gameMap[i - 1][j + 1] === -1) upright = false
          if (gameMap[i][j + 1] === -1) right = false
          if (i === m - 1 || gameMap[i + 1][j + 1] === -1) downright = false
        }

        if (left) gameMap[i][j - 1]++
        if (upleft) gameMap[i - 1][j - 1]++
        if (up) gameMap[i - 1][j]++
        if (upright) gameMap[i - 1][j + 1]++
        if (right) gameMap[i][j + 1]++
        if (downright) gameMap[i + 1][j + 1]++
        if (down) gameMap[i + 1][j]++
        if (downleft) gameMap[i + 1][j - 1]++
      }
    })
  })
  gameMap = gameMap.map(row => {
    return row.map(col => {
      return {
        value: col,
        selectedBy: null
      }
    })
  })
  return gameMap
}

Logic.selectSquare = function (i, j, gameMap, username, color) {
  if (!gameMap[i][j].selectedBy) {
    gameMap[i][j].selectedBy = username
    gameMap[i][j].color = color

    if (gameMap[i][j].value === 0) {
      if (i !== 0) {
        gameMap = this.selectSquare(i - 1, j, gameMap, username, color)
        if (j !== 0) gameMap = this.selectSquare(i - 1, j - 1, gameMap, username, color)
        if (j !== (gameMap[i].length - 1)) gameMap = this.selectSquare(i - 1, j + 1, gameMap, username, color)
      }
      if (i !== (gameMap.length - 1)) {
        gameMap = this.selectSquare(i + 1, j, gameMap, username, color)
        if (j !== 0) gameMap = this.selectSquare(i + 1, j - 1, gameMap, username, color)
        if (j !== (gameMap[i].length - 1)) gameMap = this.selectSquare(i + 1, j + 1, gameMap, username, color)
      }
      if (j !== 0) gameMap = this.selectSquare(i, j - 1, gameMap, username, color)
      if (j !== (gameMap[i].length - 1)) gameMap = this.selectSquare(i, j + 1, gameMap, username, color)
    }
  }
  return gameMap
}

Logic.calculateScores = function (gameMap, username) {
  let totalScore = 0
  let userScore = 0
  let lost = false

  gameMap.forEach(row => {
    row.forEach(x => {
      if (x.selectedBy && x.value !== -1) {
        totalScore = totalScore + 1
        if (x.selectedBy === username) userScore = userScore + 1
      }
      if (x.selectedBy && x.value === -1 && x.selectedBy === username) lost = true
    })
  })

  let scores = {
    total: totalScore,
    user: {score: userScore, lost: lost}
  }
  return scores
}

export default Logic
