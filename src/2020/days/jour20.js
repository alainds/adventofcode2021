import { input } from "data/input20"
import { arraysEqual, reducerMultiply } from "util/array"
//ECHEC / plus le temps
function result1() {
  const data = getData()
  const dataWithCoins = data.map((morceau, i) => {
    let isCoin = true
    for (let index = 0; index < data.length; index++) {
      const morceauA = data[index]
      const isNO =
        !arraysEqual(morceau.n, morceauA.n) &&
        !arraysEqual(morceau.n, morceauA.s) &&
        !arraysEqual(morceau.n, morceauA.e) &&
        !arraysEqual(morceau.n, morceauA.o) &&
        !arraysEqual(morceau.s, morceauA.n) &&
        !arraysEqual(morceau.s, morceauA.s) &&
        !arraysEqual(morceau.s, morceauA.e) &&
        !arraysEqual(morceau.s, morceauA.o) &&
        !arraysEqual(morceau.o, morceauA.n) &&
        !arraysEqual(morceau.o, morceauA.s) &&
        !arraysEqual(morceau.o, morceauA.e) &&
        !arraysEqual(morceau.o, morceauA.o) &&
        !arraysEqual(morceau.e, morceauA.n) &&
        !arraysEqual(morceau.e, morceauA.s) &&
        !arraysEqual(morceau.e, morceauA.e) &&
        !arraysEqual(morceau.e, morceauA.o) &&
        isCoin
      console.log(morceau.id)
      console.log(morceauA.id)
      console.log({ isCoin })
    }

    return { ...morceau, isCoin }
  })
  const coins = dataWithCoins.filter((a) => a.isCoin)
  return coins.map((a) => a.id).reduce(reducerMultiply)
}

function result2() {
  return
}

export default function getResultats() {
  return [result1(), result2()]
}

function getData() {
  return input.split("\n\n").map((a) => {
    const b = a.split("\n")
    const regex = /Tile (\d+):/
    const id = regex.exec(b[0])[1]
    const values = b.filter((e, i) => i > 0).map((e) => e.split(""))
    const n = values[0]
    const e = values.map((e, i) => e[values.length - 1]).flat()
    const s = values[values.length - 1]
    const o = values.map((e, i) => e[0]).flat()
    return { id, n, e, s, o }
  })
}
