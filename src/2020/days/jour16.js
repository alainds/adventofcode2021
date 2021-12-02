import { input } from "data/input16"
import {
  intersectArray,
  reducerMultiply,
  reducerSum,
  getNbOccurrence,
} from "util/array"

import { uniq } from "lodash"
function result1() {
  const { infos, nearbyTickets } = getInfosTickets()

  return nearbyTickets
    .map((ticket) => getTicketErrorRate(ticket, infos))
    .reduce(reducerSum)
}

function result2() {
  const { infos, ticket, nearbyTickets } = getInfosTickets()
  const validTickets = nearbyTickets.filter(
    (ticket) => getTicketErrorRate(ticket, infos) === 0
  )
  const validTicketsWithValidInfo = validTickets.map((ticket) =>
    ticket.map((v) => getValidInfos(v, infos))
  )

  let infosPositions = { duration: 1 } //hack : duration en 1 car il est nul part sinon
  const infosNames = Object.keys(infos)
  let namesByPosition = []
  for (let index = 0; index < validTicketsWithValidInfo[0].length; index++) {
    const nameInCommon = validTicketsWithValidInfo
      .map((a, i) => a[index])
      .reduce(intersectArray, infosNames)
    namesByPosition[index] = nameInCommon
  }
  while (namesByPosition.filter((a) => a.length > 0).length > 0) {
    namesByPosition = namesByPosition.map((a, i) =>
      !Object.values(infosPositions).includes(i)
        ? a.filter((name) => !Object.keys(infosPositions).includes(name))
        : []
    )
    const allNames = namesByPosition.filter((a) => a.length > 0).flat()
    const uniqueNames = uniq(allNames)
      .map((name) => {
        return { name, count: getNbOccurrence(allNames, name) }
      })
      .filter((a) => a.count === 1)
      .map((a) => a.name)

    namesByPosition.forEach((nameInCommon, index) => {
      const intersect = intersectArray(uniqueNames, nameInCommon)
      if (intersect.length === 1) infosPositions[intersect[0]] = index
    })
  }
  const departuresPositions = []
  for (const [cle, valeur] of Object.entries(infosPositions)) {
    if (cle.includes("departure")) departuresPositions.push(valeur)
  }
  return ticket
    .filter((t, i) => departuresPositions.includes(i))
    .reduce(reducerMultiply)
}

export default function getResultats() {
  return [result1(), result2()]
}

function getInfosTickets() {
  const dataBrut = input.split("\n\n")
  const regexInfo = new RegExp("^(.*): ([0-9]*)-([0-9]*) or ([0-9]*)-([0-9]*)$")
  const infosArr = dataBrut[0].split("\n").map((infodata) => {
    const regexExec = regexInfo.exec(infodata)
    const name = regexExec[1].replace(" ", "")
    const info = [
      name,
      {
        range1: [parseInt(regexExec[2]), parseInt(regexExec[3])],
        range2: [parseInt(regexExec[4]), parseInt(regexExec[5])],
      },
    ]
    return info
  })
  const infos = Object.fromEntries(infosArr)
  const ticket = dataBrut[1]
    .split("\n")
    .filter((a, i) => i > 0)[0]
    .split(",")
    .map((a) => parseInt(a))
  const nearbyTickets = dataBrut[2]
    .split("\n")
    .filter((a, i) => i > 0)
    .map((ticket) => ticket.split(",").map((a) => parseInt(a)))
  return { infos, ticket, nearbyTickets }
}

function isValid(value, info) {
  return (
    (value >= info.range1[0] && value <= info.range1[1]) ||
    (value >= info.range2[0] && value <= info.range2[1])
  )
}

function getValidInfos(value, infos) {
  return Object.keys(infos).filter((infoName) =>
    isValid(value, infos[infoName])
  )
}

function isValidValue(value, infos) {
  return (
    Object.keys(infos).filter((infoName) => isValid(value, infos[infoName]))
      .length > 0
  )
}
function getTicketErrorRate(ticket, infos) {
  return ticket.map((v) => (isValidValue(v, infos) ? 0 : v)).reduce(reducerSum)
}
