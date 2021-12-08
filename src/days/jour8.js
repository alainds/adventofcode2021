import { input, inputEx } from "data/input8"
import { intersectArray, reducerSum } from "util/array"

const dataInit = (inp) =>
  inp.split("\n").map((a) =>
    a.split(" | ").map((a) =>
      a
        .trim()
        .split(" ")
        .map((b) => b.split("").sort().join(""))
    )
  )

const devinerDigits = (ligne) => {
  const longueur2 = ligne.filter((a) => a.length === 2)
  const longueur3 = ligne.filter((a) => a.length === 3)
  const longueur4 = ligne.filter((a) => a.length === 4)
  const longueur5 = ligne.filter((a) => a.length === 5)
  const longueur6 = ligne.filter((a) => a.length === 6)
  const longueur7 = ligne.filter((a) => a.length === 7)
  const digits = []
  const deleteDigitFromArray = (arr, digit) =>
    arr.splice(arr.indexOf(digits[digit]), 1)
  const isDigitIntersect = (a, digit) =>
    intersectArray(a.split(""), digits[digit].split("")).length ===
    digits[digit].length
  const isDigitIntersect3 = (a, digit) =>
    intersectArray(a.split(""), digits[digit].split("")).length === 3
  digits[1] = longueur2[0]
  digits[7] = longueur3[0]
  digits[4] = longueur4[0]
  digits[8] = longueur7[0]
  digits[3] = longueur5.find((a) => isDigitIntersect(a, 1))
  deleteDigitFromArray(longueur5, 3)
  digits[9] = longueur6.find((a) => isDigitIntersect(a, 4))
  deleteDigitFromArray(longueur6, 9)
  digits[0] = longueur6.find((a) => isDigitIntersect(a, 7))
  deleteDigitFromArray(longueur6, 0)
  digits[6] = longueur6[0]
  digits[5] = longueur5.find((a) => isDigitIntersect3(a, 4))
  deleteDigitFromArray(longueur5, 5)
  digits[2] = longueur5[0]
  return digits
}
function result1() {
  const data = dataInit(input)
  const fourDigits = data.map((a) => a[1])
  const easyDigits = fourDigits.map((a) =>
    a.filter((d) => [2, 3, 4, 7].includes(d.length))
  )
  const result = easyDigits.map((a) => a.length).reduce(reducerSum)
  return result
}
function result2() {
  const data = dataInit(input)
  const tenDigits = data.map((a) => a[0])
  const fourDigits = data.map((a) => a[1])
  const digits = tenDigits.map((ligne) => devinerDigits(ligne))
  const signals = fourDigits.map((a, index) =>
    a.map((b) => digits[index].indexOf(b)).join("")
  )
  const result = signals.map((a) => parseInt(a)).reduce(reducerSum)
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
