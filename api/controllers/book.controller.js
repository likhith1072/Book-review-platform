import { errorHandler } from '../utils/error.js'
import Book from '../models/book.model.js';

export const uploadbook = async(req,res,next) => {
 
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post'));
    }
    if(!req.body.title || !req.body.description){
        return next(errorHandler(400,'Please provide all required fields'))
    }
    const slug =req.body.title.split(' ').join('_').toLowerCase().replace(/[^a-zA-Z0-9_-]/g,'');
    const newBook =new Book({
      ...req.body, //in body title and description is already there so with same names title and description will be saved here also
      slug,
      userId:req.user.id,
    });
    try{
        const savedBook=await newBook.save();
        res.status(201).json(savedBook);
    } catch(error){
        next(error);
    }
};


export const getbooks = async(req,res,next) => {
    try{
      const startIndex=parseInt(req.query.startIndex) || 0;
      const limit=parseInt(req.query.limit) || 9;
      const sortDirection=req.query.order === 'asc' ? 1 : -1;
      const books=await Book.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.category && {category:req.query.category}),
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.bookId && {_id:req.query.bookId}),
        ...(req.query.searchTerm && {
            $or:[
                {title:{ $regex:req.query.searchTerm,$options:'i'}},
                {description:{ $regex:req.query.searchTerm,$options:'i'}},
            ],
        }),
      }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);
     
     const totalBooks=await Book.countDocuments();
     const now = new Date();
     
     const oneMonthAgo =new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate(),
     );

     const lastMonthBooks=await Book.countDocuments({
        createdAt:{$gte:oneMonthAgo},
     });

     res.status(200).json(
    {
        books,
        totalBooks,
        lastMonthBooks,
    }
     )

    } catch(error){
        next(error);
    }
}

export const deletebook = async(req,res,next) => {
  
    try{
        const book=await Book.findById(req.params.bookId);       
    
        if (!book) {
            return next(errorHandler(404, 'Book not found'));
          }
          if(!req.user.isAdmin || req.user.id !== req.params.userId || req.user.id !== book.userId){
            return next(errorHandler(403,'You are not allowed to delete this book'));
        }
    } catch(error){
        return next(errorHandler(404,'Book not found'));
    }
    
    try{
        await Book.findByIdAndDelete(req.params.bookId);
        res.status(200).json({message:'Book deleted successfully'});
    } catch(error){
        next(error);
    }
}


export const updatebook = async(req,res,next) => {
   if(!req.user.isAdmin || req.user.id !== req.params.userId){
     return next(errorHandler(403,'You are not allowed to update this book'))}
    try{
        console.log(req.body.description);
        const updatedBook=await Book.findByIdAndUpdate(
            req.params.bookId,
            {
                $set:{
                    title:req.body.title,
                    description:req.body.description,
                    category:req.body.category,
                    image:req.body.image,
                    slug:req.body.title.split(' ').join('_').toLowerCase().replace(/[^a-zA-Z0-9_-]/g,''),

                }
            },{new:true}  
        )
       res.status(200).json(updatedBook);
    } catch(error){
        next(error);
    }
};