const transposeArraysOfArrays = (d) => {
  let data = []
  d.map((a, i) =>
    a.map((b, j) => {
      data[j] ? data[j].push(b) : (data[j] = [b])
      return b
    })
  )
  return data
}
