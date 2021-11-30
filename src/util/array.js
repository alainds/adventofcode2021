import { isArray } from "lodash"

export const transformData = (mydata) => {
  const regexp = new RegExp("(.*)-(.*) (.*): (.*)")
  return mydata.map((i) => {
    const regex = regexp.exec(i)
    return { min: regex[1], max: regex[2], lettre: regex[3], pass: regex[4] }
  })
}

export const reducerSum = (accumulator, currentValue) =>
  accumulator + currentValue
export const reducerAnd = (accumulator, currentValue) =>
  accumulator && currentValue
export const reducerMultiply = (accumulator, currentValue) =>
  accumulator * currentValue
export const repeteData = (data, nRep) => {
  let newData = [...data]
  let i = 0
  while (i < nRep) {
    newData = newData.map((row, index) => row.concat(data[index]))
    i++
  }
  return newData
}

export const intersectArray = (array1, array2) =>
  array1.filter((value) => array2.includes(value))

export function getNbOccurrence(array, value) {
  return array.filter((v) => v === value).length
}

export function getArrayDepth(value) {
  return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0
}
export function concatArrayString(string, array) {
  return array.map((e) => string + e)
}
export function concatArrayStringSuffixe(string, array) {
  return array.map((e) => e + string)
}

export function concatUnionArrays(inputA, inputB) {
  let result
  const a = isArray(inputA) ? flatDeep(inputA) : inputA
  const b = isArray(inputB) ? flatDeep(inputB) : inputB
  if (isArray(b) && isArray(a)) {
    result = b.map((string) => concatArrayStringSuffixe(string, a))
  } else if (isArray(b) && !isArray(a)) {
    result = isArray(b[0])
      ? b.map((e) => concatUnionArrays(a, e))
      : concatArrayString(a, b)
  } else if (!isArray(b) && isArray(a)) {
    result = isArray(a[0])
      ? a.map((e) => concatUnionArrays(e, b))
      : concatArrayStringSuffixe(b, a)
  } else {
    result = a + b
  }
  return result
}

export function flatDeepBis(arr) {
  return arr.flat(getArrayDepth(arr))
}

export function flatDeep(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val),
    []
  )
}

export function arraysEqual(a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export function arrayRotate(arr, reverse) {
  if (reverse) arr.unshift(arr.pop())
  else arr.push(arr.shift())
  return arr
}
