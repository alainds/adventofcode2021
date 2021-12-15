export function plusProcheMultiple(x, y) {
  return Math.round(x / y) * y
}

export function plusProcheMultipleSuivant(x, y) {
  return (Math.trunc(x / y) + 1) * y
}

export const gcd = (a, b) => (a ? gcd(b % a, a) : b)

export const lcm = (a, b) => (a * b) / gcd(a, b)

export function lcmArray(array) {
  // Least common multiple of a list of integers
  var n = 1
  for (var i = 0; i < array.length; ++i) n = lcm(array[i], n)
  return n
}

export const bigIntMax = (...args) => args.reduce((m, e) => (e > m ? e : m))
export const bigIntMin = (...args) => args.reduce((m, e) => (e < m ? e : m))

export function plusProcheMultipleSuivantBigInt(x, y) {
  return (x / y + 1n) * y
}

export function plusProcheMultipleBigInt(x, y) {
  return (x / y) * y
}

export function dec2bin(dec) {
  return (dec >>> 0).toString(2)
}

export function pad(n, width, z = "0") {
  n = n + ""
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

export function bezout(a, b, c) {
  let r1 = b
  let r2 = a
  let u1 = 1n
  let u2 = 0n
  let v1 = 0n
  let v2 = 1n
  while (r2 !== 0n) {
    const q = r1 / r2
    const rs = r1
    const us = u1
    const vs = v1
    r1 = r2
    u1 = u2
    v1 = v2
    r2 = rs - q * r2
    u2 = us - q * u2
    v2 = vs - q * v2
  }

  return { a0: a, a1: -b, x1: -u1 * c, y1: -v1 * c }
  // return { u: u1 * c, v: v1 * c }
}

const shortestDistanceNode = (distances, visited) => {
  let shortest = null

  for (let node in distances) {
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest]
    if (currentIsShortest && !visited.includes(node)) {
      shortest = node
    }
  }
  return shortest
}

export const findShortestPath = (graph, startNode, endNode) => {
  // establish object for recording distances from the start node
  let distances = {}
  distances[endNode] = "Infinity"
  distances = Object.assign(distances, graph[startNode])

  // track paths
  let parents = { endNode: null }
  for (let child in graph[startNode]) {
    parents[child] = startNode
  }

  // track nodes that have already been visited
  let visited = []

  // find the nearest node
  let node = shortestDistanceNode(distances, visited)

  // for that node
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node]
    let children = graph[node]
    // for each of those child nodes
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child]
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        // save the distance to the object
        // record the path
        if (!distances[child] || distances[child] > newdistance) {
          distances[child] = newdistance
          parents[child] = node
        }
      }
    }
    // move the node to the visited set
    visited.push(node)
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited)
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode]
  let parent = parents[endNode]
  while (parent) {
    shortestPath.push(parent)
    parent = parents[parent]
  }
  shortestPath.reverse()

  // return the shortest path from start node to end node & its distance
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  }

  return results
}
