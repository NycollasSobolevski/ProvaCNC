import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import Answer from "./answer.model";
import { AnswerCorrection } from "./answerCorrection.model";
import BaseService from "@domain/Base.Service";

@Injectable({
    providedIn: 'root'
})

class AnswerService extends BaseService<Answer> {
    constructor( client : HttpClient) {
      super('Answer', client)
    }

    endpoint = `${environment.apiUrl}/api/Answer`;

    PostAnswer (answer : Answer) {
      return this.client.post<Answer>(`${this.endpoint}/`, answer).pipe()
    }

    CorrectAnswer (answer : Answer) {
      return this.client.post<AnswerCorrection>(`${this.endpoint}/CorrectTest`, answer).pipe()
    }


}

export default AnswerService;
