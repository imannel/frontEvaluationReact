import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/book.jpg';



function Header() {
    
    return (
        <div>
            <BootstrapNavbar bg="dark" variant="dark">
        <Container>
          <BootstrapNavbar.Brand href="#home" ><img className="logo" src={logo} /></BootstrapNavbar.Brand>
          <Nav className="me-auto">
           <Link className='nav-home' to="" >Home</Link>
            
            <Link className='nav-users' to="users" >Users</Link>
      
            <Link className='nav-books' to="books">Books</Link>

            <Link className='nav-reviews' to="reviews">Reviews</Link>

          </Nav>
          
        </Container>
      </BootstrapNavbar>
      </div>
      
    );
}

export default Header;