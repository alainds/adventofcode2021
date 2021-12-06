import { input, inputEx } from "data/input6"
import {} from "util/array"

const dataBrut = inputEx.split(",").map((a) => parseInt(a))
const algobete = (fishes, days) => {
  let newFishes = [...fishes]
  for (let index = 1; index <= days; index++) {
    const futurhuits = newFishes.filter((i) => i === 0)
    const huits = new Array(futurhuits.length).fill(8, 0)

    newFishes = newFishes.map((a) => (a - 1 >= 0 ? a - 1 : 6)).concat(huits)
  }
  console.log(newFishes)
  return newFishes
}
function result1() {
  const result = algobete(dataBrut, 80).length
  return result
}
function result2() {
  const result = 0
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
