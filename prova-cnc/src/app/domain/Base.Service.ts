import { HttpClient, HttpHeaders } from "@angular/common/http";
import GetAllReturn from "./_utils/getAll.model";
import { environment } from "../app.config";

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
  getAll(page : number = 0, limit: number = 10) {
    return this.client.get<GetAllReturn<T>>(`${this.fullEndPoint}/${page}&${limit}`).pipe();
  }
}
