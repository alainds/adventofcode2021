import { input } from "data/input15"

function result1() {
  return findNumberEnd()
}

function result2() {
  //assez long sur le browser...
  return findNumberEndOptimise(30000000)
}
function findNumberEnd(END = 2020) {
  let numbers = input.split(",").map((a) => parseInt(a))
  let n = numbers.length
  while (n < END) {
    const numberAvant = numbers[n - 1]
    const numbersSansAvant = numbers.filter((a, i) => i !== n - 1)
    const isOnce = !numbersSansAvant.includes(numberAvant)
    if (isOnce) {
      numbers.push(0)
    } else {
      numbers.push(n - numbersSansAvant.lastIndexOf(numberAvant) - 1)
    }
    n++
  }

  return numbers[END - 1]
}

function findNumberEndOptimise(END = 2020) {
  let numbers = input.split(",").map((a) => parseInt(a))
  let n = numbers.length + 1
  const lastPositions = {}
  numbers.map((a, i) => (lastPositions[a] = [i + 1]))

  let numberAvant = numbers[numbers.length - 1]
  while (n - 1 < END) {
    const isNew =
      !lastPositions[numberAvant] || lastPositions[numberAvant].length < 2

    if (isNew) {
      lastPositions[0].push(n)
      if (lastPositions[0].length > 2) {
        lastPositions[0].splice(0, 1)
      }
      numberAvant = 0
    } else {
      let lastPosition = lastPositions[numberAvant][0]
      numberAvant = n - 1 - lastPosition
      if (lastPositions[numberAvant]) {
        lastPositions[numberAvant].push(n)
      } else {
        lastPositions[numberAvant] = [n]
      }
      if (lastPositions[numberAvant].length > 2) {
        lastPositions[numberAvant].splice(0, 1)
      }
    }
    n++
  }

  return numberAvant
}
export default function getResultats() {
  return [result1(), result2()]
}
