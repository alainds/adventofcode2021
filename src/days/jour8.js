import { input, inputEx } from "data/input8"
import { reducerSum } from "util/array"

const dataInit = (inp) =>
  inp.split("\n").map((a) => a.split(" | ").map((a) => a.trim().split(" ")))
function result1() {
  const data = dataInit(input)
  const tenDigits = data.map((a) => a[0])
  const fourDigits = data.map((a) => a[1])
  const easyDigits = fourDigits.map((a) =>
    a.filter(
      (d) =>
        d.length === 2 || d.length === 3 || d.length === 4 || d.length === 7
    )
  )
  const result = easyDigits.map((a) => a.length).reduce(reducerSum)
  return result
}
function result2() {
  const result = 0
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
