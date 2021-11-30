import { input } from "data/input12"

//convention : East E>0, North N>0 (donc Weast W<0, south S<0) : coor : (0,0)

const coordonnees = input.split("\n").map((a) => {
  return { dir: a.substr(0, 1), value: parseInt(a.substr(1)) }
})
function result1() {
  let coeffDirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]
  let iCoeffDir = 0
  let coeffDir = coeffDirs[iCoeffDir]
  let coordonneeActuelle = [0, 0]

  coordonnees.map((coordonnee, index) => {
    switch (coordonnee.dir) {
      case "E":
        coordonneeActuelle[0] = coordonneeActuelle[0] + coordonnee.value
        break
      case "W":
        coordonneeActuelle[0] = coordonneeActuelle[0] - coordonnee.value
        break
      case "N":
        coordonneeActuelle[1] = coordonneeActuelle[1] + coordonnee.value
        break
      case "S":
        coordonneeActuelle[1] = coordonneeActuelle[1] - coordonnee.value
        break

      case "L":
        iCoeffDir = (iCoeffDir + coordonnee.value / 90) % 4
        coeffDir = coeffDirs[iCoeffDir]
        break
      case "R":
        iCoeffDir = (coeffDirs.length + iCoeffDir - coordonnee.value / 90) % 4
        coeffDir = coeffDirs[iCoeffDir]
        break
      case "F":
        coordonneeActuelle = coordonneeActuelle.map(
          (c, i) => c + coeffDir[i] * coordonnee.value
        )
        break

      default:
        break
    }
    return 0
  })
  return getManhattanDistance(coordonneeActuelle)
}

function result2() {
  let waypoint = [10, 1]
  let coordonneeActuelle = [0, 0]

  coordonnees.map((coordonnee, index) => {
    switch (coordonnee.dir) {
      case "E":
        waypoint[0] = waypoint[0] + coordonnee.value
        break
      case "W":
        waypoint[0] = waypoint[0] - coordonnee.value
        break
      case "N":
        waypoint[1] = waypoint[1] + coordonnee.value
        break
      case "S":
        waypoint[1] = waypoint[1] - coordonnee.value
        break
      case "L":
      case "R":
        waypoint = rotateWaypoint(waypoint, coordonnee)
        break
      case "F":
        coordonneeActuelle = coordonneeActuelle.map(
          (c, i) => c + coordonnee.value * waypoint[i]
        )
        break

      default:
        break
    }
    return 0
  })
  return getManhattanDistance(coordonneeActuelle)
}

export default function getResultats() {
  return [result1(), result2()]
}

const getManhattanDistance = (c) => Math.abs(c[0]) + Math.abs(c[1])

const rotateWaypoint = (waypoint, coordonnee) => {
  let waypointClone = [...waypoint]
  const quartVerslaGauche = coordonnee.dir === "L" ? 90 : 270
  const quartVerslaDroite = coordonnee.dir === "R" ? 90 : 270
  switch (coordonnee.value) {
    case quartVerslaGauche: //L90 R270
      waypointClone[0] = waypoint[1] * -1
      waypointClone[1] = waypoint[0]
      break
    case 180:
      waypointClone = waypointClone.map((c, i) => -1 * c)
      break
    case quartVerslaDroite: //R90 L270
      waypointClone[0] = waypoint[1]
      waypointClone[1] = waypoint[0] * -1
      break
    default:
      break
  }
  return waypointClone
}
