import { input } from "data/input7"
//Pas fier des nommages
const sacs = input.split("\n").map((a) => {
  const b = a
    .replaceAll("bags", "")
    .replaceAll("contain", "")
    .replaceAll("bag", "")
    .replaceAll(".", "")
    .replaceAll(",", "")
    .replaceAll("no other", "0")
    .replaceAll(/\s/g, "")
    .trim()
  const regexp = new RegExp("^([a-zA-Z]*)([0-9]*.*)$")

  const reg = regexp.exec(b)
  const name = reg[1]
  const others = reg[2].match(/[^a-z]+|[a-z]+/gi)
  const othersNames =
    others[0] !== 0 ? others.filter((a, i) => i % 2 === 1) : ""
  const othersValues = others.filter((a, i) => i % 2 === 0)
  const othersObj = othersValues.map((other, index) => {
    const obj = {}
    if (other) {
      obj[othersNames[index]] = other
    }
    return other ? obj : 0
  })
  const objRes = {}
  objRes[name] = { ...othersObj }
  return { name: name, othersNames: othersNames, othersValues }
})

const ONEBAG = "shinygold"
let sacsZeros = sacs.filter((sac) => !sac.othersNames.length).map((s) => s.name)

function result1() {
  let sacsAvecZeroFinal = [...sacsZeros]
  let sacRemplis = [
    ...sacs.filter((sac) => sac.othersNames.length && sac.name !== ONEBAG),
  ]
  while (true) {
    let newSacsZeroFinal = [...sacsAvecZeroFinal]
    sacRemplis = sacRemplis.map((sac) => {
      return {
        name: sac.name,
        othersNames: sac.othersNames.filter(
          (a) => !newSacsZeroFinal.includes(a)
        ),
        othersValues: sac.othersValues.filter(
          (a, i) => !sacsZeros.includes(sac.othersNames[i])
        ),
      }
    })
    sacsAvecZeroFinal = sacsAvecZeroFinal.concat(
      sacRemplis.filter((sac) => !sac.othersNames.length).map((s) => s.name)
    )
    if (sacsAvecZeroFinal.length === newSacsZeroFinal.length) break
    sacRemplis = sacRemplis.filter(
      (sac) => sac.othersNames.length && sac.name !== ONEBAG
    )
  }
  return sacRemplis.length
}

function result2() {
  let onebag = sacs.filter(
    (sac) => sac.othersNames.length && sac.name === ONEBAG
  )[0]

  return getBag(onebag, 0)
}
const getBag = function (obj, res = 0) {
  let newobj = { ...obj }
  const sacARemplacerName = obj.othersNames[0]
  const sacARemplacerValue = obj.othersValues[0]
  const resultat = res + sacARemplacerValue * 1
  let newSacs = sacs.filter((a) => a.name === sacARemplacerName)[0]
  const isSacsZeros = sacsZeros.includes(sacARemplacerName)
  const newOthersNames = isSacsZeros ? [] : newSacs.othersNames
  const newOthersValues = isSacsZeros
    ? []
    : newSacs.othersValues.map((a, i) => a * sacARemplacerValue)
  newobj = {
    othersNames: [
      ...newOthersNames,
      ...newobj.othersNames.filter((a, i) => i > 0),
    ],
    othersValues: [
      ...newOthersValues,
      ...newobj.othersValues.filter((a, i) => i > 0),
    ],
  }
  if (!newobj.othersNames.length) return resultat

  return getBag(newobj, resultat)
}

export default function getResultats() {
  return [result1(), result2()]
}
