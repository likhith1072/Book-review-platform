import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
    try {
        const { content, bookId, userId } = req.body;
        
        if(userId !== req.user.id){
          return next(errorHandler(403,"You are not allowed to create this comment"));
        }
            
        const newReview = await Review({
        content,
        bookId,
        userId,
        });
        await newReview.save();
       
        res.status(200).json(newReview);
    } catch (error) {
        next(error);
    }
}


export const getBookReviews=async( req,res,next)=>{
    try{
        const reviews=await Review.find({bookId:req.params.bookId}).sort({createdAt:-1,});  
        res.status(200).json(reviews);
    } catch(error){
        next(error);
    }
}

export const likeReview=async(req,res,next)=>{
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return next(errorHandler(404, "Review not found"));
        }
        const userIndex= review.likes.indexOf(req.user.id);
        if(userIndex===-1){
        review.numberOfLikes+=1;
        review.likes.push(req.user.id);
        }
        else{
        review.numberOfLikes-=1;
        review.likes.splice(userIndex,1);
        }
        await review.save();
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
}


 export const deleteReview=async(req,res,next)=>{
    try {
        const review =await Review.findById(req.params.reviewId);
        if(!review){
            return next(errorHandler(404,"Review not found"));
        }
        if( review.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403,"You are not allowed to delete this review"));
        }

      await Review.findByIdAndDelete(req.params.reviewId);
        
       res.status(200).json("Review has been deleted successfully");
    } catch (error) {
        next(error);
    }
        
}

