import { Component, computed, Inject, inject, Signal } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from "rxjs";
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import {MatFormField, MatInputModule} from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MockAuthService } from "../../services/auth/mock-auth.service";
import { IAuthRequest } from "../../models/auth";
import { response } from "express";
import { Router } from '@angular/router';


@Component({
    selector: 'auth-user',
    template: `
    <div class = "register-page">
        <form [formGroup]="signIn_form" novalidate (ngSubmit)="auth()" class = "register-form">
            <label>Авторизация</label>
            <mat-form-field>
                <mat-label>Имя пользователя</mat-label>
                <input matInput name="login"   formControlName="Login" class="register-input"/>
                @if (login.hasError('required')) {
                    <mat-error class = "alert">введите имя</mat-error>
                }
            </mat-form-field>
            <mat-form-field class = "input-field">
                <mat-label>Пароль</mat-label>
                <input matInput name="password" type = "password"   formControlName="Password" class="register-input"/>
                @if (password.hasError('required')) {
                    <mat-error class = "alert">введите пароль</mat-error>
                }
                @if (password.hasError('invalidPassword')) {
                    <mat-error class = "alert">неверный логин или пароль</mat-error>
                }
            </mat-form-field>
            <button mat-button type="submit" class="button">
                Войти
            </button>
        </form>
    </div>
    `,
    styleUrls:['auth.component.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormField,
        MatFormFieldModule,
        CommonModule
    ],
    providers: [
    { provide: AuthService, useClass: MockAuthService }
  ]
})

export class AuthComponent {
    private readonly service = inject(AuthService);
    private readonly router = new Router;

    isIncorrectLogin = false;
    isIncorrectPassword = false;
    signIn_form: FormGroup = new FormGroup({
        "Login": new FormControl("", [Validators.required]),
        "Password": new FormControl("", [Validators.required]),
    });
    auth() {
        if (!this.password.hasError('required') && !this.login.hasError('required')){
            const request: IAuthRequest = {
                name:this.login.value,
                password:this.password.value,
            }
            this.service.auth(request).subscribe({
                next: res => {
                    if (!res.passed){
                        this.password.setErrors({invalidPassword: true});
                    }else{
                        console.log('Вход выполнен:', res.user);
                        this.router.navigate(['/discover']);
                    }
                
                
            }})
            
        }
    }
    get password() {
        return this.signIn_form.get('Password')!;
    }
    get login() {
        return this.signIn_form.get('Login')!;
    }
    
}