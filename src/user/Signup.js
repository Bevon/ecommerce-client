import Layout from "../core/Layout";

import {useState} from 'react';

import {Signup} from '../auth/index'

import {Link} from 'react-router-dom';

function SignUp(){

    const [credentials, setCredentials] = useState({
        name : '',
        email : '',
        password : '',
        error : '',
        success : false
    });

    const {name, email, password, error, success} = credentials;

    function handleChange(name){
        return function(event){
            setCredentials({...credentials, error : false, [name]: event.target.value});
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        setCredentials({...credentials, error: false, success:false});
        Signup({name, email, password })
        .then((data) => {
            if (data.err){

                setCredentials({...credentials, error : data.err, success: false});
    
            }
            else {

                setCredentials({...credentials, name : '', email : '', password : '',  error : '', success : true});
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

    function showSuccess(){

        return (
            <div className="alert alert-success mt-2 text-center" style={{ display: success ? '' : 'none' }}>
                New account is created. <Link to='/signin'> Please Signin</Link>
            </div>
        )
    }

    function signupform(){
        return (
            <div className='container  bg-light p-5 mt-5 rounded'>
            <form >
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" onChange={handleChange('name')} value={name} className="form-control"  aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input  onChange={handleChange('email')} value={email} type="email" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input  onChange={handleChange('password')} value={password} type="password" className="form-control"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
            </div>
        );
    }
  
    return (
        <Layout title='Signup Page' className='container col-md-8 offset-md-2' description="User Signup">
            {showSuccess()}
            {showError()}
            {signupform()}
       </Layout>
    );
}

export default SignUp;