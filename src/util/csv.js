import Papa from "papaparse"

export async function getData(file) {
  const data = Papa.parse(await fetchCsv(file))
  console.log(data.data)
  return data.data
}

export async function fetchCsv(file) {
  const response = await fetch(file)
  const reader = response.body.getReader()
  const result = await reader.read()
  const decoder = new TextDecoder("utf-8")
  const csv = await decoder.decode(result.value)
  return csv
}
