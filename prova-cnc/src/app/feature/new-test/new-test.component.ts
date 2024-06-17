import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Test from '@domain/test/test.model';
import TestService from '@domain/test/test.service';
import AlertType from '@shared/alert/_utils/AlertType.enum';
import AlertService from '@shared/alert/_utils/alert.service';
import { ButtonComponent } from '@shared/button/button.component';
import { HeaderComponent } from '@shared/header/header.component';
import { TextareaComponent } from '@shared/textarea/textarea.component';

@Component({
  selector: 'app-new-test',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    ButtonComponent,
    TextareaComponent
  ],
  templateUrl: './new-test.component.html',
  styleUrl: './new-test.component.scss'
})
export class NewTestComponent {
  constructor(
    private service : TestService ,
    private alertService : AlertService,
    private router : Router
  ){}

  newTestForm : FormGroup = new FormGroup({
    code: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    attempts: new FormControl(1, Validators.required),
    question: new FormControl("", Validators.required),
    answer: new FormControl("", Validators.required),
  })


  ngOnInit() {
    this.getCode()
  }

  send() {
    if(!this.newTestForm.valid) {
      this.alertService.open({kind: AlertType.Warning, message: "Nem todos os campos estão preenchidos"})
      return;
    }
    const formValues = this.newTestForm.getRawValue();

    const body : Test = {
      id: 0,
      code: formValues['code'],
      title: formValues['title'],
      description: formValues['description'],
      attempts: formValues['attempts'],
      question: formValues['question'],
      answer: formValues['answer'],
      isActive: true,
    }
    console.log(body);

    this.service.create(body).subscribe({
      next: (res) => {
        this.router.navigate(['home'])
      }
    })
  }

  getCode () {
    this.service.GetNewCode().subscribe({
      next: (res) => {
        this.newTestForm.controls['code'].setValue(res)
      }
    });
  }
}
