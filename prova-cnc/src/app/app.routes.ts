import { Routes } from '@angular/router';
import { TestComponent } from './feature/test/test.component';
import { LoginComponent } from './feature/login/login.component';

export const routes: Routes = [
    {path: "test", component: TestComponent, title: "Prova CNC"},
    {path: "login", component: LoginComponent, title: "Prova CNC - Login"},
    {path: "**", component: TestComponent, title: "Prova CNC"},
];
