import { useState,useRef } from 'react'
import logo from '../src/assets/imgProyect/logo.jpg'
import banner from '../src/assets/imgProyect/banner.jpg'
import Form2 from './components/form2'

const inputClass="w-full bg-gray-200 py-3 mb-4 rouneded-md px-2"
function App() {
const [showMenuPerson,setShowPerson]=useState(false)
const [showMenuPay,setShowMenuPay]=useState(false)
const btnRef=useRef(null)

const UpdateBtn=()=>{
  if(!showMenuPay){
    setShowPerson(!showMenuPerson)
    showMenuPerson&&btnRef.current.scrollIntoView({block: "end", behavior: "smooth"})
  }
  setShowMenuPay(false)
}
const btnContinue=()=>{
  btnRef.current.scrollIntoView({block: "start", behavior: "smooth"})
  setShowMenuPay(!showMenuPay)
}
return (
    <div className="flex flex-col items-center bg-gray-100">
        <img className="w-screen" src={logo} alt="" srcset=""/>
        <img className="w-screen" src={banner} alt="" srcset=""/>
        <div className='w-2/3 bg-white px-5 mt-8 rounded-md pt-2 mb-5'>
          <div className='px-1'>
            El paquete correspondiente al código: <b>CO-7183440177</b> se encuentra en estado: <b>ESTADO EN ESPERA</b>. Para liberar el paquete debe actualizar los datos de envios y realizar el pago de <b>IMPUESTOS ADUANEROS</b> por un valor de: <b>$9.650 COP</b>
          </div>
          <div className='bg-slate-200 p-4 border '>
            <button onClick={()=>UpdateBtn()} className='bg-orange-600 text-white w-full py-3 hover:underline rounded-md'>
              Actualizar información personal
            </button>
          </div>
          <div style={{height:showMenuPerson?"550px":"0px"}} className={`transition-height duration-500 ease-in-out relative overflow-hidden`} ref={btnRef} >
            <h6 className='mb-5 ml-4 mt-4'>Actualizar información personal.</h6>
            <form className='flex flex-col w-full flex-col items-center px-4'>
                <input className={inputClass} type="text" name="nombre" placeholder="Nombre"/>
                <input className={inputClass} type="text" name="apellido" placeholder="Apellido"/>
                <input className={inputClass} type="text" name="cedula" placeholder="Número de documento"/>
                <input className={inputClass} type="text" name ="tel" placeholder="Telefono de contacto"/>
                <input className={inputClass} type="text" name="ciudad" placeholder="Ciudad de entrega"/>
                <input className={inputClass} type="text" name="direccion" placeholder="Dirección de entrega"/>
                <button className='bg-orange-600 text-white w-full py-3 hover:underline rounded-md' type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                    onClick={()=>btnContinue()}
                    
                  >
                      Continuar
                </button>
            </form>
            <Form2 showMenuPay={showMenuPay} inputClass={inputClass}/>
            <div className='bg-gray-200 w-full borer-2 h-6 mt-4 mb-0'></div>
          </div>
        </div>
    
    </div>
  )
}

export default App
