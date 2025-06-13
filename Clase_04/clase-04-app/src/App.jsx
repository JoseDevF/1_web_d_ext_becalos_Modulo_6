import { useState, useEffect } from 'react'
import './App.css'
import { Timer } from './components/Timer'
import { TweetCard } from './components/TweetCard'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 1) Montaje (y/o cada actualización si no hubiera dependencias)
    //console.log("Se montó o actualizó el componente APP")

    // 2) (Opcional return: limpieza antes de desmontar o antes de re-ejecutar efecto)
    return () => {
      //console.log("Se desmontó o antes de la proxima actualización");
    };
  }, [])

  return (
    <>
      {/* <Timer /> */}
      {/* Poner un input de publicar */}
      {/* CREAR COMPONENTE PARA EL INPUT Y EL BOTON*/}
      <TweetCard usuario={"Emanuel"} contenido={"Mi primer tweetcard"} />
      {/* Arreglo de tweetcards al que hacemos push cuando publicamos algo*/}
    </>
  )
}

export default App
