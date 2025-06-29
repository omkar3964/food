import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    let image_filename = `${req.file.filename}`
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save()
        return res.json({success:true, message:"Food added"})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error})
    }


}

//all food list 
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({})
        return res.json({success:true, data:foods})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error})
    }
}
// remove food item
const removeFood = async(req,res)=>{
    try {
        let id = req.body.id
        console.log(id)
        const foods = await foodModel.findById(id)
        fs.unlink(`uploads/${foods.image}`, ()=>{})

        await foodModel.findByIdAndDelete(id)
        return res.json({success:true, data:foods})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error})
    }
}

export { addFood ,listFood, removeFood}