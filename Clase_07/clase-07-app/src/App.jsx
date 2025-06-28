import './App.css'
import { AutoFocus } from './components/AutoFocus'
//import { Outlet, Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar'

function App() {

  return (
    <>
      <NavBar />
      <main className='p-6'>
        <Outlet />
      </main>
    </>
  )
}

export default App
