import Layout from "../core/Layout";
import {useState, useEffect} from 'react'
import { getCategories, getFilteredProducts } from "./ApiCore";
import CheckBox from "./CheckBox";
import { Prices } from "./FixedPrices";
import RadioBox from "./RadioBox";
import Card from './ProductCard'




export default function Shop(){

    const [categories, setCategories] = useState([]);
    const [error , setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters : {category:[], price:[]}
    })
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [resultsFromFilter, setResultsFromFilter] = useState([]);


    useEffect(function(){
        getCategories()
        .then(function (response){
            if (response.error){
                setError(response.error);
            }
            else{
                setCategories(response);
            }
        })
        loadFilteredResults(myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function loadFilteredResults(filteredResults){

        getFilteredProducts(skip, limit, filteredResults)
        .then(function(response){
            if (response.error){
                setError(response.error);
            }
            else{
                setResultsFromFilter(response.data);
                setSize(response.size);
                setSkip(0);
            }
        });
    }
    function loadMoreFilteredResults(){
        let toSkip = skip + limit

        getFilteredProducts(skip, limit, myFilters.filters)
        .then(function(response){
            if (response.error){
                setError(response.error);
            }
            else{
                setResultsFromFilter([ ...resultsFromFilter, ...response.data,]);
                setSize(response.size);
                setSkip(toSkip);
            }
        });
    }


    function handleFilters(filters, filterBy){
        // console.log('SHOP',filters, filterBy);
        const newMyFilter = {...myFilters}
        newMyFilter.filters[filterBy] = filters;

        if (filterBy ==='price'){
            let priceValues = handlePrice(filters);
            newMyFilter.filters[filterBy] = priceValues; 
        
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newMyFilter);
    }

    function handlePrice(value){
        const data = Prices;
        let array = []
        for (let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array;
    }

    function loadMoreButton(){
        return (
            size && size >= limit && (
                <button onClick={loadMoreFilteredResults} className='btn btn-secondary mb-4'>Load More</button>
            )
        )
    }
 
    return (
        <Layout title='Shopping Page' description="Search for a book of your choice" className='container-fluid'>
            <div className='row'>
                <div className='col-md-4'>
                <h2>Filter By category</h2>
                   <ul>
                       <CheckBox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}/>
                   </ul>
                <h2>Filter By Price Range</h2>
                    <ul>
                        <RadioBox prices={Prices} handleFilters={filters => handleFilters(filters, 'price')}/>
                    </ul>
                </div>
                <div className='col-md-8'>
                    <div className='row'>
                    <h2 className='mt-2 mb-4 p-4 jumbotron-2 rounded bg-secondary'><b>Products</b></h2>
                        {
                            resultsFromFilter.map(function (product, index){
                                return (
                                    <div className='col-md-4 mb-2' key={index}>
                                        <Card key={index} product={product}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {loadMoreButton()}
                </div>
            </div>
       </Layout>
    )
}