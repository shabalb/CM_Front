import { inject, Injectable, signal } from '@angular/core';
import { ApiAuthService } from '../services/auth/apiAuth.service';

@Injectable({providedIn: 'root'})
export class AuthState{
    public readonly loggedIn = signal<boolean>(false);
}
