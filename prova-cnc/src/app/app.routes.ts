import { Routes } from '@angular/router';
import { TestComponent } from './feature/test/test.component';
import { LoginComponent } from './feature/login/login.component';
import { TestScreenComponent } from 'src/app/feature/test-screen/test-screen.component';
import { HomeComponent } from './feature/home/home.component';
import { AuthGuard } from '@shared/utils/guard/auth.guard';
import { AllTestsComponent } from './feature/all-tests/all-tests.component';
import { NewTestComponent } from './feature/new-test/new-test.component';
import { TestDetailsComponent } from './feature/all-tests/test-details/test-details.component';
import { AnswerDetailsComponent } from './feature/all-tests/test-details/answer-details/answer-details.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent, title: "Prova CNC - Login"},
    {path: "start-test", component: TestComponent, title: "Prova CNC"},
    {path: "test", component: TestScreenComponent, title: "Prova CNC"},
    {path: "home", component: HomeComponent, title: "Prova CNC - Home", canMatch:[AuthGuard]},
    {path: "allTests", component: AllTestsComponent, title: "Prova CNC - Todas", canMatch:[AuthGuard]},
    {path: "newTest", component: NewTestComponent, title: "Prova CNC - Novo", canMatch:[AuthGuard]},
    {path: "testDetails/:id", component: TestDetailsComponent, title: "Prova CNC - Detalhes", canMatch:[AuthGuard]},
    {path: "testAnswer", component: AnswerDetailsComponent, title: "Prova CNC - Correção", canMatch:[AuthGuard]},
    {path: "**", component: TestComponent, title: "Prova CNC"},
];
