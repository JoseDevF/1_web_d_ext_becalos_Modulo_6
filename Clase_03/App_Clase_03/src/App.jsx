import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { EjemploEffect } from './components/EjemploEffect'
import { EjemploMemo } from './components/EjemploMemo'
import './App.css'
import { TituloDinamico } from './components/TituloDinamico'
import { ListaFiltrable } from './components/ListaFiltrable'

function App() {
  const [miArray, setMiArray] = useState(["banana", "manzana"])

  const agregarFruta = () => {

    /*  miArray.push("sandia");
     console.log(miArray);
     setMiArray(miArray); */

    const nuevoArray = [...miArray, "sandia"];
    setMiArray(nuevoArray);
  }

  const quitarFruta = () => {
    setMiArray(prev => prev.slice(0, prev.length - 1));
  }

  return (
    <>
      {/* <div>
        <button onClick={agregarFruta} className="mr-2">Agregar</button>
        <button onClick={quitarFruta}>Quitar última</button>
        <ul className="mt-4">
          {miArray.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
      <EjemploEffect />
      <EjemploMemo items={miArray} />
      <TituloDinamico /> */}
      <ListaFiltrable />
    </>
  )
}

export default App
