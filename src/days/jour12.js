import { input, inputEx1, inputEx2 } from "data/input12"
import { upperCase } from "lodash"
import {} from "util/array"
const END = "end"
const START = "start"
const dataInit = (inp) =>
  inp.split("\n").map((a) => {
    const duo = a.split("-")
    return duo[0] === END || duo[1] === START ? duo.reverse() : duo
  })

const buildInfos = (data) =>
  data
    .map((a) => {
      const info1 = {
        origine: a[0],
        destination: a[1],
      }
      const info2 = {
        origine: a[1],
        destination: a[0],
      }
      return a[1] === END || a[0] === START ? info1 : [info1, info2]
    })
    .flat()

const initPaths = (infosWithStart) => {
  const infosStart = infosWithStart.filter((a) => a.origine === START)
  const infos = infosWithStart.filter((a) => a.origine !== START)
  return infosStart.map((a) => {
    return {
      detail: [a.destination, a.origine],
      infos,
      toBeContinued: true,
      lowers: [],
    }
  })
}

const avanceDUnPath = (paths) => {
  return paths.map((path) => {
    const origine = path.detail[0]
    const destinations = path.infos
      .filter((a) => {
        const isPassage =
          path.lowers.filter((b) => b === a.destination).length === 1
        return a.origine === origine && !isPassage
      })
      .map((a) => a.destination)
    if (destinations.length === 0) {
      return { ...path, toBeContinued: false }
    } else {
      return destinations.map((destination) => {
        return {
          infos: [...path.infos],
          toBeContinued: destination !== END,
          detail: [destination, ...path.detail],
          lowers:
            origine !== origine.toUpperCase()
              ? [origine, ...path.lowers]
              : [...path.lowers],
        }
      })
    }
  })
}

const avanceDUnPathNew = (paths, nbPassagesIn) => {
  return paths.map((path) => {
    const origine = path.detail[0]

    const hasDoublon =
      path.lowers.filter((x, i, a) => a.indexOf(x) === i).length !==
      path.lowers.length
    const doublon =
      hasDoublon && path.lowers.filter((x, i, a) => a.indexOf(x) !== i)[0]

    const nbPassages = hasDoublon ? 1 : 2
    const destinations = path.infos
      .filter((a) => {
        const nbMax = doublon === a.destination ? 2 : nbPassages
        const isPassage =
          path.lowers.filter((b) => b === a.destination).length === nbMax
        if (
          a.destination === "kj" &&
          path.lowers.filter((b) => b === "kj").length === 1 &&
          path.lowers.filter((b) => b === "dc").length === 2
        )
          debugger
        return a.origine === origine && !isPassage
      })
      .map((a) => a.destination)
    if (destinations.length === 0) {
      return { ...path, toBeContinued: false }
    } else {
      return destinations.map((destination) => {
        return {
          infos: [...path.infos],
          toBeContinued: destination !== END,
          detail: [destination, ...path.detail],
          lowers:
            origine !== origine.toUpperCase()
              ? [origine, ...path.lowers]
              : [...path.lowers],
        }
      })
    }
  })
}

const calculPaths = (inp, nbPassages) => {
  const infosWithStart = buildInfos(dataInit(inp))
  let paths = initPaths(infosWithStart)
  while (paths.filter((path) => path.toBeContinued).length > 0) {
    paths = nbPassages
      ? avanceDUnPathNew(paths, nbPassages).flat()
      : avanceDUnPath(paths).flat()
  }
  const pathsValides = paths.filter((path) => path.detail[0] === END)

  console.log("paths", paths)
  console.log(
    "pathsValides",
    pathsValides.map((a) => a.detail)
  )
  return pathsValides.length
}

function result1() {
  return calculPaths(input)
}
function result2() {
  // return calculPaths(inputEx2, 2)
}
export default function getResultats() {
  return [result1(), result2()]
}
