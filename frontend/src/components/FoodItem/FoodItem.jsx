import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

function FoodItem({ item }) {

    // const [itemCount, setItemCount] = useState(0);
    const {cardItems, addToCard, removeFromCard,url} = useContext(StoreContext)
    // console.log(item._id);
    
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={url+'/images/'+item.image} alt="" />
                {!cardItems[item._id]
                    
                    ? <img className='add' onClick={()=>addToCard(item._id)} src={assets.add_icon_white} alt="" />
                    :<div className='food-item-counter'>
                            <img onClick={()=>removeFromCard(item._id)} src={assets.remove_icon_red} alt="" />
                            <p>{cardItems[item._id]}</p>
                            <img onClick={()=>addToCard(item._id)} src={assets.add_icon_green} alt="" />
                    </div> 


                }
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{item.name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{item.description}</p>
                <p className='food-item-price'>₹{item.price}</p>
            </div>
        </div>
    )
}

export default FoodItem