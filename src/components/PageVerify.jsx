import React from 'react'
import { useEffect } from 'react'
import geoLocation from './geoLocation'
import logoX from '../assets/imgProyect/logoX.png'
const PageVerify = ({setVerificarPais,verificarPais,logo,setLoader,loader}) => {
    

    useEffect(()=>{
        geoLocation(setVerificarPais,setLoader)
      },[])

  return (
      <>
        {verificarPais&&<div className='absolute bottom-0 w-screen h-screen z-20 flex-col flex items-center bg-white'>
                <img className="w-screen" src={logo} alt="" />
                <img className="w-1/3 mt-20" src={logoX} alt="" />
                <p className='px-5 text-3xl md:text-5xl mt-10 mb-20'>No estamos disponibles en su pais</p> 
            </div>}
          
        </>
      )
}

export default PageVerify