import { createAction, props } from "@ngrx/store";
import { Laptop } from "../interfaces/laptop";

export const invokeLaptopAPI = createAction(
    "[Laptop API] invoke laptop Fetch API"
)

export const laptopFetchAPISucesss = createAction(
    "[Laptop API] laptop fetch api success",
    props<{allLaptop: Laptop[]}>()
)