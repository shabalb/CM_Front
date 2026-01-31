import { RegisterService } from './registr-service';
import { Observable, of } from 'rxjs';
import { IUser, IRegisterRequest, IRegisterResponse } from '../../models/registration';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api/api';

@Injectable({providedIn:'root'})
export class ApiRegisterService extends RegisterService{
    private readonly httpClient = inject(HttpClient);
    private readonly apiConfig = inject(Api);
    private users: IUser[] = [{id:1,name:'user',password:'1'}];
    
    public override register(request:IRegisterRequest): Observable<IRegisterResponse>{
        console.log("sended register");
        return this.httpClient.post<IRegisterResponse>(`${this.apiConfig.getUrl()}/api/auth/register`,request);
    }
    public override getUsers(request: number): Observable<IUser[]> {
        return of(this.users);
    }
}