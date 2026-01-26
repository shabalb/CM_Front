import { Component, inject} from '@angular/core';
import { RegisterService } from '../../services/reguister/registr-service';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MockRegistrService } from '../../services/reguister/mock-registr.service';
import { IRegisterRequest } from '../../models/registration';


@Component({
    selector: 'reguister-user',
    template: `
    <div class = "register-page">
        <form [formGroup]="register_form" novalidate (ngSubmit)="register()" class = "register-form">
            <label>Регистрация</label>
            <mat-form-field>
                <mat-label>Имя пользователя</mat-label>
                <input matInput name="login"   formControlName="Login" class="register-input"/>
                @if (login.hasError('required')) {
                    <mat-error class = "alert">введите имя</mat-error>
                }
            </mat-form-field>
            <mat-form-field>
                <mat-label>Пароль</mat-label>
                <input matInput name="password" type = "password"   formControlName="Password" class="register-input"/>
                @if (password.hasError('required')) {
                    <mat-error class = "alert">введите пароль</mat-error>
                }
            </mat-form-field>
            <button mat-button type="submit" class="button">
                Зарегистрироваться
            </button>
        </form>
    </div>
    `,
    styleUrls:['register-user.component.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormField,
        MatFormFieldModule,
        CommonModule
    ],
    providers: [
    { provide: RegisterService, useClass: MockRegistrService }
  ]
})

export class ReguisterCreateComponent {
    private readonly service = inject(RegisterService);

    isIncorrectLogin = false;
    isIncorrectPassword = false;
    maxLength = 100;
    register_form: FormGroup = new FormGroup({
        'Login': new FormControl('', [Validators.required, Validators.maxLength(this.maxLength)]),
        'Password': new FormControl('', [Validators.required, Validators.maxLength(this.maxLength)]),
    });
    signIn_form: FormGroup = new FormGroup({
        'Login': new FormControl('', [Validators.required, Validators.maxLength(this.maxLength)]),
        'Password': new FormControl('', [Validators.required, Validators.maxLength(this.maxLength)]),
    });
    register() {
        if (!this.password.hasError('required') && !this.login.hasError('required')){
            const request: IRegisterRequest = {
                name:this.login.value,
                password:this.password.value,
            };
            this.service.register(request);
        }
    }
    get password() {
        return this.register_form.get('Password')!;
    }
    get login() {
        return this.register_form.get('Login')!;
    }
    
}