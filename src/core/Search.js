import { useEffect, useState } from "react";
import { getCategories, list } from "./ApiCore";
import Card from "./ProductCard";


export default function SearchBar(){

    const [data, setData] = useState({
        categories: [],
        results:[],
        search:'',
        searched:false,
        category:'',
    });

    const {categories, results, searched, search, category} = data;

    useEffect(function(){
        getCategories()
        .then(function(response){
            if (response.error){
                console.log(response.error)
            }
            setData({...data, categories:response});
        });
    }, [])

    function searchedData(){

        if (search){
            list({category:category, search:search || undefined })
            .then(function (response){
                if (response.error){
                    console.log(response.error);
                }
                else{
                    setData({...data, results: response, searched:true});
                }
            })
        }
    }

    function afterSearchMessage(searched, results){
        if (searched && results.length > 0){
            return (
                <h2 className='mb-2 mt-2'>{`Found ${results.length} Products`}</h2>
            )
        }
        if (searched && results.length < 1){
            return (
              <h2 className='mb-2 mt-2'>{`No Products Found`}</h2>
            )
        }
    }

    function productsFromSearch(results = []){
        return (
            <div className='row'>
                {
                    results.map(function (product, index){
                        return(
                            <div className='col-md-4 mb-2' key={index}>
                                <Card key={index} product={product}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
        
    function searchSubmit(event){
        event.preventDefault();
        searchedData() 
    }

    function handleChange(name){
        return function(event){
            setData({...data, [name]:event.target.value, searched:false});

        }
    }

    function searchForm(){
        return(
            <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>

            
        )
    }

    return (
        <div className='container p-2 rounded '>
            {searchForm()}
            {afterSearchMessage(searched, results)}
            <div className='container-fluid mt-2 '>
                {productsFromSearch(results)}
            </div>
        </div>
         
    )
}