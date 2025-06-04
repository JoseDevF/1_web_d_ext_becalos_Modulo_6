import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Ejemplo(props) {
    const [count, setCount] = useState(0)
    const { list } = props

    return (
        <>
            {
                list.forEach(item => (
                    <p>{item}</p>
                ))
            }
        </>
    )
}

export default Ejemplo
