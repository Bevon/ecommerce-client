import {isAuthenticated } from "../auth/index";
import {CreateCategory} from './adminAPICalls'
import Layout from "../core/Layout";
import {useState} from 'react'
import { Link } from "react-router-dom";

export default function AddCategory(){
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // Desctructure to get user and token from localstorage for communication with Backend API

    const {user, token} = isAuthenticated();

    function submitHandler(e){
        e.preventDefault();
        setError('');
        setSuccess(false);
        //create a category
        CreateCategory(user._id, token, {name})
        .then((data) => {
            if (data.err){
                setError(data.err);
            }else {
                setError('');
                setSuccess(true);
                console.log(user._id);
            }
        }).catch((err) => {
            console.log(err)
        })
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
                {`${name} has been created successfully`}
            </div>
        );
    }

    function backButton(){
        return (
            <div className='mt-4'>
                <Link to='/admin/dashboard' className='text-warning'>Go to Dashboard</Link>
            </div>
        );
    }

    function handleChange(event){
        setError('');
        setName(event.target.value);
    }

    function AddCategoryForm(){
        return (
            <form onSubmit={submitHandler} className='p-4 bg-light rounded'>
                <div className='form-group'>
                    <label className='text-muted mb-1'>Category Name</label>
                    <input className='form-control' type='text' autoFocus value={name} onChange={handleChange} required/>
                </div>
                <button className='btn btn-outline-primary mt-2 text-center'>Create a category</button>
            </form>
        );
    }

    return (

        <Layout title='Create a new Category' description={`Howdy, ${user.name}, create a new product category`} className='container mt-5'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showSuccess()}
                    {showError()}
                    {AddCategoryForm()}
                    {backButton()}
                </div>
            </div>
        </Layout>
    );

}