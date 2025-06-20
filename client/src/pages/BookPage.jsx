import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaSpinner } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection.jsx';
import BookCard from '../components/BookCard.jsx';
import { useLocation } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
// import { makeToVoiceflow } from './extension-makeToVoiceflow.js';

export default function PostPage() {
  const { currentUser } = useSelector(state => state.user);
  const { bookSlug } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [book, setBook] = useState({});
  const [recentBooks, setRecentBooks] = useState(null);
  const [bookRatings, setBookRatings] = useState([]);
  const [myRating, setMyRating] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  // const [contentLength,setContentLength]=useState(0);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/book/getbooks?slug=${bookSlug}`, {   //here bookSlug is unique like an id
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setBook(data.books[0]);
          // setContentLength(data.books[0].content.length);
          const title = data.books[0].title;
          const description = data.books[0].description;
          const fetchRating = async () => {
            try {
              const re = await fetch(`http://localhost:3000/api/rating/getBookRatings/${data.books[0]._id}`, {
                method: 'GET',
                credentials: 'include',
              });
              const ratingdata = await re.json();
              if (!re.ok) {
                setError(true);
                setLoading(false);
                return;
              }
              if (re.ok) {
                setBookRatings(ratingdata)
                // 1. My rating
                const my = ratingdata.find(r => r.userId === currentUser._id);

                setMyRating(my?.rating || 0);

                // 2. Average rating
                const totalRatings = ratingdata.length;
                const average = totalRatings
                  ? ratingdata.reduce((sum, r) => sum + r.rating, 0) / ratingdata.length
                  : 0;

                setAvgRating(average);
                console.log('My rating:', myRating);
                console.log('Average rating:', avgRating.toFixed(1));

                setError(false);
                setLoading(false);

              }
            } catch (error) {
              setError(true);
              setLoading(false);
            }
          };
          fetchRating();
          setError(false);
          setLoading(false);

        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchBook();


  }, [bookSlug, currentUser]);

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:3000/api/rating/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          bookId: book._id,
          userId: currentUser._id,
          rating: myRating,
        }),
      });
      const newavg= (avgRating*bookRatings.length + myRating)/(bookRatings.length + parseInt(1));
      setAvgRating(newavg);
    } catch (err) {
      console.error("Failed to submit rating", err);
    }
  };

  useEffect(() => {
    try {
      const fetchRecentBooks = async () => {
        const res = await fetch('http://localhost:3000/api/book/getbooks?limit=3');
        const data = await res.json();
        if (res.ok) {
          setRecentBooks(data.books);
        }
      }
      fetchRecentBooks();
    } catch (error) {
      console.log(error.message);

    }
  }, [])



  if (loading) return (
    <div className='flex justify-center items-center min-h-screen w-full'> <FaSpinner
      className="animate-spin text-teal-500"
      size={50} // size in px
    /></div>)

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{book && book.title}</h1>
      <Link to={`/search?category=${book && book.category}`} className='self-center mt-5 '>
        <button className='cursor-pointer border border-gray-400 px-1 rounded-2xl hover:bg-gray-600 font-semibold'>{book && book.category}</button></Link>
      <div className='flex flex-col gap-3 justify-center items-center p-3 w-full mx-auto'>
        <img src={book && book.image} alt={book && book.title} className='mt-5 p-3 mx-auto max-h-[600px] lg:h-[600px] lg:w-[800px] max-w-[800px] object-cover' />
        <div className='flex flex-row w-full items-center justify-between lg:px-35 px-20 text-gray-300'>
          <div className="text-sm text-gray-200">Your Rating:{myRating}
            <form className="flex flex-col gap-4" id='form' onSubmit={handleSubmit}>
              <select
                id="rating"
                onChange={(e) => {
                  setMyRating(parseInt(e.target.value));
                }}
                className="p-2 border dark:border-gray-800 rounded-sm bg-gray-50 dark:bg-gray-600"
              >
                <option value="0">Select your Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
                <option value="6">6 Star</option>
                <option value="7">7 Star</option>
                <option value="8">8 Star</option>
                <option value="9">9 Star</option>
                <option value="10">10 Star</option>

              </select>
              <button type="submit" className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-sm text-white w-20 h-8 cursor-pointer hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 ' disabled={loading }>
                Submit
              </button>
            </form>

          </div>

          <div className="text-sm text-gray-500 mt-1">
            Average: {avgRating.toFixed(1)}/10 ,({bookRatings.length} ratings)
          </div>
        </div>
        <h2 className='text-2xl font-semibold'>Description</h2>
        <div>{book.description}</div>
      </div>


      <ReviewSection bookId={book._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5 '>Recent Books</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {
            recentBooks &&
            recentBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          }
        </div>
      </div>
    </main>
  )
}
