import { Observable } from "rxjs";
import { IUser, IRegisterRequest } from "../../models/registration";
import { Injectable } from "@angular/core";


@Injectable()
export abstract class RegisterService {
    public abstract getUsers(request:number): Observable<IUser[]>;
    public abstract register(request: IRegisterRequest): Observable<IUser>;
}