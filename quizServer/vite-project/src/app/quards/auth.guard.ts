import { CanActivateFn } from '@angular/router';
import { AuthState } from '../states/auth.state';
import { inject } from '@angular/core';
import { Router } from '@angular/router'

export const authGuard: CanActivateFn = () =>{
    const authState = inject(AuthState);
    //*
    const router = inject(Router);
    if (authState.loggedIn() === null){
        return false;
    }
    return authState.loggedIn()
    ? true
    : router.createUrlTree(['/auth/login']);
    if (!authState.loggedIn()){
        router.navigate(['auth/login']);
        return false;
    }
    return true;//*/
    //return authState.loggedIn();
};

export const nonAuthGuard: CanActivateFn = () =>{
    const authState = inject(AuthState);
    //return !authState.loggedIn();

    //*
    const router = inject(Router);
    if (authState.loggedIn() === null){
        return true;
    }
    return authState.loggedIn()
    ? router.createUrlTree(['/main'])
    : true;//*/
    //return !authState.loggedIn();
};