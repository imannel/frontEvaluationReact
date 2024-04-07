import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header';
import AddUser from './components/user/AddUser';
import UserList from './components/user/UserList'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import BookList from './components/book/BookList'
import Addbook from './components/book/AddBook';
import UserDetailsPage from './components/userLibrary/UserDetailsPage';
import AddReview from './components/review/AddReview';
import ReviewList from './components/review/ReviewList';
import { Navbar } from 'react-bootstrap';
import Home from './components/Home';


function App() {

  return (
    <>
<BrowserRouter>
 
      <Header/>
      <Routes>
      <Route path=''element={ <Home/>}></Route>
      <Route path='/users'element={ <UserList/>}></Route>
      <Route path='/books'element={ <BookList/>}></Route>
      <Route path='users/addForm'element={ <AddUser/>}></Route>
      <Route path='books/addForm'element={ <Addbook/>}></Route>
      <Route path='/user-details-page/:id'element={ <UserDetailsPage/>}></Route>
      <Route path='/addReview/:id'element={ <AddReview/>}></Route>
      <Route path='/Reviews'element={ <ReviewList/>}></Route>
      
      </Routes>
     

     </BrowserRouter>
    </>
  )
}

export default App
