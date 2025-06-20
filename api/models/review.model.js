import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    bookId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    likes:{
        type:Array,
        default:[],
    },
    numberOfLikes:{
        type:Number,
        default:0,
    },
  },
    {timestamps:true}

);

const Review = mongoose.model("Review",reviewSchema);

export default Review;