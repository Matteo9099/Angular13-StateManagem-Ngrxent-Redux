import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { selectLaptop } from "../selectors/laptop.selectors";
import { invokeLaptopAPI, laptopFetchAPISucesss } from "../actions/laptop.action";
import { LaptopService } from "src/app/shared/service/laptop.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LaptopEffects {

    constructor(private laptopService: LaptopService ,private actions$: Actions, private store: Store) { }

    getLaptop$ = createEffect(() => 
        this.actions$.pipe(
            ofType(invokeLaptopAPI),
            withLatestFrom(this.store.pipe(select(selectLaptop))),
            switchMap(([, laptopsFromStore]) => {
                if(laptopsFromStore.length > 0) {
                    return EMPTY;
                }
                return this.laptopService.get().pipe(
                    map((data:any) => laptopFetchAPISucesss({ allLaptop: data }))
                );
            })
        )
    );

}
