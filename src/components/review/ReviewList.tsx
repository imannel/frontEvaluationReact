import { Button, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteReviewById, getAllReviews } from "../../service/review";
import { ReviewData } from "../../model/reviewData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ReviewList() {
    const [reviews, setReviews] = useState<ReviewData[]>([]);

    useEffect(() => {
        handleGetReviews();
    }, []);

    const handleGetReviews = () => {
        getAllReviews()
            .then(resp => {
                const reviews = resp.data;
                setReviews(reviews);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleDeleteReview = (id: number) => {
        alert('Are you sure?')
        deleteReviewById(id)
            .then(resp => {
                const newReviews = reviews.filter(item => item.id !== id);
                setReviews(newReviews);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Container className="my-4">
            <h1 className="review-title title mb-4">Reviews</h1>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Comment</th>
                        <th>Rating</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.id}>
                            <td>{review.book.title}</td>
                            <td>{review.comment}</td>
                            <td>{review.rating}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>
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

export default ReviewList;
