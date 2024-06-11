import { isNgTemplate } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Answer from '@domain/answer/answer.model';
import Test from '@domain/test/test.model';
import { ButtonComponent } from '@shared/button/button.component';
import { HeaderComponent } from '@shared/header/header.component';

@Component({
  selector: 'app-test-screen',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    FormsModule
  ],
  templateUrl: './test-screen.component.html',
  styleUrl: './test-screen.component.scss'
})
export class TestScreenComponent {
  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    this.answer = navigation?.extras.state!['answer'];
    this.test   = navigation?.extras.state!['test'];
    this.startTime();
  }

  test!: Test;
  answer! : Answer;

  question! : string[][];
  questionCopy! : string[][];

  interval: any;
  time: number = 0;


  ngOnInit(){
    this.question = this.splitLines()
    this.questionCopy = JSON.parse(JSON.stringify(this.question))
  }

  splitLines () : string[][] {
    const test = this.test.question!.split('\n').map(item => item.split(" ") );
    return test;
  }

  getIndex (item :any, array:any[], more : number = 0) : number {
    let index = array.findIndex(i => i == item)
    return index + more;
  }

  inputChanged(event: Event, x : number = 0, y : number = 0) {
    console.log(`changed value on ${x} - ${y}`);
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    if(value == "") {
      this.questionCopy[x][y] = this.question[x][y];
      return;
    }

    this.questionCopy[x][y] = value;

    this.verifyAltereds();
  }

  getClass(x : number = 0, y : number = 0){

    if(this.questionCopy[x][y] != this.question[x][y]){
      return "altered";
    }
    return "";

  }


  startTime() {
    this.interval = setInterval(() => {
      const currentDate = new Date();

      //* formula para pegar hora(H), minuto(M) e segundo(S)
      // H  = Tt / segH
      // M = Tt - (segH * H) / segM
      // S = (Tt - (segH * H)) - (M*segM)

      let testTimeInSecconds = (currentDate.getTime() - this.answer.startDate!.getTime()) / 1000 ;

      this.answer.time!.hour = Math.floor(testTimeInSecconds / 3600);
      this.answer.time!.minute = Math.floor((testTimeInSecconds - (this.answer.time!.hour * 3600)) / 60);
      this.answer.time!.secconds =  Math.floor((testTimeInSecconds - (3600 * this.answer.time!.hour)) - (60 * this.answer.time!.minute));

    }, 1000)
  }

  getTime () {

    let hour = this.answer.time!.hour <= 9 ? `0${this.answer.time!.hour}` : `${this.answer.time!.hour}`
    let minute = this.answer.time!.minute <= 9 ? `0${this.answer.time!.minute}` : `${this.answer.time!.minute}`
    let seccond = this.answer.time!.secconds! <= 9 ? `0${this.answer.time!.secconds!}` : `${this.answer.time!.secconds!}`

    return `${hour}:${minute}:${seccond}`
  }

  verifyAltereds(){
    let altered = []
    const lines = this.question.length

    for (let x = 0; x < lines; x++) {
      const elements = this.question[x];

      for (let y = 0; y < elements.length; y++) {
        if(this.questionCopy[x][y] != this.question[x][y]){
          altered.push([x,y])
        }
      }

    }
  }

  sendTest(){
    console.log(this.question);

  }

}
