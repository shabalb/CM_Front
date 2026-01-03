import { ApplicationConfig, provideBrowserGlobalErrorListeners, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { QuizService } from './services/quiz/quiz.service';
import { MockQuizService } from './services/quiz/mock-quiz.service';

const services:Provider[] = [{
  provide: QuizService,
  useClass:MockQuizService,
}]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    ...services,
  ]
};
