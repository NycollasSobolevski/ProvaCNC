import { Component } from '@angular/core';
import GetAllReturn from '@domain/_utils/getAll.model';
import Test from '@domain/test/test.model';
import { HeaderComponent } from '@shared/header/header.component';
import TestService from '@domain/test/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import Answer from '@domain/answer/answer.model';

@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [
    HeaderComponent,
  ],
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss', '../table/table.component.scss']
})
export class TestDetailsComponent {
  constructor(
    private service : TestService,
    private actRoute: ActivatedRoute,
    private router  : Router
  ){}

  data!: Test;

  ngOnInit(){
    this.loadData();
  }


  loadData() {
    let id = 0;
    this.actRoute.params.subscribe(param => {
      id = param['id'];
    })

    this.service.getAllTestData(id).subscribe({
      next:(res) => {this.data = res}
    })
  }

  redirectToAnswer( answer: Answer ){
    this.router.navigate(['testAnswer'], {state : {answer : answer}})
  }
  redirectToTemplate( test: Test){
    this.router.navigate(['testAnswer'], {state : {test : test}})

  }
}
