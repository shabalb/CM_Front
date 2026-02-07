import {  ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, Provider } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { QuizService } from './services/quiz/quiz.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { quizApi } from './services/api/quiz.api';
import { Api } from './services/api/api';
import { ApiQuizService } from './services/quiz/api-quiz.service';
import { handleAuth } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth/auth.service';
import { ApiAuthService } from './services/auth/apiAuth.service';
import { firstValueFrom } from 'rxjs';
import { AuthState } from './states/auth.state';

const services:Provider[] = [{
  provide: QuizService,
  useClass:ApiQuizService,
},{
  provide:Api,
  useClass: quizApi
},{
  provide:AuthService,
  useClass: ApiAuthService
}
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),//withEnabledBlockingInitialNavigation()
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([handleAuth])),
    //*
    provideAppInitializer(async () => {
      const server = inject(ApiAuthService);
      const authState = inject(AuthState);
          
      try {
        const request = await firstValueFrom( server.checkAuth());
        authState.loggedIn.set(true);
        //return request;
      } catch{
        authState.loggedIn.set(false);
      }

    }),//*/
    ...services,
  ]
};
