import { input } from "data/input19"
import { get, isArray } from "lodash"
import { getArrayDepth, flatDeepBis, concatUnionArrays } from "util/array"
//PAS FINI :(
function result1() {
  const data = getData()
  let messages = data.messages
  let rules = []
  data.rules.map((a) => (rules[a.i] = a.message))

  // let goodmessages = getMessages(0, rules, "")

  // const d = getArrayDepth(goodmessages)
  // goodmessages = goodmessages.flat(d)

  // return messages.filter((m) => goodmessages.includes(m)).length
}

function result2() {
  const data = getData()
  let messages = data.messages
  const messageMax = Math.max(...messages.map((a) => a.length))
  let rules = []
  data.rules.map((a) => (rules[a.i] = a.message))
  rules[8] = [["42"], ["42", "8"]]
  rules[11] = [
    ["42", "31"],
    ["42", "11", "31"],
  ]
  let goodmessages = getMessagesInfinite(0, rules, "", messageMax)

  // const d = getArrayDepth(goodmessages)
  // debugger
  // goodmessages = goodmessages.flat(5)

  return messages.filter((m) => goodmessages.includes(m)).length
}

function getMessagesInfinite(rule, rules, prefix, max, count = 0) {
  // debugger
  if (
    typeof rules[rule][0][0] === "string" &&
    /[a-z]+/.test(rules[rule][0][0])
  ) {
    return prefix + rules[rule][0][0]
  }
  // if (count > 8) return prefix
  return rules[rule]
    .map((a) => {
      let result = ""
      a.map((el) => {
        if (result.length <= max)
          result = concatUnionArrays(
            result,
            getMessagesInfinite(el, rules, prefix, max, count++)
          )
        return false
      })
      return result
    })
    .flat(2)
}

function getMessages(rule, rules, prefix) {
  if (
    typeof rules[rule][0][0] === "string" &&
    /[a-z]+/.test(rules[rule][0][0])
  ) {
    return prefix + rules[rule][0][0]
  }
  return rules[rule]
    .map((a) => {
      let result = ""
      a.map((el) => {
        result = concatUnionArrays(result, getMessages(el, rules, prefix))
        return false
      })
      return result
    })
    .flat(2)
}

export default function getResultats() {
  return [result1(), result2()]
}
function isAllMessage(array) {
  return (
    array.filter((a) => !(typeof a === "string" && a.match(/[a-z]*/)))
      .length === 0
  )
}

function isArrayOfNumber(array) {
  return (
    array.filter((a) => !(typeof a === "string" && a.match(/[0-9]*/)))
      .length === 0
  )
}

function getData() {
  const inputs = input.split("\n\n")

  return {
    rules: inputs[0]
      .split("\n")
      .map((r) => {
        const regex = /([0-9]*): (.*)/.exec(r)
        return {
          i: parseInt(regex[1]),
          message: regex[2]
            .replaceAll('"', "")
            .split(" | ")
            .map((a) => a.split(" "))
            .map((a) => (a.length <= 1 ? a.flat(2) : a)),
        }
      })
      .sort((a, b) => (a.i > b.i ? 1 : -1)),
    messages: inputs[1].split("\n"),
  }
}
