import {useState } from "react"

export default function RadioBox({prices, handleFilters}){

    const [value, setValue] = useState(0);

    function handleRadioInput(event){
        handleFilters(event.target.value);
        setValue(event.target.value);
    }

    return (
        prices.map(function(price, index){
            return (
                <div className="form-check" key={index}>
                    <input onChange={handleRadioInput} type='radio' name={price} value={`${price._id}`}   className="form-check-input"/>
                    <label className="form-check-label mx-2" htmlFor="flexRadioDefault1" >
                       {price.name}
                    </label>
                </div>
            )
        })
    )
}