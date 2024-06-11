import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Test from '@domain/test/test.model';
import { ButtonComponent } from '@shared/button/button.component';
import { StartTestAlertComponent } from '../start-test-alert/start-test-alert.component';
import Answer from '@domain/answer/answer.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-detail',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './test-detail.component.html',
  styleUrl: './test-detail.component.scss'
})
export class TestDetailComponent {
  constructor(
    protected diagRef : MatDialogRef<TestDetailComponent>,
    protected dialog  : MatDialog
  ){}

  @Input()
  test! : Test;

  answerForm : FormGroup = new FormGroup({
    username: new FormControl("", Validators.required)
  })

  ngOnInit() {
    this.toggleStart()
  }

  toggleStart () {
    // if(!this.answerForm.valid) {
    //   return;
    //   }

    const username = this.answerForm.controls['username'].setValue("nyc")
    const dialog = this.dialog.open(StartTestAlertComponent)
    dialog.componentInstance.answer = this.buildAnswer();
    dialog.componentInstance.test = this.test;
  }

  buildAnswer() : Answer {
    const username = this.answerForm.controls['username'].value

    let obj : Answer = {
      id: 0,
      attempts: 1,
      idTest: this.test.id,
      is_activated: true,
      student: username,
      time: {
        hour:0,
        minute:0,
      },
      userAnswer: ""
    };

    return obj;
  }

}
