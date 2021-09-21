import { useEffect, useState } from "react";
import { getProducts, list } from "./ApiCore";
import Layout from "./Layout";
import Card from "./ProductCard";
import SearchBar from "./Search";

export default function Home(){

    const [ProductsBySell, setProductsBySell] = useState([]);
    const [ProductsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    function loadProductsBySell(){
        getProducts('sold')
        .then(function (response){
            if (response.error){
                setError(response.error);
            }
            else {
                setProductsBySell(response.products);
            }
        });
    }

    function loadProductsByArrival(){
        getProducts('createdAt')
        .then(function (response){
            if (response.error){
                setError(response.error);
            }
            else{
                setProductsByArrival(response.products);
            }
        });
    }

    useEffect(function(){
        loadProductsBySell()
        loadProductsByArrival()
    }, [])

    function showProductsBySell(){
        return (
            <div className='row'>
                <h2 className='mt-4 mb-4 ' ><b>Best Selling Books</b></h2>
                {
                    ProductsBySell.map(function (product, index){
                        return (
                                <div className='col-md-3 mb-2' key={index}>
                                    <Card key={index} product={product}/>
                                </div>
                            )
                        })
                }
           </div>
        )
    }

    function showProductsByArrival(){
        return (
            <div className='row'>
                <h2 className='mt-2 mb-4 p-4 jumbotron-2 bg-secondary'><b>New Arrivals on Our Shelves</b></h2>
            
                {
                    ProductsByArrival.map(function (product, index){
                        return (
                            <div className='col-md-3 mb-2' key={index}>
                                <Card key={index} product={product}/>
                            </div>
                        )
                    })
                }
            </div>

        )
    }

    return (
       <Layout title='Home Page' description="Node React E-Commerce Application" className='container-fluid'>
           {SearchBar()}
           {showProductsBySell()}
          
           {showProductsByArrival()}
            
       </Layout>
    );
}
