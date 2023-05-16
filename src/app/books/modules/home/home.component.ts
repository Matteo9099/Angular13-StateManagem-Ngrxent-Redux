import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectBooks } from '../../store/books/selectors/books.selector';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../../store/books/actions/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectLaptop } from '../../store/laptop/selectors/laptop.selectors';
import { invokeLaptopAPI } from '../../store/laptop/actions/laptop.action';
import { LaptopService } from 'src/app/shared/service/laptop.service';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private appStore: Store<Appstate>, private service: LaptopService) { }

  books$ = this.store.pipe(select(selectBooks));
  deleteModal: any;
  idToDelete: number = 0;

  laptops$ = this.store.pipe(select(selectLaptop));

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );
    
    this.store.dispatch(invokeBooksAPI());
    this.store.dispatch(invokeLaptopAPI());
  }

  openDeleteModal(id:number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.store.dispatch(invokeDeleteBookAPI({id: this.idToDelete}));
    let appStatus$ = this.appStore.pipe(select(selectAppState))
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'success') {
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'', apiResponseMessage: ''}}));
        this.deleteModal.hide();
      }
    })
  }

}
