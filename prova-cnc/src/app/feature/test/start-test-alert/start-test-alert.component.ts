import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Answer from '@domain/answer/answer.model';

@Component({
  selector: 'app-start-test-alert',
  standalone: true,
  imports: [],
  templateUrl: './start-test-alert.component.html',
  styleUrl: './start-test-alert.component.scss'
})
export class StartTestAlertComponent {
  constructor(private diagRef : MatDialogRef<StartTestAlertComponent>){}

  @Input()
  answer! : Answer;

  ngOnInit() {
    console.log(this.answer);
    
  }
}
