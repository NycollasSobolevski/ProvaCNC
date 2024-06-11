import { Routes } from '@angular/router';
import { TestComponent } from './feature/test/test.component';
import { LoginComponent } from './feature/login/login.component';
import { TestScreenComponent } from 'src/app/feature/test-screen/test-screen.component';

export const routes: Routes = [
    {path: "start-test", component: TestComponent, title: "Prova CNC"},
    {path: "login", component: LoginComponent, title: "Prova CNC - Login"},
    {path: "test", component: TestScreenComponent, title: "Prova CNC"},
    {path: "**", component: TestComponent, title: "Prova CNC"},
];
