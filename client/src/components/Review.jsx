import React from 'react'
import {useEffect,useState} from 'react'
import moment from 'moment';
import {FaThumbsUp} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'


export default function Review({review,onLike,onDelete}) {
    const {currentUser}=useSelector(state=>state.user)
    const [user,setUser]=useState({});
  const [showModal,setShowModal]=useState(false);
  const [reviewToDelete,setReviewToDelete]=useState();
  const navigate=useNavigate();


    useEffect(()=>{
        const getUser =async ()=>{
           try {
             const res=await fetch(`http://localhost:3000/api/user/${review.userId}`);
             const data=await res.json();
             console.log(data);
             if(res.ok){
                setUser(data);
                console.log(data);
            }
           } catch (error) {
            console.log(error.message);      
           }
        }
        getUser();
    },[review])

  

 
    // const handleDelete=async()=>{  
    //   // setShowModal(false);
    //   if(commentToDelete.parentId === comment._id)
    //     { 
    //       setShowModal(false);
    //     try {
    //     if(!currentUser){
    //       navigate('/sign-in');
    //       return;
    //     }
    //     const res=await fetch(`http://localhost:3000/api/comment/deleteComment/${commentToDelete._id}`,{
    //       method:'DELETE',
    //       credentials:'include',
    //     });
    //     if(res.ok){
    //       const data=await res.json();
    //       setReplies((prev) => prev.filter((reply) => reply._id !== commentToDelete._id)); 
    //       setNoOfReplies((prev) => prev - 1);
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
    
    // }

    // const handleLike =async(commentId)=>{
    //   try {
    //    if(!currentUser){
    //      navigate('/sign-in');
    //      return;
    //    }
    //    const res=await fetch(`http://localhost:3000/api/comment/likeComment/${commentId}`,{
    //      method:'PUT',
    //      credentials:'include', 
    //    });
    //    if(res.ok){
    //     const data=await res.json();
    //     setReplies(replies.map(reply=>
    //       reply._id === commentId ?{
    //         ...reply,
    //         likes:data.likes,
    //         numberOfLikes:data.numberOfLikes,
    //       }:reply
    //     ))
    //    }
    //   } catch (error) {
    //      console.log(error.message);
    //   }
    // }
   

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex shrink-0 mr-3'>
        <img src={user.profilePicture} alt={user.username} className='h-10 w-10 object-cover rounded-full bg-gray-200' referrerPolicy='no-referrer'/>
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}`:'anonymous user'}</span>
            <span className='text-gray-500 text-xs'>{moment(review.createdAt).fromNow()}</span>
        </div>

     
         <p className='text-gray-500 pb-2'>{review.content}</p>
        <div className='flex items-center gap-2 pt-2  '>
          <button type='button' onClick={()=>onLike(review._id)} className={`text-gray-400 hover:text-blue-500 cursor-pointer ${currentUser && review.likes.includes(currentUser._id) && '!text-blue-500'}`}>
            <FaThumbsUp className='text-sm'/>
          </button>
          <p className='text-gray-500 text-xs '>
            {
              review.numberOfLikes >0 && review.numberOfLikes + " "+ (review.numberOfLikes === 1 ? "like" : "likes")
            }
          </p>
            {
              currentUser && (currentUser._id === review.userId) && (
                <>
                <button
                  type='button' 
                  onClick={()=>{onDelete(review);
                  }}
                  className='text-gray-400 hover:text-red-500 cursor-pointer text-xs '>
                  Delete
                </button>
                </>
                
              )
            }
        
        </div>
     
       
        {showModal && <div className='bg-black/50 z-4 fixed top-0 left-0 w-full h-screen flex justify-center items-center text-md' onClick={()=>setShowModal(false)}>
                               <div className='bg-white p-5 rounded-md w-90 h-60 flex flex-col justify-center items-center 'onClick={(e)=>e.stopPropagation()}>
                                 <HiOutlineExclamationCircle className='text-gray-400 dark:text-gray-200 w-20 h-20'/>
                                 <div className='text-center text-xl'>Are you sure you want to delete this review?</div>
                                 <div className='flex justify-center gap-10 item-center w-full mt-5'> 
                                   <button className='bg-red-500 text-white rounded-sm  p-1 cursor-pointer' onClick={()=>handleDelete()}>Yes,I'm sure</button>
                                 <button className='bg-gray-100 text-black rounded-sm p-1 cursor-pointer' onClick={()=>setShowModal(false)}>No,cancel</button></div>
                                
                               </div>
                             </div>
                             }
      </div>
    </div>
  )
}
