import { reducerMultiply } from "util/array"
import { input } from "../data/input2"

const dataBrut = input.split("\n")
const coordonneesData = (arr) => {
  let coordonnees = [0, 0]
  arr.map((a) => {
    const coordonneeString = a.split(" ")
    const instruction = coordonneeString[0]
    const increase = parseInt(coordonneeString[1])
    switch (instruction) {
      case "forward":
        coordonnees[0] += increase
        break

      case "down":
        coordonnees[1] += increase
        break
      case "up":
        coordonnees[1] += -1 * increase
        break
      default:
        break
    }
    return a
  })
  return coordonnees
}

const coordonneesDataWithAim = (arr) => {
  console.log(arr)
  let coordonnees = [0, 0, 0]
  arr.map((a) => {
    const coordonneeString = a.split(" ")
    const instruction = coordonneeString[0]
    const increase = parseInt(coordonneeString[1])
    switch (instruction) {
      case "forward":
        coordonnees[0] += increase
        coordonnees[1] += coordonnees[2] * increase
        break
      case "down":
        coordonnees[2] += increase
        break
      case "up":
        coordonnees[2] += -1 * increase
        break
      default:
        break
    }
    return a
  })
  return coordonnees
}

function result1() {
  const result = coordonneesData(dataBrut)
  return result.reduce(reducerMultiply)
}
function result2() {
  const result = coordonneesDataWithAim(dataBrut)
  return result.reduce(reducerMultiply)
}
export default function getResultats() {
  return [result1(), result2()]
}
