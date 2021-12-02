import { input } from "../data/input2"
import { transformData, reducerSum } from "util/array"

const dataBrut = input.split("\n")

const data = transformData(dataBrut)

function result1() {
  const dataOk = data.map((i) => {
    return i.pass &&
      i.pass.split(i.lettre).length - 1 >= i.min &&
      i.pass.split(i.lettre).length - 1 <= i.max
      ? 1
      : 0
  })
  return dataOk.reduce(reducerSum)
}
function result2() {
  const dataOk = data.map((i) => {
    const passArray = i.pass.split("")
    const lettreInPos1 = passArray[i.min - 1] === i.lettre
    const lettreInPos2 = passArray[i.max - 1] === i.lettre
    return (lettreInPos1 && !lettreInPos2) || (!lettreInPos1 && lettreInPos2)
      ? 1
      : 0
  })
  const result = dataOk.reduce(reducerSum)
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
