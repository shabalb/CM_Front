import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, Provider } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
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
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([handleAuth])),
    //*
    provideAppInitializer(() => {
      const router = inject(Router);
      const server = inject(ApiAuthService);
      const request = firstValueFrom( server.checkAuth());
      console.log("cathed in config");
      router.navigate(['auth/login']);
      return request;
    }),//*/
    ...services,
  ]
};
