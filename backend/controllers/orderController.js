import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'
import crypto from 'crypto'
import { log } from "console";



// razorpay credentials
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
// placing user order for frntend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })


        const options = {
            amount: Math.round(req.body.amount * 100),
            currency: "INR",
            receipt: newOrder._id,
        }
        // console.log(options)
        // creation of an order
        const order = await razorpayInstance.orders.create(options)
        return res.json({ success: true, data: order })

    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }

}

const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET

        const generated_signature = crypto.createHmac("sha256", secret).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex")

        if(generated_signature === razorpay_signature){
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            return res.json({ success: true, message: "Payment Verified Securely" })
        }else{
            await orderModel.findByIdAndDelete(orderId, { payment: true })
            return res.status(400).json({ success: false, message: "Signature mismatch" })
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: error.message });
    }
}

const userOrders = async(req, res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        return res.json({success:true, data:orders})
    } catch (error) {
        console.log("Error : ", error)
        return res.json({success:false, message:error.message})
    }
}

const listOrders = async(req, res)=>{
    try {
        const orders = await orderModel.find({})
        return res.json({success:true, data:orders})
    } catch (error) {
        return res.json({success:false, message:`Error : ${error.message}`})
    }

}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        return res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:`Error : ${error.message}`})
    }
}

export { placeOrder, verifyOrder, userOrders ,listOrders, updateStatus }