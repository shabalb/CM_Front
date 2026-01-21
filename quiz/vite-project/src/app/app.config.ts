import { ApplicationConfig, provideBrowserGlobalErrorListeners, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { QuizService } from './services/quiz/quiz.service';
import { MockQuizService } from './services/quiz/mock-quiz.service';
import { provideHttpClient } from '@angular/common/http';
import { Api } from './services/api/api';
import { QuizApi } from './services/api/quiz.api';
import { ApiQuizService } from './services/quiz/api-quiz.service';

const services:Provider[] = [{
  provide: QuizService,
  //useClass:MockQuizService,
  useClass:ApiQuizService,
},{
  provide:Api,
  useClass: QuizApi,
}

]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),
    ...services,
  ]
};
