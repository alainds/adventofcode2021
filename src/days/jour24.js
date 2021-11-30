import { input } from "data/input24"

//tres long ! Surtout qu'il y a 2 rendus... A corriger mais bon...
function result1() {
  // const hex = getData()
  // const blackTiles = getBlackTiles(hex)
  // return blackTiles.length
}

function result2() {
  const hex = getData()
  let blackTiles = getBlackTiles(hex).map(addId)
  for (let index = 0; index < 100; index++) {
    blackTiles = getBlackTilesAfterOneDay(blackTiles)
  }
  return blackTiles.length
}

function getBlackTilesAfterOneDay(blackTiles) {
  const whiteTiles = []
  for (let index = 0; index < blackTiles.length; index++) {
    const tile = blackTiles[index]
    const adjacentTiles = getAdjacentTiles(tile)
    const adjacentBlackTiles = adjacentTiles.filter((a) =>
      blackTiles.map(getId).includes(a.id)
    )
    const adjacentWhiteTiles = adjacentTiles.filter(
      (a) => !adjacentBlackTiles.map(getId).includes(a.id)
    )
    adjacentWhiteTiles.map((t) => {
      const indexWhite = whiteTiles.map(getId).indexOf(t.id)
      if (indexWhite >= 0) {
        whiteTiles[indexWhite] = {
          ...whiteTiles[indexWhite],
          compt: whiteTiles[indexWhite].compt + 1,
        }
      } else {
        whiteTiles.push({
          ...t,
          compt: 1,
        })
      }
    })
    blackTiles[index] = {
      ...blackTiles[index],
      compt: adjacentBlackTiles.length,
    }
  }
  return whiteTiles
    .filter((a) => a.compt === 2)
    .concat(blackTiles.filter((a) => a.compt === 1 || a.compt === 2))
}

function getId(a) {
  return a.id
}
function addId(t) {
  return { id: "x" + t.x + "y" + t.y, ...t }
}

function getAdjacentTiles(tile) {
  const { x, y } = tile
  return [
    { x: x + 1, y: y + 1 },
    { x, y: y + 2 },
    { x: x - 1, y: y + 1 },
    { x: x - 1, y: y - 1 },
    { x, y: y - 2 },
    { x: x + 1, y: y - 1 },
  ].map(addId)
}

function getBlackTiles(hex) {
  return countTiles(hex)
    .filter((a) => a.compt % 2 === 1)
    .map((a) => {
      return { ...a.coor }
    })
}

function countTiles(hex) {
  const compt = []
  hex.map((a, i) => {
    if (i > 0 && coorEquals(a, hex[i - 1])) {
      const lastCompt = compt.pop()
      compt.push({ coor: a, compt: lastCompt.compt + 1 })
    } else {
      compt.push({ coor: a, compt: 1 })
    }
  })
  return compt
}
export default function getResultats() {
  return [result1(), result2()]
}
function coorEquals(a, b) {
  return a.x === b.x && a.y === b.y
}
function getData() {
  // const VALUES = ["ne", "nw", "se", "sw"]
  return input
    .split("\n")
    .map((row) => {
      let result = []
      while (row !== "") {
        const value2 = row.substr(0, 2)
        const value1 = row.substr(0, 1)
        if (value1 === "n" || value1 === "s") {
          result.push(value2)
          row = row.substring(2)
        } else {
          result.push(value1)
          row = row.substring(1)
        }
      }
      return result
    })
    .map((a) => getCoordonnees(a))
    .sort((a, b) => (a.y > b.y ? 1 : -1))
    .sort((a, b) => (a.x > b.x ? 1 : -1))
}

function getCoordonnees(tileInLine) {
  let coor = { x: 0, y: 0 }
  for (let index = 0; index < tileInLine.length; index++) {
    const element = tileInLine[index]
    switch (element) {
      case "e":
        coor.x = coor.x + 1
        coor.y = coor.y + 1
        break
      case "ne":
        coor.y = coor.y + 2
        break
      case "nw":
        coor.x = coor.x - 1
        coor.y = coor.y + 1
        break
      case "w":
        coor.x = coor.x - 1
        coor.y = coor.y - 1
        break
      case "sw":
        coor.y = coor.y - 2
        break
      case "se":
        coor.x = coor.x + 1
        coor.y = coor.y - 1
        break

      default:
        break
    }
  }
  return coor
}
