import Rating from "../models/rating.model.js";

export const createRating = async (req, res) => {
    try {
        const { bookId, userId ,rating } = req.body;
        
        if(userId !== req.user.id){
          return next(errorHandler(403,"You are not allowed to rate this book"));
        }
            
        const newRating = new Rating({
        bookId,
        userId,
        rating,
        });
        await newRating.save();
       
        res.status(200).json(newRating);
    } catch (error) {
        next(error);
    }
}


export const getBookRatings=async( req,res,next)=>{
    try{
        const ratings=await Rating.find({bookId:req.params.bookId}).sort({createdAt:-1,});  
        res.status(200).json(ratings);
    } catch(error){
        next(error);
    }
}

