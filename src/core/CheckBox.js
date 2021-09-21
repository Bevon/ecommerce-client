import { useEffect, useState } from "react";

export default function CheckBox({categories, handleFilters}){

    const [checked, setChecked] = useState([]);

    function handleToggle(category){
        return function(){
            //return the first index or -1
            const currentCategoryId = checked.indexOf(category);
            const newlyCheckedcategoryId = [...checked];
            //if the currently checked was not in the checked state then push array
            //if not pull
            if (currentCategoryId === -1){

                newlyCheckedcategoryId.push(category);
                
            }
            else{

                newlyCheckedcategoryId.splice(currentCategoryId, 1);

            }
            setChecked(newlyCheckedcategoryId);
            handleFilters(newlyCheckedcategoryId);
        }
    }

    return (
        categories.map(function (category, index) {
            return (

                <li key={index} className='list-unstyled'>
                    <input onChange={handleToggle(category._id)} type='checkbox' className='form-check-input'/>
                    <label className='form-check-label mx-2'> {category.name} </label>
                </li>
            )
        })

    )
}