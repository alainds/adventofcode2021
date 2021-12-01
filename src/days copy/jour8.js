import { input } from "data/input8"

const dataBrut = input.split("\n")
const commandes = dataBrut.map((a) => {
  const b = a.split(" ")
  return { nom: b[0], valeur: b[1] }
})

const ACC = "acc"
const NOP = "nop"
const JMP = "jmp"

function result1() {
  return getAccumulator(commandes).accumulator
}

function result2() {
  let reponses
  for (let i = 0; i < commandes.length; i++) {
    const commandesNew = [...commandes]
    if ([JMP, NOP].includes(commandesNew[i].nom)) {
      commandesNew[i] =
        commandesNew[i].nom === NOP
          ? { nom: JMP, valeur: commandesNew[i].valeur }
          : { nom: NOP, valeur: commandesNew[i].valeur }
    }
    reponses = getAccumulator(commandesNew)
    if (reponses.isTermine) break
  }
  return reponses.accumulator
}

function getAccumulator(commandes) {
  let accumulator = 0
  let indexCourant = 0
  let commandesSuite = []
  let isTermine = false
  while (true) {
    const commandeCourante = commandes[indexCourant]
    if (!commandesSuite.includes(commandeCourante)) {
      commandesSuite.push(commandeCourante)
      accumulator = [ACC].includes(commandeCourante.nom)
        ? accumulator + commandeCourante.valeur * 1
        : accumulator
      indexCourant = [ACC, NOP].includes(commandeCourante.nom)
        ? indexCourant + 1
        : indexCourant + commandeCourante.valeur * 1
      isTermine =
        [ACC].includes(commandeCourante.nom) &&
        indexCourant === commandes.length - 1
      if (isTermine) return { accumulator, commandesSuite, isTermine }
    } else {
      break
    }
  }
  return { accumulator, commandesSuite, isTermine }
}

export default function getResultats() {
  return [result1(), result2()]
}
