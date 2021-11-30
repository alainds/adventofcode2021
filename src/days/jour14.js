import { input } from "data/input14"
import { reducerSum } from "util/array"
import { dec2bin, pad } from "util/math"
function result1() {
  const dataBrut = input.split("mask = ")
  dataBrut.splice(0, 1)
  const regex = new RegExp("^mem\\[([0-9]*)\\] = ([0-9]*)$")
  const data = dataBrut.map((a) => {
    const v = a.split("\n").filter((a) => a !== "")
    return v.map((b, i) => {
      const r =
        i !== 0
          ? {
              adress: parseInt(regex.exec(b)[1]),
              value: parseInt(
                applyMaskValue(pad(dec2bin(regex.exec(b)[2]), 36), v[0]),
                2
              ),
            }
          : b
      return r
    })
  })
  const adresses = data
    .map((a) => {
      const aRetourner = a.filter((v, i) => i > 0)
      return aRetourner
    })
    .flat(1)
    .sort((a, b) => (a.adress >= b.adress ? 1 : -1))

  const adressesFiltered = adresses.filter(
    (v, i) => i === adresses.length - 1 || v.adress !== adresses[i + 1].adress
  )
  return adressesFiltered.map((a) => a.value).reduce(reducerSum)
}
function result2() {
  //duplication flemme...
  const dataBrut = input.split("mask = ")
  dataBrut.splice(0, 1)
  const regex = new RegExp("^mem\\[([0-9]*)\\] = ([0-9]*)$")
  const data = dataBrut.map((a) => {
    const v = a.split("\n").filter((a) => a !== "")
    return v.map((b, i) => {
      const r =
        i !== 0
          ? {
              adress: floatingToArray(
                applyMaskAdress(
                  pad(dec2bin(parseInt(regex.exec(b)[1])), 36),
                  v[0]
                )
              ).map((a) => parseInt(a, 2)),
              value: parseInt(regex.exec(b)[2]),
            }
          : b
      return r
    })
  })
  const adresses = data
    .map((a) => {
      const aRetourner = a.filter((v, i) => i > 0)
      return aRetourner
    })
    .flat(1)
    .map((a) => {
      const value = a.value
      return a.adress.map((adress) => {
        return {
          adress,
          value,
        }
      })
    })
    .flat()
    .sort((a, b) => (a.adress >= b.adress ? 1 : -1))

  const adressesFiltered = adresses.filter(
    (v, i) => i === adresses.length - 1 || v.adress !== adresses[i + 1].adress
  )
  return adressesFiltered.map((a) => a.value).reduce(reducerSum)
}
function applyMaskValue(value, mask) {
  const maskArray = mask.split("")
  return value
    .split("")
    .map((a, i) => (maskArray[i] === "X" ? a : maskArray[i]))
    .join("")
}
function applyMaskAdress(value, mask) {
  const maskArray = mask.split("")
  return value
    .split("")
    .map((a, i) => (maskArray[i] === "0" ? a : maskArray[i]))
    .join("")
}

function floatingToArray(value) {
  const arrayX = value
    .split("")
    .map((a, i) => {
      return a === "X" ? i : -1
    })
    .filter((a, i) => a >= 0)
  if (!arrayX.length) {
    return value
  } else {
    const iX = arrayX[0]
    let a = value.split("")
    let b = value.split("")
    a[iX] = "0"
    b[iX] = "1"
    return [floatingToArray(a.join("")), floatingToArray(b.join(""))].flat()
  }
}
export default function getResultats() {
  return [result1(), result2()]
}
