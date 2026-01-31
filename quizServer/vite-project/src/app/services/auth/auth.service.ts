import { Observable } from 'rxjs';
import { IUser, IAuthRequest, IAuthResponse, ICheckAuthResponse } from '../../models/auth';
import { Injectable } from '@angular/core';


@Injectable()
export abstract class AuthService {
    public abstract getUsers(request:number): Observable<IUser[]>;
    public abstract auth(request: IAuthRequest): Observable<IAuthResponse>;
    public abstract checkAuth(): Observable<ICheckAuthResponse>;
}