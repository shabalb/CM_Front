import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { IUser, IAuthRequest, IAuthResponse } from '../../models/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class MockAuthService extends AuthService{
    private users: IUser[] = [{id:1,name:'user',password:'1'}];
    private userId = 1;
    public override auth(request:IAuthRequest): Observable<IAuthResponse>{
        const checkUser: IUser | undefined = this.users.find(user => user.name === request.username && user.password === request.password);
        if (checkUser != undefined){
            const response: IAuthResponse = {
                user:checkUser,
                passed: true,
            };
            console.log('аутентификация');
            return of(response);
        }else{
            const user: IUser = {
                id: 0,
                name: '',
                password: '',
            };
            const response: IAuthResponse = {
                user:user,
                passed: false,
            };
            return of(response);
        }
    }
    public override getUsers(request: number): Observable<IUser[]> {
        return of(this.users);
    }
}