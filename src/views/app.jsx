import React, { useEffect, useState, useRef } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const latestCount = useRef(count)

  function handleAlertClick() {
    setTimeout(() => {
      // alert(`You clicked on:${count}`)
    }, 3000)
  }

  useEffect(() => {
    latestCount.current = count
    setTimeout(() => {
    }, 3000)
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button type="button" onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  )
}

const App = () => <Counter />

export default App
