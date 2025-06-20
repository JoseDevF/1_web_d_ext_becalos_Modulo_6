import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'
import { Timer } from './components/Timer'
import TweetCard from './components/TweetCard'
import TweetFeed from './components/TweetFeed'
import TweetComposer from './components/TweetComposer'
import { Card } from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  const valorInicial = 60;
  const [showTimer, setShowTimer] = useState(false)
  /* Estado y efecto del tweetfeed */
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // 1) Montaje (y/o cada actualización si no hubiera dependencias)
    //console.log("Se montó o actualizó el componente APP")

    // 2) (Opcional return: limpieza antes de desmontar o antes de re-ejecutar efecto)
    return () => {
      //console.log("Se desmontó o antes de la proxima actualización");
    };
  }, [])

  useEffect(() => {
    console.log("Contador: ", count)
  }, [count])

  function handleShowButton() {
    setShowTimer(prev => !prev)
  }

  function handleContador() {
    setCount(prev => prev + 1);
  }

  useEffect(() => {
    console.log('App montada - cargando tweets iniciales');
    setTimeout(() => {
      setTweets([
        { id: 1, usuario: 'ana', contenido: '¡Hola mundo! #React' },
        { id: 2, usuario: 'juan', contenido: 'TailwindCSS es increíble #Tailwind' },
        { id: 3, usuario: 'luis', contenido: 'Hooks al poder #ReactHooks' },
        { id: 4, usuario: 'joss', contenido: 'El mejor framework de CSS #Tailwindcss' }
      ]);
    }, 1000);
  }, []);

  const publicarTweet = useCallback(texto => {
    const nuevo = { id: Date.now(), usuario: 'yo', contenido: texto };
    setTweets(prev => [nuevo, ...prev]);
    console.log('Nuevo tweet publicado:', nuevo);
  }, []);

  return (
    <>
      {/* <button className="btn" onClick={handleShowButton}>Cambiar vista</button> */}
      <button className="btn" onClick={handleContador}>Contador</button>
      {
        showTimer && (
          <Timer initValue={valorInicial} />)
        /* Poner un input de publicar */
      }
      {/*CREAR COMPONENTE PARA EL INPUT Y EL BOTON*/}
      <TweetCard usuario={"Emanuel"} contenido={"Mi primer tweetcard"} className={"mt-4 inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"} />
      {/* Arreglo de tweetcards al que hacemos push cuando publicamos algo*/}

      <TweetComposer onPublicar={publicarTweet} />

      <TweetFeed tweets={tweets}>
        {
          tweet => (
            <TweetCard key={tweet.id} usuario={tweet.usuario} contenido={tweet.contenido} />
          )
        }
      </TweetFeed>


      {/* Ejemplo sencillo con Card */}
      {/* <Card>
        <h2 className='text-xl font-bold'>Titulo de la tarjeta</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam tenetur alias inventore consequatur accusantium! Quo, numquam, quidem possimus vero dicta nisi rerum sint deserunt, vel doloremque iste omnis animi ad.</p>
      </Card>

      <Card customStyle={''} contadorApp={count} >
        <h2 className='text-xl font-bold'>Titulo de la tarjeta 2</h2>
        <p>Lorem ipsum dolor sit amet.</p>
        {/* <TweetCard usuario={"Emanuel"} contenido={"Mi primer tweetcard"} className={"mt-4 inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"} />
        <Timer initValue={valorInicial} /> * /}
      </Card> */}
    </>
  )
}

export default App
