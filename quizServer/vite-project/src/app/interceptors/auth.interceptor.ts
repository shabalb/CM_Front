import { HttpErrorResponse, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthState } from "../states/auth.state";
import { Router } from "@angular/router";
import { catchError, of, tap, throwError } from "rxjs";

//*
export const handleAuth: HttpInterceptorFn = (req:HttpRequest<unknown>,next: HttpHandlerFn) =>{
    const authState = inject(AuthState);
    const router = inject(Router);
    const clonedRequest = req.clone({
        withCredentials:true
    })

    return next(clonedRequest).pipe(catchError((x:HttpErrorResponse) =>{
        if ( x.status === 401){
            console.log('123');
            authState.loggedIn.set(false);
            router.navigate(['main/authUser']);
            //return of(x.message);
        }
        return throwError(() =>x);
    }))
}//*/

/*
export const handleAuth: HttpInterceptorFn = (req, next) => {
    const authState = inject(AuthState);
    const router = inject(Router);

    return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
            authState.loggedIn.set(false);
            console.log('123');
            router.navigate(['/auth', 'login']); // или register
        }
        return throwError(() => error);
        })
    );
};*/