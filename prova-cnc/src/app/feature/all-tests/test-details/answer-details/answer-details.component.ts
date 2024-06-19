import Answer  from '@domain/answer/answer.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Test from '@domain/test/test.model';
import { LocationStrategy } from '@angular/common';
import { HeaderComponent } from '@shared/header/header.component';
import TestService from '@domain/test/test.service';
import { Avaliation } from '@domain/test/TestOverview.mode';

type State = 'test' | 'answer' | ''

@Component({
  selector: 'app-answer-details',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './answer-details.component.html',
  styleUrl: './answer-details.component.scss'
})
export class AnswerDetailsComponent {
  constructor(
    private service : TestService,
    private actRoute: ActivatedRoute,
    private location: LocationStrategy
  ){}

  state: State  = ''

  data!: string[][];
  template!: string[][];
  question?:  string[][];

  test?: Test;
  answer?: Answer;
  avaliations?: Avaliation[];

  ngOnInit() {
    this.readData()
  }

  readData () {
    var state = history.state
    console.log(state);

    if(state.test) {
      this.test = state.test;
      this.avaliations = state.avaliations;
      this.state = 'test'
      this.getTestContent();
      return
    }
    if(state.answer) {
      this.answer = state.answer;
      this.state = 'answer'
      this.getAnswerContent();
      return
    }
  }

  getTestContent(){
    var lines = this.test?.question?.split('\n')!;
    let content : string[][] = []

    lines.forEach(element => {
      content.push(element.split(' '))
    });

    this.data = content;

    this.getTemplateContent();
  }

  getAnswerContent(){
    var lines = this.answer!.userAnswer!.split('\n');
    let content : string[][] = []

    lines.forEach(element => {
      content.push(element.split(' '))
    });

    this.data = content;
    this.service.getAllTestData(this.answer?.idTest!).subscribe({
      next: (res) => {
        this.test = res.test;
        this.getTemplateContent();
       this.getQuestionContent();
    }
    })
  }

  getTemplateContent (){
    var lines = this.test?.answer?.split('\n')!;
    let content : string[][] = []
    lines.forEach(element => {
      content.push(element.split(' '));
    })
    this.template = content;
  }
  getQuestionContent () {
    var lines = this.test?.question?.split('\n')!;
    let content : string[][] = []
    lines.forEach(element => {
      content.push(element.split(' '));
    })
    this.question = content;
  }
  getStyleClass(x: number, y:number){
    if(this.state == 'test'){
      return this.getTestClass(x,y)
    }
    if(this.state == 'answer'){
      return this.getAnswerClass(x,y)
    }
    return '';
  }

  getTestClass (x: number, y:number) {
    if(this.data[x][y] != this.template[x][y]) {
      return 'incorrect';
    }
    return '';
  }
  getAnswerClass (x: number, y:number) {
    if(this.data[x][y] != this.question![x][y]) {
      if(this.data[x][y] != this.template[x][y]) {
        return 'incorrect';
      }
      else {
        return 'correct';
      }
    }
    return '';
  }

  getIndex (item :any, array:any[], more : number = 0) : number {
    let index = array.findIndex(i => i == item)
    return index + more;
  }
}
