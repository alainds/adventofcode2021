import { input } from "data/input4"
import { reducerSum, reducerAnd } from "util/array"

const dataBrut = input.split("\n\n")

function result1() {
  const passeports = dataBrut.map((c) =>
    c.split(/[\s\n]/g).map((a) => a.split(":"))
  )
  const passeportsFields = passeports.map((pass) =>
    pass.map((a) => a[0]).sort()
  )
  const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
  const passeportsValid = passeportsFields.map((fields) => {
    const isValid = validFields.every((r) => fields.includes(r))
    return isValid ? 1 : 0
  })

  return passeportsValid.reduce(reducerSum)
}

function result2() {
  const passeports = dataBrut.map((c) =>
    c.split(/[\s\n]/g).map((a) => a.split(":"))
  )
  const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
  const passeportsFields = passeports.map((pass) => pass.map((a) => a[0]))
  const passeportsValid1 = passeportsFields.map((fields) => {
    const isValid = validFields.every((r) => fields.includes(r))
    return isValid
  })
  const passeportsValid2 = passeports.map((pass) =>
    pass.map((a) => {
      return isValidField(a)
    })
  )
  const passeportsValues = passeports.map((pass, indexPass) => {
    const required = passeportsValid1[indexPass]
    const valid = passeportsValid2[indexPass].reduce(reducerAnd)
    return {
      required,
      valid,
      validAndRequired: valid && required,
      values: pass.map((a) => {
        return { name: a[0], value: a[1], valid: isValidField(a) }
      }),
    }
  })
  return passeportsValues.map((a) => a.validAndRequired).reduce(reducerSum)
}

function isValidField(field) {
  let isValid = false
  const name = field[0]
  const value = field[1]
  const regexpDigits = (digit) => new RegExp("^[0-9]{" + digit + "}$")
  switch (name) {
    case "byr":
      const regexpByr = regexpDigits(4)
      isValid = regexpByr.test(value) && value >= 1920 && value <= 2002
      break
    case "iyr":
      const regexpIyr = regexpDigits(4)
      isValid = regexpIyr.test(value) && value >= 2010 && value <= 2020
      break
    case "eyr":
      const regexpEyr = regexpDigits(4)
      isValid = regexpEyr.test(value) && value >= 2020 && value <= 2030
      break
    case "hgt":
      const regexpHgt = new RegExp("^([0-9]*)(.{2})$")
      const hgtValue = regexpHgt.test(value) && regexpHgt.exec(value)[1]
      const hgtType = regexpHgt.test(value) && regexpHgt.exec(value)[2]
      isValid =
        regexpHgt.test(value) &&
        ((hgtType === "cm" && hgtValue >= 150 && hgtValue <= 193) ||
          (hgtType === "in" && hgtValue >= 59 && hgtValue <= 76))
      break
    case "hcl":
      const regexpHcl = new RegExp("^#[0-9a-f]{6}$")
      isValid = regexpHcl.test(value)
      break
    case "ecl":
      const regexpEcl = new RegExp("amb|blu|brn|gry|grn|hzl|oth")
      isValid = regexpEcl.test(value)
      break
    case "pid":
      const regexpPid = regexpDigits(9)
      isValid = regexpPid.test(value)
      break
    case "cid":
      isValid = true
      break
    default:
      isValid = false
      break
  }
  return isValid
}

export default function getResultats() {
  return [result1(), result2()]
}
