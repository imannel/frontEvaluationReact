import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserLibraryById } from '../../service/user';
import { UserLibrary } from '../../model/userLibrary';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { BookData } from '../../model/bookData';
import { faEdit, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBooks, searchBooks } from '../../service/book';

function UserDetailsPage() {
  const { id } = useParams();
  const [userLibrary, setUserLibrary] = useState<UserLibrary>();
  const [books, setBooks] = useState<BookData[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer la bibliothèque de l'utilisateur
        const libraryResponse = await getUserLibraryById(id);
        setUserLibrary(libraryResponse.data);

        // Récupérer la liste des livres
        const booksResponse = await getBooks();
        setBooks(booksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  
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

  const handleAddToLibrary = (bookId: number) => {
    console.log('Book added to library:', bookId);
  }

  return (
    <div>
      <h2>User Library:</h2>
      {userLibrary ? (
        <ul>
          {userLibrary.books ? (
            userLibrary.books.map(book => (
              <li key={book.id}>
                <strong>Title:</strong> {book.title}, <strong>Author:</strong> {book.author}
              </li>
            ))
          ) : (
            <li>No books found</li>
          )}
        </ul>
      ) : (
        <p>Loading user library...</p>
      )}
      <h1 className="books-title mb-4">Bibliothèque</h1>
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
                  <FontAwesomeIcon  icon={faSearch} className="mr-2" />
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={6} className="d-flex justify-content-end align-items-center">

        </Col>
      </Row>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Summary</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.summary}</td>
              <td>{book.genre}</td>
              <td>
                <Button onClick={() => handleAddToLibrary(book.id)}>Add to Library</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserDetailsPage;
