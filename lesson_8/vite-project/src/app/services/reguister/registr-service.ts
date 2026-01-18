import { Observable } from "rxjs";
import { IUser, IRegisterRequest } from "../../models/registration";

export abstract class RegisterService {
    public abstract getUser(request:number): Observable<IUser>;
    public abstract register(request: IRegisterRequest): Observable<IUser>;
}