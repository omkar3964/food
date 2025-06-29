import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import {toast} from 'react-toastify'
import axios from 'axios';
// import toast from 're'

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cardItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  
  const onChangeHandler = (event) => {
    // console.log(data)
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }
  const navigate = useNavigate()


  const  initPay = (order)=>{
    // console.log("order",order)
    const options = {
      key: "rzp_test_mTKJEwlgupCHLw",
      amount: order.amount,
      currency: order.currency,
      description: 'Food Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // console.log("response",response)
        try {
          const verifyData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.receipt, // This is your MongoDB order ID
          }

          const { data } = await axios.post(url+"/api/order/verify", verifyData , {headers:{token}} )
          if (data.success) {
            navigate('/myorders')
          }else{
            navigate('/cart')
          }
        } catch (error) {
          console.log("error",error)
          toast.error(error.message)
        }
      },
      modal: {
        ondismiss: () => {
          toast.info("Payment cancelled.");
          navigate('/cart');
        },
      },
      
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const placeOrder =async (event)=>{
    event.preventDefault()
    let orderItems = []
    food_list.map((item)=>{
      if(cardItems[item._id] > 0){
        let itemInfo = item
        itemInfo["quantity"] = cardItems[item._id] 
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:(totalAmount+ deliveryFee)
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}})
    // console.log(response.data)
    initPay(response.data.data)
  }



  const { totalAmount, deliveryFee } = getTotalCartAmount();

  useEffect(()=>{
    if(!token){
      toast.warning("Please login")
      navigate('/cart')
    }else if(totalAmount === 0 ){
      toast.warning("Select at least 1 item")
      navigate('/cart')
    }

  },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
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
              <b>₹{totalAmount + deliveryFee}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder