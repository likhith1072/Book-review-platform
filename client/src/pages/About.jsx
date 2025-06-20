import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>About Book Review</h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>Welcome to Book Review This website was created as a personal project to share thoughts and ideas with the World about books that we love.</p>
            <p>On this website, you'll find books on different topics</p>
            <p>We encorage you to leave reviews on our books. You can like other people's reviews and rate the books. We believe that community of learners can help each other grow and improve. </p>
            <p>We hope you enjoy the books that we recommend. If you have any questions or suggestions for future posts, please feel free to reach out to us.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
