import { input, inputEx } from "data/input14"
import { countOccurencesAll } from "util/array"

const dataInit = (inp) => {
  const data1 = inp.split("\n\n")
  let formules = {}
  data1[1].split("\n").map((a, i) => {
    const arr = a.split(" -> ")
    formules[arr[0]] = arr[1]
  })
  return {
    start: data1[0].split(""),
    formules,
  }
}
const doStep = (start, formules) => {
  const last = start.length - 1
  return start
    .filter((a, i) => i !== last)
    .map((a, i) => {
      const elem = a + start[i + 1]
      return formules[elem] ? [a, formules[elem]] : [a]
    })
    .flat()
    .concat(start[last])
}

const doSteps = (data, steps) => {
  let { start, formules } = data
  for (let index = 1; index <= steps; index++) {
    start = doStep(start, formules)
  }
  return start
}

function result1() {
  const data = dataInit(input)
  const end = doSteps(data, 10)
  const occurences = countOccurencesAll(end)
  const result =
    Math.max(...Object.values(occurences)) -
    Math.min(...Object.values(occurences))
  return result
}
function result2() {
  const data = dataInit(inputEx)

  for (let index = 1; index < 20; index++) {
    // console.log(countOccurencesAll(doSteps(data, index)))
  }
  const result = null
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
