import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export default class BaseService<T> {
  protected readonly endPoint : string = `${environment.apiUrl}/api`;
  protected fullEndPoint : string = "";

  constructor (entity : string, protected client : HttpClient) {
    this.fullEndPoint = this.endPoint + `/${entity}`
  }

  protected getHeaders(){
    const token = sessionStorage.getItem("token") ?? "";
    const headers = new HttpHeaders({
      Authorization : token
    })
    return headers;
  }

  create (obj : T) {
    return this.client.post(`${this.fullEndPoint}`, obj, {headers: this.getHeaders()}).pipe()
  }
}
