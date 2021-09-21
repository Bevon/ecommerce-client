import { useEffect, useState } from "react";
import { listRelated, read } from "./ApiCore";
import Layout from "./Layout";
import Card from "./ProductCard";

export default function ViewProduct(props){

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    function loadProduct(productId){
        read(productId).then(function (response){
            if (response.error){
                setError(response.error);
            }else{
                setProduct(response);
                listRelated(response._id)
                .then(function(data){
                    if (data.error){
                        setError(data.error)
                    }
                    else{
                        setRelatedProduct(data.relatedProducts)
                    }
                })
            }
        })
    }

    useEffect(function(){
        const productId = props.match.params.productId
        loadProduct(productId);
    }, [props])
    
    return (
        <Layout className='container-fluid' description={product && product.description && product.description.substring(0, 100) + '...'} title={product.name}>
            <div className='row'>
                <div className='col-md-7'>
                    {product && product.description && <Card  product={product} showViewProductButton={false}/>}   
                </div>
                <div className='col-md-5'>
                    <div className='row mt-5'>
                        <h2>Related Products</h2>
                        {
                            relatedProduct.map(function(product, index){
                                return (
                                    <div className='col-md- mb-4'key={index}>
                                        <Card  key={index} product={product}/>
                                    </div>  
                                )
                            })
                        }
                    </div>

                </div>
                    
                    
            </div>
           
        </Layout>
    )
}
