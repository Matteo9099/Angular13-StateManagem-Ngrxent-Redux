import { createReducer, on } from "@ngrx/store";
import { Laptop } from "../interfaces/laptop";
import { laptopFetchAPISucesss } from "../actions/laptop.action";

export const initialState: ReadonlyArray<Laptop> = [];

export const laptopReducer = createReducer(
    initialState,
    on(laptopFetchAPISucesss, (state, { allLaptop }) => {
        return allLaptop;
    })
)
