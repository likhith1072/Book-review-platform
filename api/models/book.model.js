import mongoose from 'mongoose';

const bookSchema =new mongoose.Schema(
    {
      userId:{
        type:String,
        required:true,
      },
      description:{
        type:String,
        required:true,
      },
      title:{
        type:String,
        required:true,
        unique:true,
      },
      image:{
        type:String,
        default:'https://simplybuiltsites.com/wp-content/uploads/how-to-write-a-blog-post.png',
      },
      category:{
        type:String,
        default:'uncategorized',
      },
      slug:{
        type:String,
        required:true,
        unique:true,
      },

    },{timestamps:true}
);

const Book=mongoose.model('Post',postSchema);

export default Book;