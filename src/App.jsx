import { useState } from 'react'
import logo from '../src/assets/imgProyect/logo.jpg'
import verificado from '../src/assets/imgProyect/verificado.png'
import PageVerify from './components/PageVerify'
import Formularios from './components/Formularios'
import Loader from './components/loader'

function App() {
const [mensajeFelicidades,setMensajeFelicidades]=useState(false)
const [verificarPais,setVerificarPais]=useState(false)
const [loader,setLoader]=useState(true)

return (<>
  {loader&&<Loader/>}
  {<PageVerify setVerificarPais={setVerificarPais} verificarPais={verificarPais} logo={logo} setLoader={setLoader} loader={loader}/>}
  {!mensajeFelicidades?<Formularios setMensajeFelicidades={setMensajeFelicidades} loader={loader} verificarPais={verificarPais} />
      :<div className='flex flex-col items-center'>
          <img className="w-screen" src={logo} alt="" />
          <img className="w-1/2 my-10" src={verificado} alt="" />
          <p className='px-5 md:text-4xl'>Sus datos han sido enviados con exito!!</p>
        </div>}
    </>)
}

export default App
