import { ApplicationConfig, provideBrowserGlobalErrorListeners, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { QuizService } from './services/quiz/quiz.service';
import { MockQuizService } from './services/quiz/mock-quiz.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { quizApi } from './services/api/quiz.api';
import { Api } from './services/api/api';
import { ApiQuizService } from './services/quiz/api-quiz.service';
import { handleAuth } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth/auth.service';
import { ApiAuthService } from './services/auth/apiAuth.service';

const services:Provider[] = [{
  provide: QuizService,
  useClass:ApiQuizService,/////
},{
  provide:Api,
  useClass: quizApi
},{
  provide:AuthService,
  useClass: ApiAuthService
}
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([handleAuth])),
    ...services,
  ]
};
