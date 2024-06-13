import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import Test from "./test.model";
import BaseService from "@domain/Base.Service";

@Injectable({
    providedIn: 'root'
})

class TestService extends BaseService {
    constructor( protected client : HttpClient) {
      super('Test')
    }

    endpoint = `${environment.apiUrl}/api/Test`;

    GetTest (code : string) {
        return this.client.get<Test>(`${this.fullEndPoint}/GetTest/${code}`).pipe()
    }

}

export default TestService;
