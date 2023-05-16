import { createAction, props } from "@ngrx/store";
import { Book } from "../interfaces/book";

// azione per invocare la richiesta API per ottenere tutti i libri
export const invokeBooksAPI = createAction(
    "[Books API] invoke books Fetch API"
)

// Azione per segnalare il successo della richiesta API per ottenere tutti i libri, con i libri restituiti come payload.
export const booksFetchAPISuccess = createAction(
    "[Books API] books fetch api success",
    props<{allBooks: Book[]}>()
)

// Azione per invocare la richiesta API per salvare un nuovo libro, con il libro da salvare come payload.
export const invokeSaveBookAPI = createAction(
    "[Books API] invoke save book API",
    props<{payload: Book}>()
)

// Azione per segnalare il successo della richiesta API per salvare un libro, con il libro salvato come payload.
export const saveBookAPISuccess = createAction(
    "[Books API] save book api success",
    props<{response: Book}>()
)

// Azione per invocare la richiesta API per aggiornare un libro esistente, con il libro aggiornato come payload.
export const invokeUpdateBookAPI = createAction(
    "[Books API] invoke update book API",
    props<{payload: Book}>()
)

// Azione per segnalare il successo della richiesta API per aggiornare un libro, con il libro aggiornato come payload.
export const UpdateBookAPISuccess = createAction(
    "[Books API] update book API success",
    props<{response: Book}>()
)

// Azione per invocare la richiesta API per eliminare un libro, con l'ID del libro da eliminare come payload.
export const invokeDeleteBookAPI = createAction(
    "[Books API] invoke delete book API",
    props<{id: number}>()
)

// Azione per segnalare il successo della richiesta API per eliminare un libro, con l'ID del libro eliminato come payload.
export const DeleteBookAPISuccess = createAction(
    "[Books API] delete book API success",
    props<{id: number}>()
)