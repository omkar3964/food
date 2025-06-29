import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useNavigate } from 'react-router-dom';
// console.log(StoreContext)
function Cart() {

  const { food_list, cardItems, removeFromCard ,getTotalCartAmount, url} = useContext(StoreContext)
  const { totalAmount, deliveryFee } = getTotalCartAmount();


  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cardItems[item._id] > 0) {
            return (

              <div key={index}>
                <div className='cart-item-title cart-items-item'>
                  <img src={url+'/images/'+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cardItems[item._id]}</p>
                  <p>₹{item.price * cardItems[item._id]}</p>
                  <p onClick={() => removeFromCard(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })
        }
      </div>
      <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
                  <div className="cart-total-details">
                      <p>Subtotal</p>
                      <p>₹{totalAmount}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                      <p>Delivary Fee& charges(3%)</p>
                      <p>₹{deliveryFee}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                        <b>Total</b>
                        <b>₹{totalAmount+deliveryFee}</b>
                  </div>
            </div>
                  <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
              <div>
                <p>If you have promo code, Enter it here </p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder='promo code'/>
                  <button>Submit</button>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Cart