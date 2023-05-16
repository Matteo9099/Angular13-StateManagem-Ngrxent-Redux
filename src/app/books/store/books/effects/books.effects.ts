import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { BooksService } from "../../../../shared/service/books.service";
import { DeleteBookAPISuccess, UpdateBookAPISuccess, booksFetchAPISuccess, invokeBooksAPI, invokeDeleteBookAPI, invokeSaveBookAPI, invokeUpdateBookAPI, saveBookAPISuccess } from "../actions/books.action";
import { Store, select } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { selectBooks } from "../selectors/books.selector";

@Injectable()
export class BooksEffects {

    constructor(private actions$: Actions, private bookService: BooksService, private appStore: Store<Appstate>, private store: Store) {}

    // Effetto che ascolta l'azione invokeBooksAPI e recupera i libri tramite la richiesta API solo se la lista dei libri nello stato è vuota.
    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            withLatestFrom(this.store.pipe(select(selectBooks))),
            switchMap(([, booksFromStore]) => {
                if(booksFromStore.length > 0) {
                    return EMPTY;
                }
                return this.bookService.get().pipe(
                    map((data: any) => booksFetchAPISuccess({ allBooks: data }))
                );
            })
        )
    );

    // Effetto che ascolta l'azione invokeSaveBookAPI e invia una richiesta API per salvare un nuovo libro.
    saveNewBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeSaveBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                return this.bookService.create(action.payload).pipe(
                    map((data) => {
                        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                        return saveBookAPISuccess({ response: data })
                    } )
                )
            })
        )
    );

    // Effetto che ascolta l'azione invokeUpdateBookAPI e invia una richiesta API per aggiornare un libro esistente.
    updateBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeUpdateBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                return this.bookService.update(action.payload).pipe(
                    map((data) => {
                        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                        return UpdateBookAPISuccess({ response: data })
                    } )
                )
            })
        )
    );

    // Effetto che ascolta l'azione invokeDeleteBookAPI e invia una richiesta API per eliminare un libro.
    deleteBook$ = createEffect(() =>
    this.actions$.pipe(
        ofType(invokeDeleteBookAPI),
        switchMap((action) => {
            this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
            return this.bookService.delete(action.id).pipe(
                map((data) => {
                    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                    return DeleteBookAPISuccess({ id: action.id })
                } )
            )
        })
    )
)
}
