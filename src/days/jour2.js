import { input } from "../data/input2"

const dataBrut = input.split("\n")
const coordonneesData = (arr) => {
  console.log(arr)
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
  console.log(coordonnees)
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
  console.log(coordonnees)
  return coordonnees
}

function result1() {
  const result = coordonneesData(dataBrut)
  return result[0] * result[1]
}
function result2() {
  const result = coordonneesDataWithAim(dataBrut)
  return result[0] * result[1]
}
export default function getResultats() {
  return [result1(), result2()]
}
