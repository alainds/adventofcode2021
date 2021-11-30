import { input } from "data/input22"
import { arraysEqual, reducerSum } from "util/array"

function result1() {
  return getWinnerScore(play(getData()))
}

function result2() {
  return getWinnerScore(playSub(getData()))
}

export default function getResultats() {
  return [result1(), result2()]
}
function play(decks) {
  while (decks.player1.length > 0 && decks.player2.length > 0) {
    decks = oneTurn(decks)
  }
  return decks
}
function getWinnerScore(decks) {
  const winner = decks.player1.length === 0 ? decks.player2 : decks.player1

  console.log("END")
  console.log({ decks })
  return winner
    .reverse()
    .map((a, i) => a * (i + 1))
    .reduce(reducerSum)
}

function oneTurn(decks) {
  let { player1, player2 } = decks
  const card1 = player1.splice(0, 1)[0]
  const card2 = player2.splice(0, 1)[0]
  if (card1 > card2) {
    player1.push(card1)
    player1.push(card2)
  } else {
    player2.push(card2)
    player2.push(card1)
  }
  return { player1, player2 }
}

function oneTurnWithWinner(decks, isPlayer1Wins) {
  let { player1, player2 } = decks
  const card1 = player1.splice(0, 1)[0]
  const card2 = player2.splice(0, 1)[0]
  if (isPlayer1Wins) {
    player1.push(card1)
    player1.push(card2)
  } else {
    player2.push(card2)
    player2.push(card1)
  }
  return { player1, player2 }
}

function removeCards(decks) {
  const { player1, player2 } = decks

  return {
    player1: player1.slice(1, player1[0] + 1),
    player2: player2.slice(1, player2[0] + 1),
  }
}

function playSub(decksInput, game = 1) {
  let nnnn = 0
  const turns = []
  let isPlayer1WinsExist = false
  let decks = JSON.parse(JSON.stringify(decksInput))
  while (
    decks.player1.length > 0 &&
    decks.player2.length > 0 &&
    !isPlayer1WinsExist
  ) {
    nnnn++
    const decksBefore = JSON.parse(JSON.stringify(decks))
    isPlayer1WinsExist = isDecksExistedBefore(decks, turns)
    turns.push(decksBefore)
    decks = oneTurnSub(decks)
    if (isPlayer1WinsExist) {
      return true
    } else if (
      arraysEqual(decks.player1, decksBefore.player1) &&
      arraysEqual(decks.player2, decksBefore.player2)
    ) {
      debugger
      const isPlayer1Wins = playSub(removeCards(decks), game + 1)
      decks = oneTurnWithWinner(decks, isPlayer1Wins)
    }
  }
  if (game === 1) {
    return decks
  } else {
    return decks.player2.length === 0
  }
}
function isDecksExistedBefore(decks, turns) {
  for (let index = 0; index < turns.length; index++) {
    const element = turns[index]
    if (
      arraysEqual(decks.player1, element.player1) &&
      arraysEqual(decks.player2, element.player2)
    ) {
      return true
    }
  }
  return false
}
function oneTurnSub(decks) {
  let { player1, player2 } = decks
  const card1 = player1[0]
  const card2 = player2[0]
  if (player1.length > card1 && player2.length > card2) {
    return decks
  }
  player1.splice(0, 1)
  player2.splice(0, 1)

  if (card1 > card2) {
    player1.push(card1)
    player1.push(card2)
  } else {
    player2.push(card2)
    player2.push(card1)
  }
  return { player1, player2 }
}

function getData() {
  const players = input.split("\n\n").map((a) =>
    a
      .split("\n")
      .filter((b) => b.substr(0, 1) !== "P")
      .map((b) => parseInt(b))
  )
  return { player1: players[0], player2: players[1] }
}
