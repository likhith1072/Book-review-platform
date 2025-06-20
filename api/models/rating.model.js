import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    bookId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min: 1,
        max: 10,
    },
  },
    {timestamps:true}

);

const Rating = mongoose.model("Rating",ratingSchema);

export default Rating;