
import { input } from "../data/input1"
import { reducerSum } from "util/array"

const data = input.split("\n").map((i) => parseInt(i))
const sommeIncrease = (arr) => arr.map((courant, i) => i>=1 && arr[i-1] < courant ? 1:0).reduce(reducerSum)

function result1() {
  return sommeIncrease(data)
}
function result2() {

  const dataWindows = data.map((courant, i) => i<(data.length - 2) && courant + data[i+1] + data[i+2]).filter(Boolean)
  return (
    sommeIncrease(dataWindows)
  )
}

export default function getResultats() {
  return [result1(), result2()]
}
