import {API} from '../config'

export  async function Signup(user){
        
    return await fetch(`${API}/signup`, {
        method : 'POST',
        headers : {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(user)
    }
    ).then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.log(error);
    });
}

export async function Signin(user){
        
    return await fetch(`${API}/signin`, {
        method : 'POST',
        headers : {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(user)
    }
    ).then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.log(error);
    });
}

export function authenticate(data, callback){

    if (typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        callback();
    }
}

export async function signout(callback){

    if (typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        callback();
        return await fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then(function(response){
            console.log('signout', response)
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

export function isAuthenticated(){

    if (typeof window == 'undefined'){

        return false;
    }
    if (localStorage.getItem('jwt')){

        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {

        return false;
    }
}
