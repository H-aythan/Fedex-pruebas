const geoLocation=async(setVerificarPais,setLoader)=>{
    
   try {
        const res=await fetch("https://ipapi.co/json/")
        const data=await res.json()
        
        if(data.country_name=="Venezuela"||data.country_name=="Colombia"){
            setVerificarPais(false)
        }else{
            setVerificarPais(true)
        }
        
    }catch (error) {
        console.log(error)    
    }finally{
        setTimeout(()=>{
            setLoader(false)

        },2000)
    }
}
export default geoLocation