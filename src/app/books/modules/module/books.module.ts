import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from '../../books-routing.module';
import { HomeComponent } from '../home/home.component';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from '../../store/books/reducers/books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../store/books/effects/books.effects';
import { AddComponent } from '../books/add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from '../books/edit/edit.component';
import { laptopReducer } from '../../store/laptop/reducers/laptop.reducers';
import { LaptopEffects } from '../../store/laptop/effects/laptop.effects';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    StoreModule.forFeature("mybooks", bookReducer),
    StoreModule.forFeature("mylaptops", laptopReducer),
    EffectsModule.forFeature([BooksEffects]),
    EffectsModule.forFeature([LaptopEffects])
  ]
})
export class BooksModule { }
