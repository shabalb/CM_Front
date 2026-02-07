import { AuthService } from './auth.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { IUser, IAuthRequest, IAuthResponse, ICheckAuthResponse } from '../../models/auth';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api/api';
import { AuthState } from '../../states/auth.state';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class ApiAuthService extends AuthService{
    private readonly httpClient = inject(HttpClient);
    private readonly apiConfig = inject(Api);
    private users: IUser[] = [{id:1,name:'user',password:'1'}];
    private readonly authState = inject(AuthState);
    private  readonly router = inject(Router);
    
    public override auth(request:IAuthRequest): Observable<IAuthResponse>{
        return this.httpClient.post<IAuthResponse>(`${this.apiConfig.getUrl()}/api/auth/login`,request);
    }
    public override getUsers(request: number): Observable<IUser[]> {
        return of(this.users);
    }
    public override checkAuth(): Observable<ICheckAuthResponse> {
        return this.httpClient.get<ICheckAuthResponse>(`${this.apiConfig.getUrl()}/api/auth/me`, {
        withCredentials: true 
        });
        /*.pipe(tap(() => {
            console.log("setted true")
            this.authState.loggedIn.set(true)
        }),
        //*
        catchError(() => {
            this.authState.loggedIn.set(false);
            console.log("catched in auth");
            //this.router.navigate(['auth/login']);
            return of ({id:-1});
        })//*/
        //);
    }
}