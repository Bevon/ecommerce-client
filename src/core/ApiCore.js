import {API} from '../config'
import queryString from 'query-string';

export async function getProducts(sortBy){
    return await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=8`, {
        method: 'GET'
    })
    .then((response) => {
        return response.json()
    })
    .catch((error) => {
        console.log(error)
    });
}

export async function getCategories(){
    return await fetch(`${API}/categories`, {
        method : 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.log(error);
    })
}

export async function getFilteredProducts(skip, limit, filters){

    const data = {
        skip, limit, filters
    }
        
    return await fetch(`${API}/products/by/search`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Accept: 'application/json',
        },
        body : JSON.stringify(data)
    }
    ).then((response) => {

        return  response.json()
    
    }).catch((error) => {
        console.log(error)
    });
}

export async function list(params){
    const query = queryString.stringify(params)
    return await fetch(`${API}/products/search?${query}`, {
        method: 'GET'
    })
    .then((response) => {
        return response.json()
    })
    .catch((error) => {
        console.log(error)
    });
}

export async function read(productId){
    return await fetch(`${API}/product/${productId}`, {
        method:'GET'
    })
    .then(function(response){
        return response.json();
    })
    .catch(function(error){
        console.log(error)
    });
}

export async function listRelated(productId){
    return await fetch(`${API}/products/related/${productId}`, {
        method:'GET'
    })
    .then(function(response){
        return response.json();
    })
    .catch(function(error){
        console.log(error)
    });
}

export async function getBraintreeClientToken(userId, token){
    return await fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers:{
           Accept:'application/json',
           "Content-Type": 'application/json',
           Authorization: `Bearer ${token}`
        }
    })
    .then(response =>  response.json())
    .catch(err => console.log(err))
    
}

export async function processPayment(userId, token, paymentData){
    return await fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers:{
           Accept:'application/json',
           "Content-Type": 'application/json',
           Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    })
    .then(response =>  {return response.json()})
    .catch(err => console.log(err)) 
}

