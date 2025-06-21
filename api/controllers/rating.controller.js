import Rating from "../models/rating.model.js";
import { errorHandler } from "../utils/error.js";

export const createRating = async (req, res, next) => {
    try {
        const { bookId, userId, rating } = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to rate this Book"));
        }

        // Check if rating already exists
        const existingRating = await Rating.findOne({ bookId, userId });

        let savedRating;

        if (existingRating) {
            // Update existing rating
            existingRating.rating = rating;
            savedRating = await existingRating.save();
        } else {
            // Create new rating
            const newRating = new Rating({
                bookId,
                userId,
                rating,
            });
            savedRating = await newRating.save();
        }

        res.status(200).json(savedRating);
    } catch (error) {
        next(error);
    }
};


export const getBookRatings=async( req,res,next)=>{
    try{
        const ratings=await Rating.find({bookId:req.params.bookId}).sort({createdAt:-1,});  
        res.status(200).json(ratings);
    } catch(error){
        next(error);
    }
}


