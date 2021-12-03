import { input, inputEx } from "data/input3"
import { getNbOccurrence } from "util/array"

const dataBrut = input.split("\n").map((a) => a.split(""))

const transposeArraysOfArrays = (d) => {
  let data = []
  d.map((a, i) =>
    a.map((b, j) => {
      data[j] ? data[j].push(b) : (data[j] = [b])
      return b
    })
  )
  return data
}
const getNbOccurrence0 = (a) => getNbOccurrence(a, "0")
const getNbOccurrence1 = (a) => getNbOccurrence(a, "1")
const getMaxOccurrence = (a) =>
  getNbOccurrence1(a) >= getNbOccurrence0(a) ? "1" : "0"
const getMinOccurrence = (a) =>
  getNbOccurrence1(a) < getNbOccurrence0(a) ? "1" : "0"

const calcul = (arr, fonctionRecherche = getMaxOccurrence) => {
  let resultat = [...arr]
  let position = 0
  while (resultat.length > 1) {
    const arrTranspose = transposeArraysOfArrays(resultat)
    const recherche = fonctionRecherche(arrTranspose[position])
    // eslint-disable-next-line no-loop-func
    resultat = resultat.filter((a) => a[position] === recherche)
    position++
  }
  return resultat[0].join("")
}
function result1() {
  let data = transposeArraysOfArrays(dataBrut)
  const gamma = data.map((a) => getMaxOccurrence(a)).join("")
  const epsilon = data.map((a) => getMinOccurrence(a)).join("")
  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}
function result2() {
  let oxygen = calcul(dataBrut)
  let co2 = calcul(dataBrut, getMinOccurrence)
  return parseInt(oxygen, 2) * parseInt(co2, 2)
}
export default function getResultats() {
  return [result1(), result2()]
}
