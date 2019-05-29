import * as React from 'react'

const { useState } = React

function Counter() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div>
      <p>Counter</p>
      <button type="button" onClick={increment}>
        +
      </button>
      <span>{count}</span>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  )
}

const App = () => <Counter />

export default App
