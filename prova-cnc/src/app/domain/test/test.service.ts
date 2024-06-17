import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import Test from "./test.model";
import BaseService from "@domain/Base.Service";

@Injectable({
    providedIn: 'root'
})

class TestService extends BaseService<Test> {
    constructor( client : HttpClient) {
      super('Test', client)
    }

    endpoint = `${environment.apiUrl}/api/Test`;

    GetTest (code : string) {
      return this.client.get<Test>(`${this.fullEndPoint}/GetTest/${code}`).pipe();
    }

    GetNewCode () {
      return this.client.get<string>(`${this.fullEndPoint}/GetNewCode`).pipe();
    }
}

export default TestService;
