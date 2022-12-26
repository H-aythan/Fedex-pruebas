import React from 'react'
import logo from '../assets/imgProyect/logo.jpg'
const Loader = () => {
  return (
    <div style={{zIndex:"1000"}} className=' fixed h-screen bg-white flex flex-col items-center'>
                <img className="w-screen" src={logo} alt="" />
                <svg className='animate-spin ml-2 w-40 h-40 border-4 border-l-purple-400 rounded-full mt-40' ></svg>
                <p className='mt-10 text-3xl'>Verificando region, espere porfavor</p>
            </div> 
  )
}

export default Loader