import { createFeatureSelector } from "@ngrx/store";
import { Laptop } from "../interfaces/laptop";

export const selectLaptop = createFeatureSelector<Laptop[]>("mylaptops")

/*
export const selectLaptopById = (laptopId: number) => {
    return createSelector(
        selsectLaptop,
        (laptops: Laptop[]) => {
            var laptopById = laptops.filter(_ => _.id == laptopId);
            if(laptopById.length == 0) {
                return null;
            }
            return laptopById[0];
        }
    )
}
*/