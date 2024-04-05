import { BookData } from "./bookData";
import { UserData } from "./userData";


export interface UserLibrary {
  id: number;
  user: UserData;
  books: BookData[];
}
