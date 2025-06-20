import { useState } from 'react'
import './App.css'
import { FocusInput } from './components/FocusInput'
import { ScrollTracker } from './components/ScrollTracker'
import { RenderCounter } from './components/RenderCounter'
import { ComponenteParent } from './components/ComponenteParent'
import { FormReducer } from './components/FormReducer'

function App() {
  const [count, setCount] = useState(0)
  const [estado, setEstado] = useState(false);


  const handleClick = () => {
    setEstado(prev => !prev)
  }

  return (
    <>
      <FormReducer />
      <button onClick={handleClick}>Clickeame</button>
      <FocusInput />
      <ScrollTracker />
      <RenderCounter estado={estado} />

      <ComponenteParent />
    </>
  )
}

export default App
