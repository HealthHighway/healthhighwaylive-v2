
import RazorpayCheckout from 'react-native-razorpay';
import { serverConfig } from '../constants/server.constants';

export const processPayment = (price, currency, paymentTitle, name) => {

    return new Promise(async (resolve, reject) => {

        try {
            
            const options = {
                "amount": Number(price)*100 ,
                "currency": currency,
                "receipt": "Health Highway Private Limited",
                "payment_capture": 1
            }

            const response = await fetch("https://api.razorpay.com/v1/orders", {
               method : "POST",
               timeout : 5000,
               headers : {
                     "Authorization" : serverConfig.RZP_AUTH,
                     "Content-Type" : "application/json"
               },
               body : JSON.stringify(options)
            })

            const data = await response.json();
            console.log(data)

            const filerOptions = {
                description: paymentTitle,
                currency: currency,
                key: serverConfig.RZP_KEY,
                amount: data.amount ,
                name: 'Health Highway Private Limited',
                order_id : data.id,
                theme : { color: '#4ca9ee' },
                prefill: {
                  name
                }
            }

            RazorpayCheckout.open(filerOptions).then(async (data) => {
                resolve(data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })

        }catch(err){
            console.log(err)
            reject(err)
        }

    })
    
}