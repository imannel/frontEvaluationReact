import { BookData } from "./bookData";

export interface ReviewData {
    id?: number;
     book:BookData;
    comment: string;
    rating:number;
  }
  