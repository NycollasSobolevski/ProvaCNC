import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import TimeOnly from '@domain/_utils/timeonly.type';
import Answer from '@domain/answer/answer.model';
import AnswerService from '@domain/answer/answer.service';
import { AnswerCorrection, AnswerCorrectionEnum, CorrectionLocation } from '@domain/answer/answerCorrection.model';
import Test from '@domain/test/test.model';
import { ButtonComponent } from '@shared/button/button.component';
import { HeaderComponent } from '@shared/header/header.component';
import { FinishTestPopupComponent } from './finish-test-popup/finish-test-popup.component';
import { HelpModalComponent } from './help-modal/help-modal.component';

@Component({
  selector: 'app-test-screen',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    FormsModule,
    HelpModalComponent
  ],
  templateUrl: './test-screen.component.html',
  styleUrl: './test-screen.component.scss'
})
export class TestScreenComponent {
  constructor(
    private router: Router,
    private answerService : AnswerService,
    private dialog : MatDialog
  ){
    const navigation = this.router.getCurrentNavigation();
    this.answer = navigation?.extras.state!['answer'];
    this.test   = navigation?.extras.state!['test'];
    this.correction = navigation?.extras.state!['locations'];
    this.startTime();
  }

  finished = false;

  test!: Test;
  answer! : Answer;

  correction? : CorrectionLocation[]

  question! : string[][];
  questionCopy! : string[][];

  interval: any;
  time: TimeOnly  = new TimeOnly;


  ngOnInit(){
    const storage = sessionStorage.getItem('lastTest')
    if(storage){
      const test = JSON.parse(storage) as AnswerCorrection
      this.rebuildTest(test)
      this.question = test.answer.userAnswer!.split('\n').map(item => item.split(" ") );
    }
    else {
      this.question = this.test.question!.split('\n').map(item => item.split(" ") );
    }

    this.questionCopy = JSON.parse(JSON.stringify(this.question))
    this.finished = this.test.attempts! > this.answer.attempts!
  }

  ngOnDestroy () {
    sessionStorage.clear()
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
    let className = ""

    this.correction?.forEach(element => {
      if(element.x == x && element.y == y) {
        switch (element.value) {
          case AnswerCorrectionEnum.Correct:
            className =  "correct";
            break;

          case AnswerCorrectionEnum.Incorrect:
            className =  "incorrect";
            break;

          case AnswerCorrectionEnum.MissPlaced:
            className =  "missPlaced";
            break;

          default:
            className =  "";
            break;
        }
      }
      return className;
    });

    if(className != "") {
      return className;
    }

    if(this.questionCopy[x][y] != this.question[x][y]){
      return "altered";
    }
    return "";

  }

  startTime() {
    this.interval = setInterval(() => {
      if(this.answer.attempts! > this.test.attempts!) {
        return;
      }

      const currentDate = new Date();

      //* formula para pegar hora(H), minuto(M) e segundo(S)
      // H  = Tt / segH
      // M = Tt - (segH * H) / segM
      // S = (Tt - (segH * H)) - (M*segM)

      let testTimeInSecconds = (currentDate.getTime() - this.answer.startDate!.getTime()) / 1000 ;

      this.time.hour = Math.floor(testTimeInSecconds / 3600);
      this.time.minute = Math.floor((testTimeInSecconds - (this.time.hour * 3600)) / 60);
      this.time.second =  Math.floor((testTimeInSecconds - (3600 * this.time.hour)) - (60 * this.time.minute));

    }, 1000)
  }

  getTime () {

    let hour = this.time.hour <= 9 ? `0${this.time.hour}` : `${this.time.hour}`
    let minute = this.time.minute <= 9 ? `0${this.time.minute}` : `${this.time.minute}`
    let seccond = this.time.second! <= 9 ? `0${this.time.second!}` : `${this.time.second!}`

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

  buildAnswer( ) : string {
    const lines = this.questionCopy.join("\n").replaceAll(",", " ")
    return lines;
  }

  toggleSend() {
    const dialog = this.dialog.open(FinishTestPopupComponent)
    dialog.componentInstance.title = "Tem certeza?"
    if(this.finished) {
      dialog.componentInstance.description =
        `Você tem certeza que deseja encerrar esta tentativa? \nApós esta tentativa lhe restará mais ${this.test.attempts! - this.answer.attempts!} tentativa(s)`
        }
    else {
      dialog.componentInstance.description =
        `Você tem certeza que deseja encerrar esta tentativa? \n Esta é a ultima tentativa.`
    }

    dialog.afterClosed().subscribe( result =>  {

      if(result === true) {
        this.sendTest();
      }
    })
  }

  sendTest(){
    this.answer.userAnswer = this.buildAnswer();
    this.answer.time = this.time.toString();
    this.answerService.CorrectAnswer(this.answer).subscribe({
      next: (res) => {
        this.rebuildTest(res)
        // this.ngOnInit()

        // this.router.navigate(['test'], {state : {answer: res.answer, test: this.test, location: res.locations}})
        sessionStorage.setItem('lastTest', JSON.stringify(res))
      }
    })
  }

  toggleHome () {
    this.router.navigate([""])
  }

  rebuildTest (answer : AnswerCorrection) {
    this.answer = answer.answer;
    // this.test.question = answer.answer.userAnswer;
    this.correction = answer.locations;
    this.answer.startDate = new Date();
  }
}
