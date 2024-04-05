import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header';
import AddUser from './components/user/AddUser';
import UserList from './components/user/UserList'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import BookList from './components/book/BookList'
import Addbook from './components/book/AddBook';
import UserDetailsPage from './components/userLibrary/UserDetailsPage';


function App() {

  return (
    <>
<BrowserRouter>
      <Header/>
      <Routes>
      <Route path='/users'element={ <UserList/>}></Route>
      <Route path='/books'element={ <BookList/>}></Route>
      <Route path='users/addForm'element={ <AddUser/>}></Route>
      <Route path='books/addForm'element={ <Addbook/>}></Route>
      <Route path='/user-details-page/:id'element={ <UserDetailsPage/>}></Route>
      
      </Routes>
     

     </BrowserRouter>
    </>
  )
}

export default App
