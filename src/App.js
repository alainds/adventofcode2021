import "./App.css"
import jour1 from "./days/jour1"
import jour2 from "./days/jour2"
import jour3 from "./days/jour3"
import jour4 from "./days/jour4"
import jour5 from "./days/jour5"
import jour6 from "./days/jour6"
import jour7 from "./days/jour7"
import jour8 from "./days/jour8"
import jour9 from "./days/jour9"
import jour10 from "./days/jour10"
import jour11 from "./days/jour11"
import jour12 from "./days/jour12"
import jour13 from "./days/jour13"
import jour14 from "./days/jour14"
// import jour15 from "./days/jour15"
// import jour16 from "./days/jour16"
// import jour17 from "./days/jour17"
// import jour18 from "./days/jour18"
// import jour19 from "./days/jour19"
// import jour20 from "./days/jour20"
// import jour22 from "./days/jour22"
// import jour23 from "./days/jour23"
// import jour24 from "./days/jour24"
// import jour25 from "./days/jour25"

function App() {
  const tableauResultats = [
    // jour25(),
    // jour24(),
    // jour23(),
    // jour22(),
    // jour20(),
    // jour19(),
    // jour18(),
    // jour17(),
    // jour16(),
    // jour15(),
    jour14(),
    jour13(),
    jour12(),
    jour11(),
    jour10(),
    jour9(),
    jour8(),
    jour7(),
    jour6(),
    jour5(),
    jour4(),
    jour3(),
    jour2(),
    jour1(),
  ]
  return (
    <div className="App">
      <header className="App-header">
        <table>
          {tableauResultats.map((jour, i) => {
            return (
              <tr key={i}>
                <td>{"jour" + (tableauResultats.length - i)}</td>
                <td>{jour[0]}</td>
                <td>{jour[1]}</td>
              </tr>
            )
          })}
        </table>
      </header>
    </div>
  )
}

export default App
