import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import AlertOptions from "./AlertOptions.model";
import AlertType from "./AlertType.enum";
import { AlertComponent } from "../alert.component";

@Injectable({
  providedIn: 'root'
})
export default class AlertService  {
  constructor( private snackBar : MatSnackBar) {}

  private _options : AlertOptions = {
    message: "",
    kind: AlertType.Info
  }

  async toast (options : AlertOptions) {
    const snack = this.snackBar.openFromComponent(AlertComponent)
    snack.instance.message = options.message;
    snack.instance.kind = options.kind;
  }

  open ( options : AlertOptions | undefined = undefined) {
    if(options){
      return this.toast(options);
    }
    return this.toast(this._options)
  }

}
