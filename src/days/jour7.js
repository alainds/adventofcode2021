import { input, inputEx } from "data/input7"
import { reducerSum } from "util/array"

const extractPoints = (inp) =>
  inp
    .split(",")
    .map((a) => parseInt(a))
    .sort((a, b) => (a > b ? 1 : -1))
const distance = (a, b) => Math.abs(b - a)
const distanceSupplement = (a, b) => {
  const n = Math.abs(b - a)
  return n + (n * (n - 1)) / 2
}
const sommeDistance = (arr, p, distanceFunc = distance) =>
  arr.map((a) => distanceFunc(a, p)).reduce(reducerSum)
const calculMinDistance = (inp, distanceFunc = distance) => {
  const points = extractPoints(inp)
  const distances = []
  for (let index = 0; index < points[points.length - 1]; index++) {
    distances.push(sommeDistance(points, index, distanceFunc))
  }

  // console.log("points", points)
  // console.log("distances", distances)
  return Math.min(...distances)
}

function result1() {
  const result = calculMinDistance(input)
  return result
}
function result2() {
  const result = calculMinDistance(input, distanceSupplement)
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
