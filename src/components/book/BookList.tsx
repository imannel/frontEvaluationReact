import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteBookById, getBooks, searchBooks } from "../../service/book";
import { BookData } from "../../model/bookData";

function bookList() {
  const [books, setBooks] = useState<BookData[]>([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    handleGetBook();
  }, []);
  const navigate=useNavigate();
  const handleGetBook= () => {
    getBooks()
      .then(resp => {
        const books = resp.data;
        setBooks(books);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleDeleteBook = (id: number) => {
    alert('Are you sure?')
    deleteBookById(id)
      .then(resp => {
        const newBooks = books.filter(item => item.id !== id);
        setBooks(newBooks);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    searchBooks(query)
      .then((resp) => {
        const searchedBooks= resp.data;
        setBooks(searchedBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container className="my-4">
    <h1 className="books-title mb-4">books</h1>
    <Row>
      <Col md={6}>
        <Form onSubmit={handleSearch}>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={query}
                name="search"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
            <Button type="submit" variant="primary">
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
            </Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col md={6} className="d-flex justify-content-end align-items-center">
    <Link to="addForm">
      <Button variant="success" size="lg">
         <FontAwesomeIcon icon={faPlus} className="mr-2" />
            New
         </Button>
    </Link>

      </Col>
    </Row>
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Title</th>
          <th>author</th>
          <th>summary</th>
          <th>genre</th>
          <th>delete</th>
          
        </tr>
      </thead>
      <tbody>
  {Array.isArray(books) && books.map(book => (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.summary}</td>
      <td>{book.genre}</td>
      <td>
        <Button variant="danger" onClick={() => handleDeleteBook(book.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
      
    </tr>
  ))}
</tbody>

    </Table>
  </Container>
);
  
}

export default bookList