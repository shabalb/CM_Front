import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthState } from '../states/auth.state';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const handleAuth: HttpInterceptorFn = (req:HttpRequest<unknown>,next: HttpHandlerFn) =>{
    const authState = inject(AuthState);
    const router = inject(Router);
    const clonedRequest = req.clone({
        withCredentials:true
    });

    return next(clonedRequest).pipe(catchError((x:HttpErrorResponse) =>{
        if ( x.status === 401){
            console.log('123');
            authState.loggedIn.set(false);
            router.navigate(['auth/login']);
        }
        return throwError(() =>x);
    }));
};