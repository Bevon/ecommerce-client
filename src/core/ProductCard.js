import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import {formatDistance,subDays } from 'date-fns'
import { addItem, updateItem, removeItem } from "./CartHelpers";
import { useState } from "react";



export default function Card({product, setRun = f => f, run = undefined, showRemoveButton= false, cartUpdate = false, showViewProductButton=true, showAddToCartButton=true}){

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    function ViewProductButton(showViewProductButton){

        return showViewProductButton && (
            <Link className='d-inline' to={`/product/${product._id}`}>
                <button className='btn btn-outline-warning mt-2 mx-2'>

                    View Product
                </button>
            </Link>
        )
    }
    function removeProductButton(showRemoveButton){
        return showRemoveButton && (
            <button onClick={() => {removeItem(product._id); setRun(!run); }} className='btn btn-outline-primary mt-2 mx-2'>
                Remove from Cart
            </button>
        )
    }
    
    function addtoCart(){
        addItem(product, function(){
            return setRedirect(true);
        })
    }
    function handleChange(productId){
        return function(event){
            setRun(!run);
            setCount(event.target.value < 1 ? 1 : event.target.value);
            if (event.target.value >= 1){
                updateItem(productId, event.target.value)
            }
        }
    }

    function cartUpdateOptions(cartUpdate){

        return cartUpdate  && (
            
            <div className="input-group mb-3 mt-2">
                <span className="input-group-text" id="basic-addon3">Adjust Quantity</span>
                <input onChange={handleChange(product._id)} type="number" value={count} className="form-control"  aria-describedby="basic-addon3"/>
            </div>
        )
    }


    
    function shouldRedirect(redirect){
        if (redirect){
            <Redirect to='/cart'/>
        }
    }

    function addToCartButton(showAddToCartButton){
        return showAddToCartButton && (
            <button onClick={addtoCart} className='btn btn-outline-primary mt-2 mx-2'>
                Add to Cart
            </button>
        )
    }

    function showProductQuantity(quantity){
        return (
            quantity > 0 ? <span>
                <button className='badge rounded-pill bg-primary p-2'> In Stock </button>
            </span> : <span>
                <button className='badge badge-danger badge-pill'> Out of Stock </button>
            </span>
        )
    }

    return (
            <div className='card'>
                <div className='card-header name'>{product.name}</div>
                {shouldRedirect(redirect)}
                <div className='card-body'>
                    <ShowImage item={product} url='product' />
                    <p className='lead mt-2 card-text'>{product.description && product.description.substring(0, 100) + `...`}</p>
                    <p className='black-5 p-2 rounded'><b> $ {product.price}</b></p>
                    <p className='black-5 p-3 rounded'>Category : {product.category && product.category.name}</p>
                    <p  className='black-5 p-2 rounded' >Added {formatDistance(subDays(new Date(product.createdAt), 0), new Date(), {addSuffix:true})} </p>
                    {
                        showProductQuantity(product.quantity)
                    }
                    <br/> 
                    {
                        ViewProductButton(showViewProductButton)
                    }
                    <br/>
                    
                    {
                       addToCartButton(showAddToCartButton)
                    }
                    {
                        removeProductButton(showRemoveButton)
                    }
                    {
                        cartUpdateOptions(cartUpdate)
                    }
                    
                </div>
            </div>
    )
}