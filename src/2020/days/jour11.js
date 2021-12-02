import { input } from "data/input11"
import { reducerSum } from "util/array"

const dataBrut = input.split("\n")
const seatsInput = dataBrut.map((row) => row.split(""))
function result1() {
  return getNbOccupied(seatsInput, countAdjacent)
}

function result2() {
  return getNbOccupied(seatsInput, countAdjacentAllDirection, 5)
}

export default function getResultats() {
  return [result1(), result2()]
}

const getNbOccupied = (seats, countFunction, nombreMax) =>
  getSeatsTransformed(seats, countFunction, nombreMax)
    .map((r) => r.filter((s) => isOccupied(s)).length)
    .reduce(reducerSum)

const getSeatsTransformed = (seats, countFunction, nombreMax) => {
  let allSeats
  let seatsTransformed = [...seats]
  do {
    allSeats = [...seatsTransformed]
    seatsTransformed = transformSeats(allSeats, countFunction, nombreMax)
  } while (isDifferentValues(allSeats, seatsTransformed))
  return seatsTransformed
}

const isDifferentValues = (seats1, seats2) => {
  for (let i = 0; i < seats1.length; i++) {
    for (let j = 0; j < seats1[i].length; j++) {
      if (seats1[i][j] !== seats2[i][j]) return true
    }
  }
  return false
}

const isVoid = (seat) => seat === "L"
const isOccupied = (seat) => seat === "#"
const isPoint = (seat) => seat === "."
const countAdjacent = (seats, i, j) =>
  getAroundSeats(seats, i, j).filter((s) => isOccupied(s)).length

const countAdjacentAllDirection = (seats, i, j) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
  const adjacentsAllDirections = directions.map((d) => {
    let n = i + d[0]
    let p = j + d[1]
    while (n >= 0 && p >= 0 && n < seats.length && p < seats[i].length) {
      if (seats[n][p] === "L") {
        return false
      }
      if (seats[n][p] === "#") {
        return true
      } else {
        n = n + d[0]
        p = p + d[1]
      }
    }
    return false
  })

  return adjacentsAllDirections.reduce(reducerSum)
}

const transformSeats = (seats, count = countAdjacent, nombreMax = 4) =>
  seats.map((row, i) =>
    row.map((seat, j) => {
      let newSeat
      let a, b
      if (isPoint(seat)) {
        newSeat = seat
      } else if (isVoid(seat)) {
        b = count(seats, i, j)
        newSeat = b === 0 ? "#" : seat
      } else if (isOccupied(seat)) {
        a = count(seats, i, j)
        newSeat = a >= nombreMax ? "L" : seat
      }
      return newSeat
    })
  )
const getAroundSeats = (seats, i, j) => {
  const aroundSeats = []
  if (i > 0) {
    aroundSeats.push(seats[i - 1][j])
    if (j > 0) aroundSeats.push(seats[i - 1][j - 1])
    if (j < seats[i].length - 1) aroundSeats.push(seats[i - 1][j + 1])
  }
  if (i < seats.length - 1) {
    if (j > 0) aroundSeats.push(seats[i + 1][j - 1])
    if (j < seats[i].length - 1) aroundSeats.push(seats[i + 1][j + 1])
    aroundSeats.push(seats[i + 1][j])
  }
  if (j > 0) aroundSeats.push(seats[i][j - 1])
  if (j < seats[i].length - 1) aroundSeats.push(seats[i][j + 1])

  return aroundSeats
}
