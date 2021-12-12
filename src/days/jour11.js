import { input, inputEx, inputEx1 } from "data/input11"
import { reducerSum } from "util/array"

const dataInit = (inp) =>
  inp.split("\n").map((a) => a.split("").map((b) => parseInt(b)))

const doSteps = (dataIn, steps) => {
  let newData = [...dataIn]
  let flashesTotal = 0
  for (let index = 1; index <= steps; index++) {
    const { data, flashes } = doStep(newData)
    newData = data
    flashesTotal += flashes
  }
  return flashesTotal
}

const doStepsWhile = (dataIn) => {
  let newData = [...dataIn]
  const total = dataIn[0].length * dataIn.length
  let flashesTotal = 0
  let step = 0
  while (flashesTotal !== total) {
    const { data, flashes } = doStep(newData)
    newData = data
    flashesTotal = flashes
    step++
  }
  return step
}

const add1 = (dataIn, selection) => {
  const data = [...dataIn]
  selection && selection.map((a) => data[a[0]][a[1]]++)
  return selection ? data : data.map((a) => a.map((b) => b + 1))
}
const add1Limit10 = (dataIn, selection) => {
  const data = [...dataIn]
  selection && selection.map((a) => data[a[0]][a[1]] < 10 && data[a[0]][a[1]]++)
  return selection ? data : data.map((a) => a.map((b) => (b < 10 ? b + 1 : b)))
}
const trouve10 = (data, exclude) =>
  data
    .map((b, i) => b.map((a, j) => (a === 10 ? [i, j] : null)))
    .flat()
    .filter((a) => a !== null)

const trouveVoisins = (coordonnees, iMax, jMax) => {
  let voisins = []
  for (let index = 0; index < coordonnees.length; index++) {
    const a = coordonnees[index]
    const i = a[0]
    const j = a[1]
    i !== 0 && voisins.push([i - 1, j])
    i !== iMax && voisins.push([i + 1, j])
    j !== 0 && voisins.push([i, j - 1])
    j !== jMax && voisins.push([i, j + 1])
    i !== 0 && j !== 0 && voisins.push([i - 1, j - 1])
    i !== 0 && j !== jMax && voisins.push([i - 1, j + 1])
    i !== iMax && j !== 0 && voisins.push([i + 1, j - 1])
    i !== iMax && j !== jMax && voisins.push([i + 1, j + 1])
  }
  return voisins
}
const toZero = (data) => data.map((a) => a.map((b) => (b > 9 ? 0 : b)))
const countFlashes = (data) =>
  data
    .map((a) => a.map((b) => (b > 9 ? 1 : 0)).reduce(reducerSum))
    .reduce(reducerSum)
const doStep = (dataIn) => {
  let data = [...dataIn]
  const iMax = data.length - 1
  const jMax = data[0].length - 1
  let flashes = 0
  data = add1(data)
  let coordonnees10 = trouve10(data)
  while (coordonnees10.length) {
    const voisins = trouveVoisins(coordonnees10, iMax, jMax)
    data = add1Limit10(data, voisins)
    data = add1(data, coordonnees10)
    coordonnees10 = trouve10(data, coordonnees10)
  }
  flashes += countFlashes(data)
  data = toZero(data)
  return { data, flashes }
}
function result1() {
  const result = doSteps(dataInit(input), 100)
  return result
}
function result2() {
  const result = doStepsWhile(dataInit(input))
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
