import Layout from "../core/Layout";

import {useState} from 'react';

import {Signin, authenticate, isAuthenticated} from '../auth/index'

import {Redirect} from 'react-router-dom';


function SignIn(){

    const [credentials, setCredentials] = useState({
        email : 'okochajay@gmail.com',
        password : '1999wxyZ',
        error : '',
        loading : false,
        redirectToReferrer : false
    });

    const {email, password, error, redirectToReferrer, loading} = credentials;
    const {user} = isAuthenticated()

    function handleChange(name){
        return function(event){
            setCredentials({...credentials, error : false, [name]: event.target.value});
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        setCredentials({...credentials, error: false, loading:true});
        Signin({email, password })
        .then((data) => {
            if (data.error){

                setCredentials({...credentials, error : data.error, loading: false});
    
            }
            else {

                authenticate(data, function(){

                    setCredentials({...credentials,  redirectToReferrer : true});
                }
                )
            }
        });   
    }

    function showError(){
        return (
            <div className="alert alert-danger mt-2 text-center" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );
    }

    function showLoading(){

        loading && (<div className='alert alert-info'><h2>Loading...</h2></div>);
    }

    function redirectUser(){

        if(redirectToReferrer){
           if (user && user.role === 1){
            return (<Redirect to='/admin/dashboard'></Redirect>);
           }
           else {
            return (<Redirect to='/user/dashboard'></Redirect>);
           }
        }
        if (isAuthenticated()){
            return (<Redirect to='/'></Redirect>);
        }
    }

    function signupform(){
        return (
            <div className='container bg-light p-5 mt-5 rounded'>
            <form >
                {/* <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" onChange={handleChange('name')} value={name} className="form-control"  aria-describedby="emailHelp"/>
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input  onChange={handleChange('email')} value={email} type="email" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input  onChange={handleChange('password')} value={password} type="password" className="form-control"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Login</button>
            </form>
            </div>
        );
    }
  
    return (
        <Layout title='Signin Page' className='container col-md-8 offset-md-2' description="User Signup">
            {showLoading()}
            {redirectUser()}
            {showError()}
            {signupform()}
       </Layout>
    );
}

export default SignIn;