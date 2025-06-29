import { createContext, useContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
// import { Await } from "react-router-dom";
import axios from "axios";
// console.log(food_list)

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = import.meta.env.VITE_BACKEND_URL
    const admin_url = import.meta.env.VITE_ADMIN_URL

    const [food_list, setFoodList] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [cardItems, setCardItems] = useState({});


    const addToCard = async (itemId) => {
        if (!cardItems[itemId]) {
            setCardItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } })
        }
    }


    const removeFromCard = async (itemId) => {

        setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } })
        }
    }


    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } })
        setCardItems(response.data.data)
    }



    const fetchFoodList = async () => {
        const response = await axios.get(url + '/api/food/list')
        setFoodList(response.data.data)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (token) {
                await loadCartData(token)
            }
        }
        loadData()
    }, [])


    // useEffect(() => {
    //     console.log(cardItems)
    //     getTotalCartAmount()
    // }, [cardItems])

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cardItems) {
            if (cardItems[item]) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += cardItems[item] * itemInfo.price
            }
        }
        const deliveryFee = +(totalAmount * 0.03).toFixed(2); // 12% fee, rounded to 2 decimals
        return { totalAmount, deliveryFee };
    }

    const contextValue = {
        food_list, cardItems, setCardItems, addToCard, removeFromCard,
        getTotalCartAmount, url, token, setToken, admin_url
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;