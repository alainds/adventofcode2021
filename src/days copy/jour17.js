import { input } from "data/input17"
import { reducerSum } from "util/array"

function result1() {
  const cubesInit = input
    .split("\n")
    .map((a) => a.split("").map((c) => (c === "#" ? 1 : 0)))
  const NB_CYCLES = 6
  let cubes = constructCubes(cubesInit, NB_CYCLES)
  for (let i = 0; i < NB_CYCLES; i++) {
    cubes = transformCubes(cubes)
  }
  return cubes.flat(2).reduce(reducerSum)
}

function result2() {
  const cubesInit = input
    .split("\n")
    .map((a) => a.split("").map((c) => (c === "#" ? 1 : 0)))
  //flemme de parametriser la dimension : copie sale de code
  const NB_CYCLES = 6
  let hypercubes = constructHyperCubes(cubesInit, NB_CYCLES)
  for (let i = 0; i < NB_CYCLES; i++) {
    hypercubes = transformHypercubes(hypercubes)
  }
  return hypercubes.flat(3).reduce(reducerSum)
}

export default function getResultats() {
  return [result1(), result2()]
}

function countActiveNeighbours(cubes, coor) {
  let count = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (
          !(i === 1 && j === 1 && k === 1) &&
          cubes[-1 + i + coor.i] &&
          cubes[-1 + i + coor.i][-1 + j + coor.j] &&
          cubes[-1 + i + coor.i][-1 + j + coor.j][-1 + k + coor.k]
        ) {
          count += cubes[-1 + i + coor.i][-1 + j + coor.j][-1 + k + coor.k]
          // if (Number.isNaN(count)) debugger
        }
      }
    }
  }
  return count
}

function countActiveNeighboursHypercube(cubes, coor) {
  let count = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          if (
            !(i === 1 && j === 1 && k === 1 && l === 1) &&
            cubes[-1 + i + coor.i] &&
            cubes[-1 + i + coor.i][-1 + j + coor.j] &&
            cubes[-1 + i + coor.i][-1 + j + coor.j][-1 + k + coor.k] &&
            cubes[-1 + i + coor.i][-1 + j + coor.j][-1 + k + coor.k][
              -1 + l + coor.l
            ]
          ) {
            count +=
              cubes[-1 + i + coor.i][-1 + j + coor.j][-1 + k + coor.k][
                -1 + l + coor.l
              ]
            if (Number.isNaN(count)) debugger
          }
        }
      }
    }
  }
  return count
}

function transformCubes(cubes) {
  let cubesWithOneCycle = []
  for (let i = 0; i < cubes.length; i++) {
    cubesWithOneCycle[i] = []
    for (let j = 0; j < cubes.length; j++) {
      cubesWithOneCycle[i][j] = []
      for (let k = 0; k < cubes.length; k++) {
        const coorCurrentCube = cubes[i][j][k]
        const nbActiveNeighbours = countActiveNeighbours(cubes, {
          i,
          j,
          k,
        })
        cubesWithOneCycle[i][j][k] =
          (coorCurrentCube === 0 && [3].includes(nbActiveNeighbours)) ||
          (coorCurrentCube === 1 && [2, 3].includes(nbActiveNeighbours))
            ? 1
            : 0
      }
    }
  }
  return cubesWithOneCycle
}

function transformHypercubes(cubes) {
  let cubesWithOneCycle = []
  for (let i = 0; i < cubes.length; i++) {
    cubesWithOneCycle[i] = []
    for (let j = 0; j < cubes.length; j++) {
      cubesWithOneCycle[i][j] = []
      for (let k = 0; k < cubes.length; k++) {
        cubesWithOneCycle[i][j][k] = []
        for (let l = 0; l < cubes.length; l++) {
          const coorCurrentCube = cubes[i][j][k][l]
          const nbActiveNeighbours = countActiveNeighboursHypercube(cubes, {
            i,
            j,
            k,
            l,
          })
          cubesWithOneCycle[i][j][k][l] =
            (coorCurrentCube === 0 && [3].includes(nbActiveNeighbours)) ||
            (coorCurrentCube === 1 && [2, 3].includes(nbActiveNeighbours))
              ? 1
              : 0
        }
      }
    }
  }
  return cubesWithOneCycle
}

function constructHyperCubes(cubesInit, nbCicles) {
  const finalDimension = cubesInit.length + nbCicles * 2
  const cubes = []
  for (let i = 0; i < finalDimension; i++) {
    cubes[i] = []
    for (let j = 0; j < finalDimension; j++) {
      cubes[i][j] = []
      for (let k = 0; k < finalDimension; k++) {
        cubes[i][j][k] = []
        for (let l = 0; l < finalDimension; l++) {
          const oldI = i - nbCicles
          const oldJ = j - nbCicles
          if (
            k === Math.trunc(finalDimension / 2) &&
            l === Math.trunc(finalDimension / 2) &&
            oldI >= 0 &&
            oldI <= cubesInit.length - 1 &&
            oldJ >= 0 &&
            oldJ <= cubesInit.length - 1
          ) {
            cubes[i][j][k][l] = cubesInit[oldI][oldJ]
          } else {
            cubes[i][j][k][l] = 0
          }
        }
      }
    }
  }
  return cubes
}

function constructCubes(cubesInit, nbCicles) {
  const finalDimension = cubesInit.length + nbCicles * 2
  const cubes = []
  for (let i = 0; i < finalDimension; i++) {
    cubes[i] = []
    for (let j = 0; j < finalDimension; j++) {
      cubes[i][j] = []
      for (let k = 0; k < finalDimension; k++) {
        const oldI = i - nbCicles
        const oldJ = j - nbCicles
        if (
          k === Math.trunc(finalDimension / 2) &&
          oldI >= 0 &&
          oldI <= cubesInit.length - 1 &&
          oldJ >= 0 &&
          oldJ <= cubesInit.length - 1
        ) {
          cubes[i][j][k] = cubesInit[oldI][oldJ]
        } else {
          cubes[i][j][k] = 0
        }
      }
    }
  }
  return cubes
}

function initArray(dimension) {
  let array = new Array(dimension)
  array[0] = new Array(dimension)
  array[0][0] = new Array(dimension)
  return array
}
