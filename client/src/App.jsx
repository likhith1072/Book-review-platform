import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import UploadNewBook from './pages/UploadNewBook';
import UpdateBook from './pages/UpdateBook';
import BookPage from './pages/BookPage'
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search'
import VerifyEmail from './pages/VerifyEmail'
import { ToastContainer} from 'react-toastify';
import ResetPassword from './pages/ResetPassword'


export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />    
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />   
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute/>}> 
        <Route path="/dashboard" element={<Dashboard />} />
        </Route> 
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/upload-new-book" element={<UploadNewBook/>}/>
          <Route path="/update-book/:bookId" element={<UpdateBook/>}/>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/reset-password" element={<ResetPassword />} /> 
        <Route path="/book/:bookSlug" element={<BookPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
