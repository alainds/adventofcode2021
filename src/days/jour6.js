import { input } from "data/input6"
import { reducerSum } from "util/array"
import { uniq } from "lodash"

const dataBrut = input.split("\n\n")
const reponsesBrut = dataBrut.map((a) => a.replace(/(\n)/g, ""))
const reponsesSansDoublon = reponsesBrut.map((a) => {
  return uniq(a.split(""))
})

function result1() {
  const nombreYes = reponsesSansDoublon.map((a) => a.length)
  return nombreYes.reduce(reducerSum)
}

function result2() {
  const reponses = dataBrut.map((a) => a.split("\n"))
  const nombreYesForAll = reponses.map((reponsesGroupe, index) =>
    reponsesSansDoublon[index]
      .map((reponsePossible) =>
        reponsesGroupe.every((reponse) => reponse.includes(reponsePossible))
      )
      .reduce(reducerSum)
  )

  return nombreYesForAll.reduce(reducerSum)
}

export default function getResultats() {
  return [result1(), result2()]
}
