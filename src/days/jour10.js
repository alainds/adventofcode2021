import { input, inputEx } from "data/input10"
import { reducerSum } from "util/array"

const dataInit = (inp) => inp.split("\n")
const replacefermetures = (chaine, fermetures) => {
  let chainenettoye = chaine
  for (let index = 0; index < fermetures.length; index++) {
    const fermeture = fermetures[index]
    chainenettoye = chainenettoye.replaceAll(fermeture, "")
  }
  return chainenettoye
}
const replacefermeturesAll = (chaine, fermetures) => {
  let chainenettoye = chaine
  for (let index = 0; index <= chaine.length; index++) {
    chainenettoye = replacefermetures(chainenettoye, fermetures)
  }

  return chainenettoye
}

const ouvrant = ["(", "{", "<", "["]
const fermant = [")", "}", ">", "]"]

const nettoie = (data) => {
  const fermetures = ["()", "{}", "<>", "[]"]

  const badfermetures = fermant
    .map((a, i) => ouvrant.map((b) => b + a))
    .flat()
    .filter((a) => !fermetures.includes(a))
  const nettoyes = data.map((chaine) =>
    replacefermeturesAll(chaine, fermetures)
  )
  const wrongs = nettoyes.map((a) =>
    badfermetures.map((b) => (a.includes(b) ? b.substring(1) : "")).join("")
  )

  return { nettoyes, wrongs }
}
function result1() {
  const data = dataInit(input)
  const { wrongs } = nettoie(data)

  const scoreFermeture = { ")": 3, "]": 57, "}": 1197, ">": 25137 }
  const scores = wrongs.filter((a) => a !== "").map((a) => scoreFermeture[a])
  const result = scores.reduce(reducerSum)
  return result
}
function result2() {
  const data = dataInit(input)
  const { nettoyes, wrongs } = nettoie(data)

  const incompletes = nettoyes.filter((a, i) => wrongs[i].length === 0)
  const calculmanque = (chaine) =>
    chaine.split("").map((a) => fermant[ouvrant.indexOf(a)])
  const completions = incompletes.map((a) => calculmanque(a))
  const scoreFermeture = { ")": 1, "]": 2, "}": 3, ">": 4 }
  const completionsScores = completions.map((a) =>
    a.map((b) => scoreFermeture[b]).reverse()
  )

  const result = completionsScores
    .map((a) =>
      a.reduce((accumulator, currentValue) => accumulator * 5 + currentValue)
    )
    .sort((a, b) => (a > b ? 1 : -1))

  return result[(result.length - 1) / 2]
}
export default function getResultats() {
  return [result1(), result2()]
}
