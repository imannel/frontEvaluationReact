import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../../service/book';
import { BookData } from '../../model/bookData';

function Addbook() {
  const [bookInfo, setBookInfo] = useState<BookData>({
    title: '',
    author: '',
    summary: '',
    genre: '',
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBookInfo((prevBookInfo) => ({
      ...prevBookInfo,
      [name]: value,
    }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addBook(bookInfo)
      .then(() => {
        alert('Book has been added successfully.');
        navigate('/books');
      })
      .catch((err) => {
        console.error('Error adding book:', err);
        // Ajoutez une logique pour gérer l'erreur ici
      });

    setBookInfo({
      title: '',
      author: '',
      summary: '',
      genre: '',
    });
  };

  return (
    <div className="container-form">
      <div className="form-container">
        <Form onSubmit={handleSave}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              value={bookInfo.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              placeholder="Enter author"
              value={bookInfo.author}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary</Form.Label>
            <Form.Control
              type="text"
              name="summary"
              placeholder="Enter summary"
              value={bookInfo.summary}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              placeholder="Enter genre"
              value={bookInfo.genre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit book
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Addbook;
