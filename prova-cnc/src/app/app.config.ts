import { ApplicationConfig, enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

import {environment as dev} from "src/environments/environment.development"
import {environment as prod} from "src/environments/environment"

// enableProdMode();
console.log(isDevMode());

export const environment = isDevMode() ? dev : prod;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule)
  ]
};
