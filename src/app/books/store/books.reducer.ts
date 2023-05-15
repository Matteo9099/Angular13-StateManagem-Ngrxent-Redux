import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { DeleteBookAPISuccess, UpdateBookAPISuccess, booksFetchAPISuccess, saveBookAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISuccess, (state, {allBooks}) => {
      return allBooks;
    }),
    on(saveBookAPISuccess, (state, {response}) => {
      let newState = [...state];
      newState.unshift(response);
      return newState;
    }),
    on(UpdateBookAPISuccess, (state, {response}) => {
      let newState = state.filter(_ => _.id !== response.id);
      newState.unshift(response);
      return newState;
    }),
    on(DeleteBookAPISuccess, (state, {id}) => {
      let newState = state.filter(_ => _.id !== id);
      return newState;
    })
)