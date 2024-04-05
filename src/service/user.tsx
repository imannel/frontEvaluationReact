import axiosInstance from "../api/axiosInstance";
import { UserData } from '../model/userData';

export const getUsers=()=>{
    return axiosInstance.get("users")
}
export const addUser = (userData:UserData) => axiosInstance.post("users", userData);

export const getUserById = (userId:number) => axiosInstance.get(`users/${userId}`);

export const deleteUserById = (userId:number) => axiosInstance.delete(`users/${userId}`);

export const searchUsers = (keyword: string) => {
    return axiosInstance.get<UserData[]>(`users/search?keyword=${keyword}`);
};
export const getUserLibraryById = (userId: number) => {
    return axiosInstance.get(`/users/user-library/${userId}`);
  };