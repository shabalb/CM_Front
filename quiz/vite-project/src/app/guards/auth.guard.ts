import { CanActivateFn } from "@angular/router";
import { AuthState } from "../states/auth.state";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () =>{
    const authState = inject(AuthState);
    return authState.loggedIn();
}

export const nonAuthGuard: CanActivateFn = () => {
    const authState = inject(AuthState);
    return !authState.loggedIn();
}