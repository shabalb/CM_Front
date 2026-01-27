import { RegisterService } from './registr-service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser, IRegisterRequest, IRegisterResponse } from '../../models/registration';

@Injectable()
export class MockRegistrService extends RegisterService{
    private users: IUser[] = [];
    private userId = 0;
    public override register(request:IRegisterRequest): Observable<IRegisterResponse>{
        const user: IUser = {
            id:this.userId++,
            name: request.username,
            password:request.password,
        };
        this.users.push(user);
        console.log('регистрация');
        return of({id: user.id, username: user.name});
    }
    public override getUsers(request: number): Observable<IUser[]> {
        return of(this.users);
    }
}