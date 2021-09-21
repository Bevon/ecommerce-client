import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from './CartHelpers';
import Checkout from './Checkout';
import Layout from './Layout';
import Card from './ProductCard';





export default function Cart() {

    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(function(){
        setItems(getCart())
    }, [run]);

    function showItems(){
        return (
            <div className='col-md-6'>
                <h2>Your Cart has a total of {items.length} items</h2>
                <hr/>
                <div className='row'>
                    {
                        items.map(function(product, index){
                            return (
                                <div className='mb-3 col-md-4' key={index}>
                                    <Card key={index} 
                                    product={product} 
                                    showRemoveButton={true} 
                                    cartUpdate={true} 
                                    showViewProductButton={true} 
                                    showAddToCartButton={false}
                                    setRun={setRun}
                                    run={run}/>
                                </div>
                            )
                        })
                    }
                </div>
                        
            </div>
        )
    }

    function noItemsInCartMessage(){
        return (
            <div className='container col-md-6'>
                <div className="bg-info clearfix">
                <button type="button" className="btn btn-secondary float-start">Your Cart is Empty</button>
                <h2><Link className='link-info btn btn-secondary float-end' to='/shop'>Continue shopping</Link></h2>
                </div>     
            </div>
        )
    }

    return (
        <Layout title='Shopping Cart'
        description='Manage your cart items. Add remove checkout or continue shopping.'
        className='container-fluid'
        >
           <div className='row'>
                {
                    items.length > 0 ? showItems() : noItemsInCartMessage()
                }
                <div className='col-md-6'>

                    {
                        <Checkout  products={items}/>
                    }



                </div>

           </div>
        </Layout>       
        
    )
}
