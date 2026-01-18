import { Component, computed, inject, Signal } from "@angular/core";
import { QuizService } from "../../services/quiz/quiz.service";
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from "rxjs";
import { IQuiz, IQuizCreateRequest, QuizItemType, IQuizCreateSend, IQuizDescription, IQuizDat } from "../../models/quiz";
import { IPaginationRequest } from "../../models/pagination";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IPagination } from "../../models/pagination";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import {MatFormField, MatInputModule} from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";

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
    ]
})

export class ReguisterCreateComponent {
    isIncorrectLogin = false;
    isIncorrectPassword = false;
    maxLength = 100;
    register_form: FormGroup = new FormGroup({
        "Login": new FormControl("", [Validators.required, Validators.maxLength(this.maxLength)]),
        "Password": new FormControl("", [Validators.required, Validators.maxLength(this.maxLength)]),
    });
    signIn_form: FormGroup = new FormGroup({
        "Login": new FormControl("", [Validators.required, Validators.maxLength(this.maxLength)]),
        "Password": new FormControl("", [Validators.required, Validators.maxLength(this.maxLength)]),
    });
    register() {

    }
    get password() {
        return this.register_form.get('Password')!;
    }
    get login() {
        return this.register_form.get('Login')!;
    }
}