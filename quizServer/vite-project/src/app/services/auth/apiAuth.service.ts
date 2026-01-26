import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { IUser, IAuthRequest, IAuthResponse } from '../../models/auth';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api/api';

@Injectable({providedIn:'root'})
export class ApiAuthService extends AuthService{
    private readonly httpClient = inject(HttpClient);
    private readonly apiConfig = inject(Api);
    private users: IUser[] = [{id:1,name:'user',password:'1'}];
    
    public override auth(request:IAuthRequest): Observable<IAuthResponse>{
        return this.httpClient.post<IAuthResponse>(`${this.apiConfig.getUrl()}/api/auth/login`,request);
    }
    public override getUsers(request: number): Observable<IUser[]> {
        return of(this.users);
    }
}