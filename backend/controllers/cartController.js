import userModel from '../models/userModel.js'

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById({ _id: req.body.userId })
        let cartData = userData.cartData

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        return res.json({ success: true, message: "Added to cart" })

    } catch (error) {
        return res.json({ success: false, message: `Error: ${error.message}` })
    }
}

// remove items to user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById({ _id: req.body.userId })
        let cartData = userData.cartData

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }   

        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        return res.json({ success: true, message: "Removed from cart" })

    } catch (error) {
        return res.json({ success: false, message: `Error: ${error.message}` })
    }

}


// fetchUseerCartData items to user cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById({ _id: req.body.userId })
        let cartData = userData.cartData

        return res.json({ success: true, data:cartData})
    } catch (error) {
        return res.json({ success: false, message: `Error: ${error.message}` })
    } 
}


export { addToCart, removeFromCart, getCart }