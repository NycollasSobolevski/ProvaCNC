import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import Test from "./test.model";
import BaseService from "@domain/Base.Service";
import { TestOverview } from "./TestOverview.mode";

@Injectable({
    providedIn: 'root'
})

class TestService extends BaseService<Test> {
    constructor( client : HttpClient) {
      super('Test', client)
    }

    GetTest (code : string) {
      return this.client.get<Test>(`${this.fullEndPoint}/GetTest/${code}`).pipe();
    }

    GetNewCode () {
      return this.client.get<string>(`${this.fullEndPoint}/GetNewCode`).pipe();
    }

    getAllTestData(id: number){
      return this.client.get<TestOverview>(`${this.fullEndPoint}/GetAllData/${id}`, {headers:this.getHeaders()})
    }
}

export default TestService;
