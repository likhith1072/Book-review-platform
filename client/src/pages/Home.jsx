import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import BookCard from '../components/BookCard'

export default function Home() {
  const [books, setBooks]=useState([]);

  useEffect(()=>{
    const fetchBooks =async()=>{
      const res=await fetch('http://localhost:3000/api/book/getbooks');
      const data=await res.json();
      setBooks(data.books);
    }
    fetchBooks();
  },[])

  return (
    <div>
        <div className='flex flex-col gap-6 p-28 px-5 max-w-6xl mx-auto'>
          <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Book Review</h1>
          <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find reviews of Different books .</p>
          <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline hover:text-teal-600 flex items-center gap-1'><span>View all books </span>
          <HiArrowNarrowRight/>
          </Link>
        </div>
        
        
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          {books && books.length>0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl lg:text-3xl font-semibold text-center'>Recent Books</h2>
              <div className='flex flex-wrap items-center justify-center gap-4'>
                {books.map((book)=>(
                  <BookCard key={book._id} book={book}/>
                ))}
              </div>
              <Link to='/search' className='text-sm sm:text-lg text-teal-500 font-bold hover:underline hover:text-teal-600 flex justify-center items-center gap-1 '><span>View all books </span>
             <HiArrowNarrowRight/>
             </Link>
            </div>
          )}
        </div>
    </div>
  )
}

