import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
  }

const Statistics = (props) => {

    if (props.all === 0) {
    return (
    <table>
      <tbody>
        <StatisticLine text="no feedback given"></StatisticLine>
      </tbody>
    </table>
      )
    }
return(

<table>
  <tbody>
    <StatisticLine text="good" value={props.good}></StatisticLine>
    <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
    <StatisticLine text="bad" value={props.bad}></StatisticLine>
    <StatisticLine text="all" value={props.all}></StatisticLine>
    <StatisticLine text="average" value={props.average}></StatisticLine>
    <StatisticLine text="positive" value={(props.good / props.all) * 100}></StatisticLine>
  </tbody>
</table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const addGood = () => {
    const goodNew = good + 1
    const allNew1 = goodNew + neutral + bad
    
    setGood(goodNew)
    setAll(allNew1)
    const averageNew = (((goodNew * 1) + (neutral * 0) + (bad * -1)) / allNew1)
    setAverage(averageNew)
  }

  const addNeutral = () => {
    const neutralNew = neutral + 1
    const allNew2 = good + neutralNew + bad

    setNeutral(neutralNew)
    setAll(allNew2)
    const averageNew = (((good * 1) + (neutralNew * 0) + (bad * -1)) / allNew2)
    setAverage(averageNew)    
  }

  const addBad = () => {
    const badNew = bad + 1
    const allNew3 = good + neutral + badNew

    setBad(badNew)
    setAll(allNew3)
    const averageNew = (((good * 1) + (neutral * 0) + (badNew * -1)) / allNew3)
    setAverage(averageNew)
  }

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={addGood} text="good"></Button>
      <Button onClick={addNeutral} text="neutral"></Button>
      <Button onClick={addBad} text="bad"></Button>
      <h2>statistics</h2>      
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}></Statistics>
    </>
  )
}

export default App