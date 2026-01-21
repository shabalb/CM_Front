import { RegisterService } from "./registr-service";
import { Observable, of } from "rxjs";
import { IUser, IRegisterRequest } from "../../models/registration";
import { Injectable } from "@angular/core";
import { Console } from "console";

@Injectable()
export class MockRegistrService extends RegisterService{
    private users: IUser[] = [];
    private userId = 0;
    public override register(request:IRegisterRequest): Observable<IUser>{
        const user: IUser = {
            id:this.userId++,
            name: request.name,
            password:request.password,
        }
        this.users.push(user);
        console.log("регистрация");
        return of(user);
    }
    public override getUsers(request: number): Observable<IUser[]> {
        return of(this.users);
    }
}