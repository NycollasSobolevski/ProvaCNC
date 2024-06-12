import { appConfig } from './../../../app.config';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '@shared/button/button.component';

@Component({
  selector: 'app-finish-test-popup',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './finish-test-popup.component.html',
  styleUrl: './finish-test-popup.component.scss'
})
export class FinishTestPopupComponent {
  constructor(private dialogRef : MatDialogRef<FinishTestPopupComponent>){}

  @Input()
  title? :string
  @Input()
  description? :string

  closeModal () {
    this.dialogRef.close(false);
  }

  send() {
    this.dialogRef.close(true);
  }

}
