import { input } from "data/input18"
import { reducerMultiply, reducerSum } from "util/array"

function result1() {
  const operations = getData()
  return operations.map((op) => calcul(op)).reduce(reducerSum)
}

function result2() {
  const operations = getData()
  return operations.map((op) => calcul(op, calculSimpleAdd)).reduce(reducerSum)
}

export default function getResultats() {
  return [result1(), result2()]
}

function calculSimpleAdd(operationString) {
  const regexOp = /[*+]/
  const regexNumber = /[0-9]/g
  const numbers = operationString.split(regexOp).map((a) => parseInt(a))
  const addMults = operationString.replaceAll(regexNumber, "").split("")
  let adds = addMults
    .map((type, i) => {
      return {
        type,
        i,
      }
    })
    .filter((o) => o.type === "+")
  let newNumbers = [...numbers]
  let result = 0
  for (let index = 0; index < adds.length; index++) {
    const add = adds[index]
    const nextAdd = adds[index + 1]
    const previousAdd = adds[index - 1]
    const hasPreviousAdd = previousAdd && add.i - previousAdd.i === 1
    const hasNextAdd = nextAdd && nextAdd.i - add.i === 1
    result = hasPreviousAdd
      ? result + numbers[add.i + 1]
      : numbers[add.i] + numbers[add.i + 1]
    newNumbers.splice(add.i, 1, 1)
    newNumbers.splice(add.i + 1, 1, result)
    result = hasNextAdd ? result : 0
  }
  const resultFin = newNumbers.reduce(reducerMultiply)

  return resultFin
}

function calculSimple(operationString) {
  const regexOp = /[*+]/
  const regexNumber = /[0-9]/g
  const numbers = operationString.split(regexOp)
  const addMults = operationString.replaceAll(regexNumber, "").split("")
  let result = parseInt(numbers[0])
  numbers.splice(0, 1)
  for (let index = 0; index < numbers.length; index++) {
    const element = numbers[index]
    result =
      addMults[index] === "*"
        ? parseInt(element) * result
        : parseInt(element) + result
  }
  return result
}

function calcul(operation, calculSimpleFunc = calculSimple) {
  if (!operation.includes("(")) {
    return calculSimpleFunc(operation)
  } else {
    const regexBrace = /\(([^(^)]+)\)/
    const operationInBracket = regexBrace.exec(operation)[1]
    return calcul(
      operation.replace(
        regexBrace,
        calcul(operationInBracket, calculSimpleFunc)
      ),
      calculSimpleFunc
    )
  }
}

function getData() {
  return input.split("\n").map((a) => a.replaceAll(" ", ""))
}
