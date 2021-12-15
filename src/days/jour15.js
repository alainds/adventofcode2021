import { input, inputEx } from "data/input15"
import { reducerSum } from "util/array"
import { findShortestPath } from "util/math"

const dataInit = (inp) =>
  inp.split("\n").map((a) => a.split("").map((b) => parseInt(b)))

const getGraph = (data) => {
  let graph = {}
  for (let i = 0; i < data.length; i++) {
    const ligne = data[i]
    for (let j = 0; j < ligne.length; j++) {
      const sousGraph = {}
      if (i > 0) sousGraph["i" + (i - 1) + "j" + j] = data[i - 1][j]
      if (i < data.length - 1)
        sousGraph["i" + (i + 1) + "j" + j] = data[i + 1][j]
      if (j > 0) sousGraph["i" + i + "j" + (j - 1)] = data[i][j - 1]
      if (j < ligne.length - 1)
        sousGraph["i" + i + "j" + (j + 1)] = data[i][j + 1]
      graph["i" + i + "j" + j] = sousGraph
    }
  }
  return graph
}

const getGraphValue = (data) => {
  let graph = {}
  for (let i = 0; i < data.length; i++) {
    const ligne = data[i]
    for (let j = 0; j < ligne.length; j++) {
      graph["i" + i + "j" + j] = data[i][j]
    }
  }
  return graph
}

function result1() {
  const data = dataInit(inputEx)
  const graphValue = getGraphValue(data)
  const graph = getGraph(data)
  const shortest = findShortestPath(
    graph,
    "i0j0",
    "i" + (data.length - 1) + "j" + (data[0].length - 1)
  )
  // console.log(graph)
  // console.log(shortest)
  const result = shortest.path
    .map((a) => graphValue[a])
    .filter((a, i) => i > 0)
    .reduce(reducerSum)

  // console.log(result)
  return result
}

function result2() {
  const result = 0
  return result
}

export default function getResultats() {
  return [result1(), result2()]
}
