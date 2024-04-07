import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ReviewData } from "../../model/reviewData";
import { BookData } from "../../model/bookData";
import { getBooks } from "../../service/book";
import { addReviewToUserLibrary } from "../../service/review";
import { useParams } from 'react-router-dom';

function AddReview() {
    const { id} = useParams();
    const navigate = useNavigate();
    const [reviewInfo, setReviewInfo] = useState<ReviewData>({
        book: {
            id: 0,
            title: "",
            author: "",
            summary: "",
            genre: ""
        },
        comment: "",
        rating: 0,
    });
    const [books, setBooks] = useState<BookData[]>([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await getBooks();
                setBooks(response.data); 
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }
        fetchBooks();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = event.target;
            if (name === "book") {
            const selectedBook = books.find(book => book.id === parseInt(value));
                setReviewInfo(prevReviewInfo => ({
                ...prevReviewInfo,
                book: selectedBook || { id: 0, title: "", author: "", summary: "", genre: "" }
            }));
        } else if (name === "rating") {
            const ratingValue = parseInt(value);
            if (ratingValue >= 0 && ratingValue <= 10) {
                setReviewInfo(prevReviewInfo => ({
                    ...prevReviewInfo,
                    [name]: ratingValue
                }));
            } else {
                alert("Please enter a value between 0 and 10 for rating.");
            
            }
        }else {
            setReviewInfo(prevReviewInfo => ({
                ...prevReviewInfo,
                [name]: value
            }));
        }
    };
    

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addReviewToUserLibrary(id, reviewInfo.book.id, reviewInfo.comment, reviewInfo.rating)
            .then(resp => {
                alert("Review added successfully!");
                navigate("/reviews");
            })
            .catch(err => console.log(err));

        setReviewInfo({
            book: {
                id: 0,
                title: "",
                author: "",
                summary: "",
                genre: ""
            },
            comment: "",
            rating: 0,
        });
    }

    return (
        <div className="container-form">
            <div className="form-container">
                <Form onSubmit={handleSave}>
                    <Form.Group>
                        <Form.Label>Book name</Form.Label>
                        <Form.Control
                            as="select"
                            name="book"
                            value={reviewInfo.book.id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a book</option>
                            {books.map((book: BookData) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            type="text"
                            name="comment"
                            placeholder="Enter comment"
                            value={reviewInfo.comment}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            name="rating"
                            placeholder="Enter your rating"
                            value={reviewInfo.rating}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit review
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddReview;
