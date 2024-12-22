import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine  = ({ text, value }) => (<>{text} {value}<br></br></>)

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
  }
  return (
    <p>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good+neutral+bad} />
      <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)} />
      <StatisticLine text="positive" value={good} />
      <StatisticLine text="good" value={(good*100/(good+neutral+bad)) + " %"} />
    </p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text="good" />
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={()=>setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App