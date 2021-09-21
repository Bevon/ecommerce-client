import { isAuthenticated } from "../auth/index";
import Layout from "../core/Layout";
import {useState, useEffect} from 'react'
import { createProduct, getCategories } from "./adminAPICalls";

export default function CreateProduct(){

    const {user, token} = isAuthenticated();

    const [productDetails, setProductDetails] = useState({
        name : '',
        price : '',
        description : '',
        quantity : '',
        categories : [],
        category : '',
        shipping : '',
        photo : '',
        loading : false,
        error : '',
        createdProduct : '',
        redirectToProfile : false,
        formData : ''
    });

    const {
        name, 
        price, 
        description,
        quantity, 
        categories,
        category,
        shipping, 
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
        } = productDetails;

        useEffect(function init(){
            getCategories().then((data) => {
                if (data.error){
                    return setProductDetails({...productDetails, error : data.error});
                }
                else {
                   return  setProductDetails({...productDetails, categories:data, formData : new FormData()});
                }
            })
        
        }, [])

          /**Handle event on input change on our form */

        function handleChange(name){

            return function(event){
                const value = name === 'photo' ? event.target.files[0] : event.target.value;
                formData.set(name, value);
                setProductDetails({...productDetails, [name] : value});
            }
        }

        function handleFormSubmit(event){
            event.preventDefault();
            setProductDetails({...productDetails, error: '', loading: true});
            createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {

                    setProductDetails({...productDetails, error : data.error, loading:false})

                }
                else{

                    setProductDetails({...productDetails,
                        name: '',
                        price : '', 
                        description: '',
                        quantity: '', 
                        categories : categories,
                        category:'',
                        shipping: '', 
                        loading: true,
                        error : '',
                        photo:'',
                        createdProduct: data.name,
                        redirectToProfile : true,
                        formData : new FormData()
                    })
                    console.log(createdProduct)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }

        function showLoading(){
            loading &&  (
                <div className="alert alert-success mt-2 text-center">
                   <h2>loading.....</h2>
                </div>
            )
        }

        function showSuccess(){
            return (
                <div className="alert alert-success mt-2 text-center" style={{display : createdProduct ? '' : 'none'}}>
                {`${createdProduct} has been created successfully`}
                </div>
            );
            
        }

        function showError(){
            return (
                <div className="alert alert-danger mt-2 text-center" style={{ display: error ? '' : 'none' }}>
                    {error}
                </div>
            );
            
        }
    
    /**Create a new product form */

    function createProductForm(){

        return (
            <form  className='bg-light p-4 mt-5 mb-5' onSubmit={handleFormSubmit}>
                <h4>Post Photo</h4>
                <div className='mb-3'>
                    <label className='btn btn-primary'>
                        <input onChange={handleChange('photo')} className='form-control mb-1' type='file' name='photo' accept='image/*' />
                    </label>
                </div>
                <div className='form-group'>
                    <label className='text-muted mb-1'>Product Name</label>
                    <input onChange={handleChange('name')} className='form-control mb-1' type='text' value={name} />
                    <label className='text-muted mb-1' required>Description</label>
                    <textarea onChange={handleChange('description')} className='form-control mb-1' rows='3' value={description}  />
                    <label className='text-muted mb-1'>Price</label>
                    <input onChange={handleChange('price')} className='form-control mb-1' type='number' value={price} />
                    <label className='text-muted mb-1'>Shipping</label>
                    <select onChange={handleChange('shipping')} className='form-select mb-1' >
                        <option>Please Select</option>
                        <option value='0'>No</option>
                        <option value='1'>Yes</option>
                    </select>
                    <label className='text-muted mb-1'>Quantity</label>
                    <input onChange={handleChange('quantity')} className='form-control mb-1' type='number' value={quantity} />
                    <label className='text-muted mb-1'>Category</label>
                    <select onChange={handleChange('category')} className='form-select mb-1' >
                        <option>Select Category</option>
                        {categories && categories.map(function(category, index){
                            return(
                                <option value={category._id} key={index}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button className='btn btn-outline-primary mt-1'>Create Product</button>
            </form>
        );
    }

    return (
        <Layout className='container' title='Add a new product' description={`Howdy, ${user.name}, you're here to create a new product`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2 '>
                    {showLoading()}
                    {showError()}
                    {showSuccess()}     
                    {createProductForm()}
                </div>
            </div>
        </Layout>
    );
};