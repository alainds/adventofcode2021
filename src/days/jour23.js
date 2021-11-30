import { input } from "data/input23"
import { arrayRotate } from "util/array"
function result1() {
  const cups = getData()

  let cupsMoved = [...cups]
  const NBMOVES = 10000000
  for (let index = 0; index < NBMOVES; index++) {
    cupsMoved = doOneMove(cupsMoved, index % cups.length)
  }

  while (cupsMoved[0] !== 1) {
    cupsMoved = arrayRotate(cupsMoved, true)
  }
  return cupsMoved.join("")
}

function result2() {
  return
}

export default function getResultats() {
  return [result1(), result2()]
}

function getData() {
  return input.split("").map((a) => parseInt(a))
}

function doOneMove(cups, currentPosition) {
  const cupsLength = cups.length
  const minCup = Math.min(...cups)
  const maxCup = Math.max(...cups)
  const currentCup = cups[currentPosition]
  let destination = currentCup - 1 < minCup ? maxCup : currentCup - 1
  let pickup = [
    cups[(currentPosition + 1) % cupsLength],
    cups[(currentPosition + 2) % cupsLength],
    cups[(currentPosition + 3) % cupsLength],
  ]
  while (pickup.includes(destination)) {
    destination = destination - 1 < minCup ? maxCup : destination - 1
  }
  let cupsResult = [...cups]
  // cupsFiltered.splice(cupsFiltered.indexOf(destination) + 1, 3)
  // debugger
  const destinationPosition = cups.indexOf(destination)
  let cupsFiltered = cups.filter((n) => !pickup.includes(n))
  if (destinationPosition > cups.indexOf(pickup[0])) {
    cupsFiltered.splice(cupsFiltered.indexOf(destination) + 1, 0, pickup)
    cupsResult = cupsFiltered
  } else {
    cupsResult.map((a) => (pickup.includes(a) ? 0 : a))
    cupsResult[destinationPosition] = pickup[2]

    cupsResult[(cupsLength + destinationPosition - 1) % cupsLength] = pickup[1]
    cupsResult[(cupsLength + destinationPosition - 2) % cupsLength] = pickup[0]
    cupsResult[
      (cupsLength + destinationPosition - 3) % cupsLength
    ] = destination

    while (cupsFiltered[0] !== destination) {
      cupsFiltered = arrayRotate(cupsFiltered, true)
    }
    cupsFiltered.splice(cupsFiltered.indexOf(destination), 1)
    for (let index = 0; index < cupsFiltered.length; index++) {
      cupsResult[
        (cupsLength + destinationPosition - 3 - cupsFiltered.length + index) %
          cupsLength
      ] = cupsFiltered[index]
    }
    // debugger
  }
  return cupsResult.flat()
}
