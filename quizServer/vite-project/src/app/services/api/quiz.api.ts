import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable()
export class quizApi extends Api{
    public override getUrl(): string {
        return 'http://localhost:5000';
    }
}