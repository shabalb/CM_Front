import { Injectable,signal } from "@angular/core";

@Injectable()
export class AuthState{
    public readonly loggedIn = signal(true);
}