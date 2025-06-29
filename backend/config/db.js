import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://omalbhare:FoodApp3964@cluster0.zevuf.mongodb.net/foodapp')
    .then(()=>{
        console.log("DataBase connect successfully")
    }).catch((error)=>{
        console.log('Error : ', error)
    })
}