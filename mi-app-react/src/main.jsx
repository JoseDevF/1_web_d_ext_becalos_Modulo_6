import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Ejemplo from './Ejemplo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Ejemplo list={[1, 2, 3, 4, 5, 6]} dummy={"cadena"} miParametro={true} />
  </StrictMode>,
)
