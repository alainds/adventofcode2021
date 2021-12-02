import { input } from "data/input9"

const nombresAll = input.split("\n").map((a) => parseInt(a))

const N = 25
const xmas = getNombreEtSommes(nombresAll, N)

function result1() {
  console.log(xmas.nombres)
  console.log(xmas.sommes)
  return getSommeKO(xmas).sommeKO
}

function result2() {
  const sommeKO = getSommeKO(xmas).sommeKO
  const suiteQuiFaitLaSomme = findSuite(nombresAll, sommeKO)
  return Math.min(...suiteQuiFaitLaSomme) + Math.max(...suiteQuiFaitLaSomme)
}

export default function getResultats() {
  return [result1(), result2()]
}

function isSommeOK(nombres, somme) {
  const nombresPlusPetit = nombres.filter((n) => n <= somme)
  nombresPlusPetit.map((a, i) => a)
  const complementSomme = nombresPlusPetit.map((i) => somme - i)
  const isComplementASomme = nombresPlusPetit.filter((i) =>
    complementSomme.includes(i)
  )
  return isComplementASomme.length > 0
}

function getNombreEtSommes(nombres, N = 25) {
  let nombresParN = []
  for (let i = N; i < nombres.length; i++) {
    nombresParN.push([...nombres].splice(i - N, N))
  }
  let sommes = [...nombres].splice(N, [...nombres].length - N)

  return {
    nombres: nombresParN,
    sommes,
  }
}

function getSommeKO(xmas) {
  let sommeKO
  let indexKO
  xmas.sommes.some((somme, i) => {
    indexKO = i
    const nombresAsommer = xmas.nombres[i]
    sommeKO = !isSommeOK(nombresAsommer, somme) && somme
    return sommeKO
  })
  return { sommeKO, indexKO }
}

function findSuite(nombres, somme) {
  let suiteATrouver
  nombres.some((n, i) => {
    let sommeSuite = n
    let suite = [n]
    let iSuite = i
    while (sommeSuite < somme) {
      iSuite++
      suite.push(nombres[iSuite])
      sommeSuite = sommeSuite + nombres[iSuite]
    }
    suiteATrouver = suite
    return sommeSuite === somme
  })

  return suiteATrouver
}
