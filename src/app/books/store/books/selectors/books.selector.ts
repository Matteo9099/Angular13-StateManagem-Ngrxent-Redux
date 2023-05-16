import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "../interfaces/book";

export const selectBooks = createFeatureSelector<Book[]>("mybooks")

export const selectBookById = (bookId: number) => {
    return createSelector(
        selectBooks,
        (books: Book[]) => {
            var bookById = books.filter(_ => _.id == bookId);
            if(bookById.length == 0) {
                return null;
            }
            return bookById[0];
        }
    )
}