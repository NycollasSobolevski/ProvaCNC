import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Answer from '@domain/answer/answer.model';
import AnswerService from '@domain/answer/answer.service';
import Test from '@domain/test/test.model';
import { ButtonComponent } from '@shared/button/button.component';

@Component({
  selector: 'app-start-test-alert',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './start-test-alert.component.html',
  styleUrl: './start-test-alert.component.scss'
})
export class StartTestAlertComponent {
  constructor(
    protected diagRef : MatDialogRef<StartTestAlertComponent>,
    private dialog : MatDialog,
    private service : AnswerService,
    private router  : Router
  ){}

  @Input()
  answer! : Answer;
  @Input()
  test! : Test;

  startTest () {
    this.answer.startDate = new Date()

    this.dialog.closeAll();
    this.router.navigate(['test'], {state: { answer: this.answer, test: this.test }});
  }
}
