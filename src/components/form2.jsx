import React from 'react'

const form2 = ({showMenuPay,inputClass}) => {
  return (
    <form style={{top:showMenuPay?"0px":"550px"}} className={`border-2 absolute w-full h-full bg-white ${showMenuPay?"":""} transition-all duration-500 ease-in-out`}>
        <div className='bg-gray-200 w-full border-2 h-6 mb-0  border-t-gray-300'></div>
        <div className='w-full px-4'>
            <h5 className='text-xl my-4'>Realizar pago de impuesto de aduanas por valor de: $9.650 COP.</h5>
            <input className={inputClass} type="text" name="nombre" placeholder="Nombre y Apellido" required/>
            <input className={inputClass} type="number" name="nombre" placeholder="Número de tarjeta de credito" required/>
            <input className={inputClass} type="number" name="nombre" placeholder="CVV" required/>
            <input className={inputClass} type="text" name="nombre" placeholder="Fecha Expiración " required/>
        </div>
        <button className='bg-orange-600 text-white w-full py-3 hover:underline rounded-md'>Realizar pago por: $9.650 COP</button>
    </form>
  )
}

export default form2