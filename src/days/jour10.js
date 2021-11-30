import { input } from "data/input10"
import { reducerSum } from "util/array"

const dataBrut = input.split("\n")
const adapters = dataBrut.map((a) => parseInt(a))
function result1() {
  const adapterMax = Math.max(...adapters)
  const diffs = getAdapters(adapters, adapterMax).diffs
  return (
    diffs.filter((d) => d === 1).length * diffs.filter((d) => d === 3).length
  )
}

function result2() {
  const adapterMax = Math.max(...adapters)
  const diffsMin = getAdapters(adapters, adapterMax).diffs
  const adaptersSuiteMin = getAdapters(adapters, adapterMax).adaptersSuiteMin

  let diffCourant = diffsMin.length - 1
  let nbPossibilites = [
    { adapter: adaptersSuiteMin[adaptersSuiteMin.length - 1], n: 1 },
  ]
  while (diffCourant >= 0) {
    const adapterCourant = adaptersSuiteMin[diffCourant]

    let possibilitesAdapter = []
    const diffDiffCourant = diffsMin[diffCourant]
    const diffDiffCourant1 = diffsMin[diffCourant + 1]
    const diffDiffCourant2 = diffsMin[diffCourant + 2]
    if (
      diffDiffCourant2 &&
      diffDiffCourant2 + diffDiffCourant1 + diffDiffCourant <= 3
    ) {
      possibilitesAdapter = [
        adaptersSuiteMin[diffCourant + 1],
        adaptersSuiteMin[diffCourant + 2],
        adaptersSuiteMin[diffCourant + 3],
      ]
    } else if (diffDiffCourant1 && diffDiffCourant1 + diffDiffCourant <= 3) {
      possibilitesAdapter = [
        adaptersSuiteMin[diffCourant + 1],
        adaptersSuiteMin[diffCourant + 2],
      ]
    } else {
      possibilitesAdapter = [adaptersSuiteMin[diffCourant + 1]]
    }
    const nbPossibilitesAdapterCourant = possibilitesAdapter.map(
      (adapterPossible) =>
        nbPossibilites.filter((a) => a.adapter === adapterPossible)[0].n
    )
    nbPossibilites.push({
      adapter: adapterCourant,
      n: nbPossibilitesAdapterCourant.reduce(reducerSum),
    })
    diffCourant--
  }

  return nbPossibilites[nbPossibilites.length - 1].n
}

export default function getResultats() {
  return [result1(), result2()]
}

function getAdapters(adapters, adapterMax, comp = (x) => Math.min(x)) {
  const JOLTS_INIT = 0
  const diffs = []
  const possibleDiffs = [1, 2, 3]
  let adapter = JOLTS_INIT
  let adaptersSuite = [adapter]
  while (adapter < adapterMax) {
    const possibleAdapters = possibleDiffs.map((a) => a + adapter)
    const possibleAdapterDiffs = adapters.filter((a) =>
      possibleAdapters.includes(a)
    )
    const nextAdapter = Math.min(...possibleAdapterDiffs)
    adaptersSuite.push(nextAdapter)
    diffs.push(nextAdapter - adapter)
    adapter = nextAdapter
  }
  diffs.push(3)
  adaptersSuite.push(adapterMax + 3)
  return { diffs, adaptersSuiteMin: adaptersSuite }
}

function result1b() {
  //plus simple
  const getDiffs = (adapters) =>
    adapters
      .sort((a, b) => a > b)
      .map((a, i) => (i > 0 ? a - adapters[i - 1] : a))
  const adaptersWithEnd = [...adapters]
  adaptersWithEnd.push(adapters[adapters - 1] + 3)
  const diffs = getDiffs(adaptersWithEnd)
  return (
    diffs.filter((d) => d === 1).length * diffs.filter((d) => d === 3).length
  )
}
