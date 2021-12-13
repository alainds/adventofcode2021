import { input, inputEx } from "data/input13"
import { getUnique } from "util/array"
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Scatter } from "react-chartjs-2"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

const dataInit = (inp) => {
  const data = inp.split("\n\n")
  const points = data[0]
    .split("\n")
    .map((a) => a.split(",").map((b) => parseInt(b)))
  const pliages = data[1].split("\n").map((a) => {
    return {
      sens: a.includes("y") ? "y" : "x",
      position: parseInt(a.substring(a.indexOf("=") + 1)),
    }
  })
  return { points, pliages }
}

const doPliage = (points, pliage) => {
  let pointsPlies = []
  const max = pliage.position * 2
  if (pliage.sens === "x") {
    pointsPlies = points.map((a) =>
      a[0] <= pliage.position ? a : [max - a[0], a[1]]
    )
  } else {
    pointsPlies = points.map((a) =>
      a[1] <= pliage.position ? a : [a[0], max - a[1]]
    )
  }
  return getUnique(pointsPlies)
}

function result1() {
  let { points, pliages } = dataInit(input)
  const result = doPliage(points, pliages[0]).length
  return result
}
function result2() {
  let { points, pliages } = dataInit(input)
  for (let index = 0; index < pliages.length; index++) {
    points = doPliage(points, pliages[index])
  }
  points = doPliage(points, { sens: "y", position: 0 })
  points = points.map((a) => {
    return { x: a[0], y: a[1] }
  })

  const data = {
    datasets: [
      {
        label: "jour 13",
        data: points,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
    maintainAspectRatio: false,
  }

  return (
    <Scatter
      width={500}
      height={500}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            max: 40,
          },
        },
      }}
      data={data}
    />
  )
}
export default function getResultats() {
  return [result1(), result2()]
}
