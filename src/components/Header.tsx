import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <BootstrapNavbar bg="dark" variant="dark">
        <Container>
          <BootstrapNavbar.Brand href="#home">Navbar</BootstrapNavbar.Brand>
          <Nav className="me-auto">
           
            <Link className='nav-rooms' to="users" >Users</Link>
      
            <Link className='nav-reservations' to="books">Books</Link>
          </Nav>
        </Container>
      </BootstrapNavbar>
        </div>
    );
}

export default Header;