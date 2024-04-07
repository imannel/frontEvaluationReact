import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserLibraryById } from '../../service/user';
import { UserLibrary } from '../../model/userLibrary';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { BookData } from '../../model/bookData';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addBookToUserLibrary, getBooks, searchBooks } from '../../service/book';
import { Alert } from 'react-bootstrap';
import Cards from './Cards';


function UserDetailsPage() {
  const { id} = useParams();
  const [userLibrary, setUserLibrary] = useState<UserLibrary>(
   {
    user: { name: "",
      email: "",
      cin:"",},
    books:[] }
  );
  const [books, setBooks] = useState<BookData[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const libraryResponse = await getUserLibraryById(id);
      setUserLibrary(libraryResponse.data);
      console.log(userLibrary)

      const booksResponse = await getBooks();
      setBooks(booksResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
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
    addBookToUserLibrary(id,bookId)
    .then((resp)=>{
      const book=resp.data ;
      setUserLibrary(prevLibrary => ({
        ...prevLibrary,
        books: [...prevLibrary.books, book] 
      }));
      console.log('Book added to library:', bookId);

    })
    .catch((error)=>{
      setError('Ce livre est déjà dans votre bibliothèque.');})
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>} 
      <h2 className='title'>User Library:</h2>
      {userLibrary ? (
        <section >
          <Row className="card--list">
            {userLibrary.books && userLibrary.books.map((book, index) => (
              <Cards key={index} title={book.title} author={book.author} genre={book.genre} summary={book.summary} />
            ))}
          </Row>
        </section>
      ) : (
        <p>Loading user library...</p>
      )}
      <h1 className="books-title mb-4">Bibliothèque</h1>
      <Row className='container'>
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
      <Table striped bordered hover className="mt-4 ms-3">
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
