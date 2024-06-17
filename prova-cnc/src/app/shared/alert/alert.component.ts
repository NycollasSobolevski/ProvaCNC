import { Component, Input, input } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import AlertOptions from './_utils/AlertOptions.model';
import AlertType from './_utils/AlertType.enum';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  constructor(private snackRef : MatSnackBarRef<AlertComponent>){}

  @Input()
  message : string = "";
  @Input()
  kind : AlertType = AlertType.Info;
  @Input()
  duration : number = 3000


  ngOnInit() {
    this.closeComponent()
  }


  closeComponent() {
    if(!this.duration){
      return
    }
    const interval = setInterval(() => {
      this.snackRef.containerInstance.exit()
    }, this.duration)
  }


}
