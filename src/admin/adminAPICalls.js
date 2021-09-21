import {API} from '../config'

export async function CreateCategory(userId, token, category){
        
    return await fetch(`${API}/category/create/${userId}`, {
        method : 'POST',
        headers : {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    }
    ).then((response) => {
        
        return response.json();
        
    })
}

export async function createProduct(userId, token, product){
        
    return await fetch(`${API}/product/create/${userId}`, {
        method : 'POST',
        headers : {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : product
    }
    ).then((response) => {

        return  response.json()
    
    }).catch((error) => {
        console.log(error)
    })
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