import axiosInstance from "../api/axiosInstance";



export const getAllReviews = () => {
    return axiosInstance.get('/reviews'); 
  };
export const deleteReviewById = (reviewId:number) => {
    return axiosInstance.delete(`/reviews/${reviewId}`);
  };
  
 export const addReviewToUserLibrary = (userId: number, bookId: number, comment: string, rating: number) => {

    return axiosInstance.post(`reviews/add-review/${userId}/${bookId}`, null, {
        params: {
        comment: comment,
        rating: rating
          }
        });
 };
