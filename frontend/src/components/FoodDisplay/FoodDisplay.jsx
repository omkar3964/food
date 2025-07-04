import React, { useContext } from 'react'
import './FoodDisplay.css'
import {StoreContext} from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx'

function FoodDisplay({category}) {
    const {food_list} = useContext(StoreContext)
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {
                    food_list.map((item, index)=>{
                        if(category ==="All" || category ===item.category)
                        return( <FoodItem  item={item} key={index}/> )
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay