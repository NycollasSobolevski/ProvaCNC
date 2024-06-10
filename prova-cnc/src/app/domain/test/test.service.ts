import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import Test from "./test.model";

@Injectable({
    providedIn: 'root'
})

class TestService {
    constructor( protected client : HttpClient) {}

    endpoint = `${environment.apiUrl}/api/Test`;

    GetTest (code : string) {
        return this.client.get<Test>(`${this.endpoint}/GetTest/${code}`).pipe()
    }

}

export default TestService;