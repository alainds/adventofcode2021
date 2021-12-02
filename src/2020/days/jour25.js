import { input } from "data/input25"

function result1() {
  const [card, door] = [...getData()]
  const cardLoopSize = getLoopSize(card)
  const doorLoopSize = getLoopSize(door)

  return transformSubject(card, doorLoopSize)
}

function result2() {
  return
}

export default function getResultats() {
  return [result1(), result2()]
}
function getLoopSize(number) {
  let size = 0
  let result = 1
  let subjectNumber = 7
  const DIVIDER = 20201227
  while (result !== number) {
    result = (result * subjectNumber) % DIVIDER
    size++
  }
  return size
}

function transformSubject(number, size) {
  let result = 1
  let subjectNumber = number
  const DIVIDER = 20201227
  for (let index = 0; index < size; index++) {
    result = (result * subjectNumber) % DIVIDER
  }
  return result
}

function getData() {
  return input.split("\n").map((a) => parseInt(a))
}
