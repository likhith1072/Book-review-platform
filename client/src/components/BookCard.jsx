import React from 'react'
import { Link } from 'react-router-dom'

export default function BookCard({book}) {
  return (
    <div className='group relative border h-[400px] overflow-hidden rounded-lg sm:w-[350px] w-[350px] border-teal-500 hover:boder-2 transition-all duration-300'>
       <Link to={`/book/${book.slug}`} >
           <img src={book.image} alt="book cover" className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20' />
       </Link>
       <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{book.title}</p>
        <span className='italic text-sm'>{book.category}</span>
        <Link to={`/book/${book.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'>Read article</Link>
       </div>
    </div>
  )
}
