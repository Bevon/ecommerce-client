import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getBraintreeClientToken, processPayment} from './ApiCore';
import Layout from './Layout';
import DropIn from 'braintree-web-drop-in-react'


export default function Checkout({ products }) {

    const [data, setData] = useState({
        success : false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    function getToken(userId, token){
        getBraintreeClientToken(userId, token)
        .then(function(response){
            if (response.err){
                setData({...data, error:response.err})
            }
            else{
                setData({...data, clientToken:response.clientToken})
            }
        })
       
    }
    useEffect(function(){
        getToken(userId, token)
    },[]);



    function getTotal() {
        return products.reduce(function (currentvalue, nextValue) {
            return currentvalue + nextValue.count * nextValue.price

        }, 0)
    }

    function showTotal(){
        return (
            <div className='container'>
                <h2 className='btn btn-success'> Your Total is : ${getTotal()}</h2>
            </div>
        )
    }

    function buy(){
        //send the nonce to your server
        // nonce = data.instance .requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(function (data){
            console.log(data);
            nonce = data.nonce;
            //once you have the nonce (card type,  card number), send the nonce as the paymentMethod
            //and total to be charged
            // console.log('send nonce and total to process : ', nonce, getTotal(products))
            const paymentData = {
                paymentMethodNonce:nonce,
                amount:getTotal(products)
            }
            processPayment(userId, token, paymentData)
            .then(function(response){
                // console.log(response)
                setData({...data, success:response.success})
            })
            .catch(function(error){
                console.log(error)
            })

        })
        .catch(function(error){
            // console.log('Dropin Error', error)
            return setData({...data, error:error.message})
        })

    }

    function showDropIn(){
        return (
            <div onBlur={()=>setData({...data, error:''})}>
                {
                    data.clientToken !== null && products.length > 0 ? (
                        <div>
                            <DropIn options={{authorization:data.clientToken}} 
                            onInstance={instance => (data.instance = instance)}/>
                            <button onClick={buy} className='btn btn-success mt-2 mb-5'>Pay Now</button>
                        </div>
                    ) : null
                }
            </div>
            
        )
    }
    function showSuccess(success){
        return (
            <div>
               <div className='alert alert-success text-center' style={{display : success ? '': 'none'}}>Payment Successful</div>
            </div>
        )
    }

    function showError(error){
        return (
            <div>
               <div className='alert alert-danger' style={{display : error ? '': 'none'}}>{error}</div>
            </div>
        )
    }

    function showCheckOut(){
        return (
            <div className='container'>
                {
                    isAuthenticated() ? <div>{showDropIn()}</div> : <Link to='/signin'><h2 className='btn btn-warning'>Sign in to Checkout</h2></Link>
                }
            </div>

        )
    }
    return (
        <Layout className='container' title='Checkout' description='Your Cart Summary'>
            {
                showTotal()
            }
            {
                showSuccess(data.success)
            }
            {
                showError(data.error)
            }
           
            {
                showCheckOut()
            }
        </Layout>
    )
}