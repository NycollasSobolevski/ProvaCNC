import { environment } from "src/environments/environment";

export default class BaseService {
  protected readonly endPoint : string = `${environment.apiUrl}/api`;
  protected fullEndPoint : string = "";

  constructor (entity : string) {
    this.fullEndPoint = this.endPoint + `/${entity}`
  }
}
