import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Laptop } from "src/app/books/store/laptop/interfaces/laptop";

@Injectable({
    providedIn: 'root'
})

export class LaptopService {
    constructor(private http: HttpClient) { }

    get(){
        return this.http.get<Laptop>("http://localhost:3000/laptop")
    }
}