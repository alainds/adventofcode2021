import { input } from "../data/input1"
// const input = ''
const data = input.split("\n").map((i) => parseInt(i))
const dataComplement2020 = data.map((i) => 2020 - i)

function result1() {
  const dataFin = data.filter((i) => dataComplement2020.includes(i))
  const result = dataFin[0] * (2020 - dataFin[0])
  return result
}
function result2() {
  let resultatFinal = []
  dataComplement2020.forEach((n, pos) => {
    const dataComplementN = data.map((i) => n - i)
    const dataFin = data.filter((i) => dataComplementN.includes(i))
    if (dataFin[0]) {
      resultatFinal = dataFin
    }
  })
  return (
    resultatFinal[0] *
    resultatFinal[1] *
    (2020 - resultatFinal[0] - resultatFinal[1])
  )
}

export default function getResultats() {
  return [result1(), result2()]
}
