import { Component, computed, inject, signal, WritableSignal,effect, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { IQuiz, IQuizCreateRequest, QuizItemType } from '../../models/quiz';
import { IPaginationRequest } from '../../models/pagination';
import { MatPaginator } from '@angular/material/paginator';
import { IPagination } from '../../models/pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-quiz-discover',
    template: `
        @let r = response();
        <div class = "quiz-window">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        @if (r === null) {
            <mat-spinner></mat-spinner>
        } @else {
            <button mat-button (click)="auth()" class="auth-icon"><mat-icon >account_circle</mat-icon></button>
            <div class = "quiz-list">
                @for (item of r.items; let i = $index; track item.id) {
                    @if (item.items[0].type == QuizItemType.Text){
                        <div class = "quiz-item">
                            <label class="item-name">
                                {{item.id }}. {{item.name}}
                            </label>
                            <label class="item-question">
                                {{item.description}}
                            </label>
                            <form [formGroup]="quiz_send_form.get(item.id)!" novalidate (ngSubmit)="sendAnswer()" class = "quiz-form">
                                <div class="input-container">
                                    <label>Ответ</label>
                                    <input name="name"   formControlName="text" class="input-name"/>
                                </div>
                            </form>
                            <button mat-button class="button-send">Отправить</button>
                        </div>
                    }
                    @if (item.items[0].type == QuizItemType.Select){
                        
                        <div class = "quiz-item">
                            <label class="item-name">
                                {{item.id }}. {{item.name}}
                            </label>
                            <label class="item-question">
                                {{item.description}}
                            </label>
                            <form [formGroup]="quiz_send_form.get(item.id)!" novalidate (ngSubmit)="sendAnswer()" class = "quiz-form">
                                <div class="input-container">
                                    <label>Ответ</label>
                                    @for (variant of item.items[0].options; let i = $index; track $index){
                                        <label ><input  type = "radio"  formControlName="select" [value]="i" /> {{variant}} </label>
                                    }
                                </div>
                            </form>
                            <button mat-button class="button-send">Отправить</button>
                        </div>
                    }
                    @if (item.items[0].type == QuizItemType.SelectMany){
                        
                        <div class = "quiz-item">
                            <label class="item-name">
                                {{item.id }}. {{item.name}}
                            </label>
                            <label class="item-question">
                                {{item.description}}
                            </label>
                            <form [formGroup]="quiz_send_form.get(item.id)!" novalidate (ngSubmit)="sendAnswer()" class = "quiz-form">
                                <div formArrayName="array" class="input-container">
                                    <label>Ответ</label>
                                    @for (variant of item.items[0].options; let i = $index; track $index){
                                        <label><input  type = "checkbox"  [formControlName]="i" /> {{variant}} </label>
                                    }
                                    
                                </div>
                            </form>
                            <button mat-button class="button-send">Отправить</button>
                        </div>
                    }
                    @if (item.items[0].type == QuizItemType.Range){
                        
                        <div class = "quiz-item">
                            <label class="item-name">
                                {{item.id }}. {{item.name}}
                            </label>
                            <label class="item-question">
                                {{item.description}}
                            </label>
                            <form [formGroup]="quiz_send_form.get(item.id)!" novalidate (ngSubmit)="sendAnswer()" class = "quiz-form">
                                <div class="input-container">
                                    <label>Ответ {{quiz_send_form.get(item.id)?.get("numberRange")?.value}}</label>
                                    <input type="range" formControlName="numberRange" [min]="item.items[0].min" [max]="item.items[0].max" step="1" />
                                </div>
                            </form>
                            <button mat-button class="button-send">Отправить</button>
                        </div>
                    }
                    @if (item.items[0].type == QuizItemType.Date){
                        <div class = "quiz-item">
                            <label class="item-name">
                                {{item.id }}. {{item.name}}
                            </label>
                            <label class="item-question">
                                {{item.description}}
                            </label>
                            <form [formGroup]="quiz_send_form.get(item.id)!" novalidate (ngSubmit)="sendAnswer()" class = "quiz-form">
                                <div class="input-container">
                                    <label>Ответ</label>
                                    <mat-form-field>
                                        <mat-label>Choose a date</mat-label>
                                        <input matInput [matDatepicker]="picker" formControlName="date">
                                        <mat-hint>ДД/ММ/ГГГГ</mat-hint>
                                        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                                        <mat-datepicker #picker></mat-datepicker>
                                    </mat-form-field>
                                </div>
                            </form>
                            <button mat-button class="button-send">Отправить</button>
                        </div>
                    }
                }
                
                
                <form [formGroup]="quiz_input_form" novalidate (ngSubmit)="send()" class = "quiz-form">
                    <button mat-button type = "button" (click)="showFields()" class = "button-add"><mat-icon >add</mat-icon></button>
        
                    <div  [hidden]="!isAddingNew">
                    <label> Тип вопроса </label>
                    <select [formControl]="modeControl" (select)="changeMode()" class="select-mode">
                        <option value="text">текстовый</option>
                        <option value="select">выбор</option>
                        <option value="range">диапазон</option>
                        <option value="date">дата</option>
                    </select>
                    <button mat-button (click)="hideFields()" class = "hide-field">
                        <mat-icon fontSet="material-icons">clear</mat-icon>
                    </button>
                        <div class="input-container">
                            <label>Имя</label>
                            <input name="name"   formControlName="quizName" class="input-name"/>
                            <label id = "name-alert" class = "alert" [class.hidden]="!isincorrectName">alert</label>
                        </div>
                        @if (modeControl.value === "text"){
                            <div  class="input-container">
                                <label>Вопрос</label>
                                <textarea name="question"   formControlName="quizContent" class="input-question" rows = "10"></textarea>
                                <label id = "question-alert" class = "alert" [class.hidden]="!isincorrectQuestion">alert</label>
                            </div>
                        }
                        @if (modeControl.value === "select"){
                            <input type="checkbox" (change)="isMultySelect = !isMultySelect">
                            <label>несколько вариантов</label>
                            <div  class="input-container">
                                <label>Вопрос</label>
                                <textarea name="question"   formControlName="quizContent" class="input-question" rows = "10"></textarea>
                                <label id = "question-alert" class = "alert" [class.hidden]="!isincorrectQuestion">alert</label>
                            </div>
                            
                            <label>Варианты</label>
                            <div formArrayName="variants">
                                @for (control of variants.controls; let i = $index;  track $index) {
                                    <div class="input-answer">
                                        <label>{{i+1}}</label>
                                        <input type="text" [formControlName]="i" placeholder="вариант"/>
                                        <button mat-button (click)="removeVariant(i)">
                                          <mat-icon fontSet="material-icons">clear</mat-icon>
                                        </button>
                                    </div>
                                }
                            </div>
                            <label id = "variant-alert" class = "alert" [class.hidden]="!isenoughVar">alert</label>
                            <button mat-button (click)="addVariant()" type = "button" ><mat-icon fontSet="material-icons"> add</mat-icon></button>

                        }

                        @if (modeControl.value === "range"){
                            <div  class="input-container">
                                <label>Вопрос</label>
                                <textarea name="question"   formControlName="quizContent" class="input-question" rows = "10"></textarea>
                                <label id = "question-alert" class = "alert" [class.hidden]="!isincorrectQuestion">alert</label>
                                <label> Минимальное значение</label>
                                <input name="min"   formControlName="minRange" class="input-name"/>
                                <label>Максимальное значение</label>
                                <input name="max"   formControlName="maxRange" class="input-name"/>
                                <label id = "range-alert" class = "alert" [class.hidden]="!isincorrectRange">alert</label>
                            </div>
                        }
                        @if (modeControl.value === "date"){
                            <div  class="input-container">
                                <label>Вопрос</label>
                                <textarea name="question"   formControlName="quizContent" class="input-question" rows = "10"></textarea>
                                <label id = "question-alert" class = "alert" [class.hidden]="!isincorrectQuestion">alert</label>
                            </div>
                        }
                    </div>
                    <button mat-button [hidden]="!isAddingNew" class="button-send">Создать</button>
                </form>
            </div>
                
            <div class="paginator">
                <mat-paginator [length]="r.total"
                      [pageSize]="request.page_size"                  
                      aria-label="Select page">
                </mat-paginator>
            </div>
        }   
        </div>
`,
    styleUrls: ['quiz-discover.component.css'],
    imports: [
    MatPaginator,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatIcon,
    MatAnchor,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSliderModule,
    MatNativeDateModule
]

})
export class QuizDiscoverComponent implements OnInit {
    private readonly service = inject(QuizService);
    private readonly router = new Router;
    modeControl = new FormControl<'text' | 'select' | 'multyselect'| 'range' | 'date'>('text');
    QuizItemType = QuizItemType;
    isMultySelect = false;

    changeMode(){
        this.variants.clear();
        this.multyVariants.clear();
        this.isincorrectQuestion = true;
        this.isincorrectName = true;
        this.isincorrectAnswer = true;
    }

    protected readonly request: IPaginationRequest = {
        page: 1,
        page_size: 10,
    };

    protected readonly response: WritableSignal<IPagination<IQuiz> | null> = signal(null);

    readonly items = computed(() => this.response()?.items ?? []);

    nameMaxLength = 30;
    questionMaxLength = 300;
    answerMaxLength = 10;

    quiz_send_form = new Map<number, FormGroup>();
    
    readonly initEffect = effect((): void => {
        const currentItems = this.items();
        
        for (const question of currentItems){
            let input1: FormGroup = new FormGroup({});
            if (question.items[0].type === QuizItemType.Text){
                input1 = new FormGroup ({text: new FormControl('',Validators.required)});
                this.quiz_send_form.set(question.id,input1);
            }
            if (question.items[0].type === QuizItemType.Select){
                input1 = new FormGroup ({select: new FormControl<number|null>(null,Validators.required)});
                this.quiz_send_form.set(question.id,input1);
            }
            if (question.items[0].type === QuizItemType.SelectMany){
                const inputmany: FormArray = new FormArray<FormControl>([]);
                for(const opt of question.items[0].options){
                    inputmany.push(new FormControl(false));
                }
                this.quiz_send_form.set(question.id,new FormGroup({array: inputmany}));
            }
            if (question.items[0].type === QuizItemType.Range){
                input1 = new FormGroup ({numberRange: new FormControl<number>((question.items[0].max+question.items[0].min)/2,Validators.required)});
                this.quiz_send_form.set(question.id,input1);
            }
            if (question.items[0].type === QuizItemType.Date){
                input1 = new FormGroup ({date: new FormControl<Date|null>(null,Validators.required)});
                this.quiz_send_form.set(question.id,input1);
            }
            
        }
    });
    
    quiz_input_form: FormGroup = new FormGroup({
        quizName: new FormControl('', [Validators.required, Validators.maxLength(this.nameMaxLength)]),
        'quizContent': new FormControl('', [Validators.required, Validators.maxLength(this.questionMaxLength)]),
        'quizAnswer': new FormControl('', [Validators.required, Validators.maxLength(this.answerMaxLength)]),
        'numberOfVar': new FormControl<number | null>(null, [Validators.required]),
        'variants': new FormArray<FormControl<string>>([], [Validators.required]),
        'answerSelect': new FormControl<number | null>(null, [Validators.required]),
        'variantsMultySelect': new FormArray<FormGroup>([]),
        'minRange': new FormControl<number >(0, Validators.required),
        'maxRange': new FormControl<number >(0, Validators.required),
        
    });

    get variants(): FormArray<FormControl<string>>{
        return this.quiz_input_form.get('variants') as FormArray<FormControl<string>>;
    }

    get multyVariants(): FormArray<FormGroup>{
        return this.quiz_input_form.get('variantsMultySelect') as FormArray<FormGroup>;
    }

    ngOnInit() {
        this.service.getItems(this.request).subscribe(data => this.response.set(data));
        this.modeControl!.valueChanges.subscribe(mode => {this.onModeChange();});
    }
    onModeChange() {
        this.variants.clear();
        this.multyVariants.clear();
    }

    addVariant(){
        return this.variants.push(new FormControl<string>('',{nonNullable: true, validators: [Validators.required]}));
    }

    addMultyVariant(){
        
         return this.multyVariants.push(new FormGroup({variant: new FormControl<string>('',{nonNullable: true, validators: [Validators.required]}),
                                                       correct: new FormControl(false)}));
    }

    removeMultyVariant(i:number){
        this.multyVariants.removeAt(i);
    }

    removeVariant(i:number){
        this.variants.removeAt(i);
    }

    isAddingNew: boolean = false;
    isincorrectName: boolean = false;
    isincorrectQuestion: boolean = false;
    isincorrectAnswer: boolean = false;
    isenoughVar: boolean = false;
    isincorrectRange: boolean = false;
    submit() {
        console.log(1);
    }
    showFields() {
        this.isAddingNew = true;
    }

    hideFields() {
        this.isAddingNew = false;
    }

    sendAnswer(){
    }

    send() {
        this.isincorrectName = false;
        this.isincorrectQuestion = false;
        this.isenoughVar = false;
        this.isincorrectRange = false;
        if (this.quiz_input_form.get('quizName')?.errors?.['required']) {
            this.isincorrectName = true;
            document.getElementById('name-alert')!.textContent = 'требуется имя';
        }
        if (this.quiz_input_form.get('quizContent')?.errors?.['required']) {
            this.isincorrectQuestion = true;
            document.getElementById('question-alert')!.textContent = 'требуется вопрос';
        }
        if (this.quiz_input_form.get('quizContent')?.errors?.['maxlength']) {
            this.isincorrectQuestion = true;
            document.getElementById('question-alert')!.textContent = 'превышено ограничение в ' + this.questionMaxLength + ' символов';
        }
        if (this.quiz_input_form.get('quizName')?.errors?.['maxlength']) {
            this.isincorrectName = true;
            document.getElementById('name-alert')!.textContent = 'превышено ограничение в ' + this.nameMaxLength + ' символов';
        }

        if (this.modeControl.value === 'select'){
            if (this.variants.controls.length < 2){
                this.isenoughVar = true;
                document.getElementById('variant-alert')!.textContent = 'недостаточно вариантов';
            }
        }

        if (this.modeControl.value === 'range'){
            if (this.quiz_input_form.get('minRange')?.errors?.['required'] || this.quiz_input_form.get('maxRange')?.errors?.['required']) {
                this.isincorrectName = true;
                document.getElementById('range-alert')!.textContent = 'некорректный диапазон';
            }
        }

        if (!this.isincorrectName && !this.isincorrectQuestion && !this.isincorrectAnswer && !this.isincorrectRange && !this.isenoughVar) {
            if (this.modeControl.value ==='text'){
                const formValue = this.quiz_input_form.value;
                const request: IQuizCreateRequest = {
                    name: formValue.quizName,
                    description: formValue.quizContent,
                    items: [
                        {
                            type:QuizItemType.Text,
                            id: 1,
                            quizId: 1,
                            placeholder: formValue.quizContent,
                        }
                    ]
                };

                this.service.create(request).subscribe({
                    next: quiz => {
                        console.log('Отправлено', quiz);

                        this.service.getItems(this.request).subscribe
                        (data => this.response.set(data));

                        this.quiz_input_form.reset({
                            quizName: '',
                            quizContent: '',
                            quizAnswer: ''
                        });
                    },
                    error: err => {
                        console.error('Ошибка отправки', err);
                    }
                    
                });
            }
            if (this.modeControl.value ==='select'){
                const formValue = this.quiz_input_form.value;
                const variants: string[] = this.variants.value;
                if (!this.isMultySelect){
                    const request: IQuizCreateRequest = {
                        name: formValue.quizName,
                        description: formValue.quizContent,
                        items: [
                            {
                                type:QuizItemType.Select,
                                id: 1,
                                quizId: 1,
                                options: variants,
                            }
                        ]
                    };

                    this.service.create(request).subscribe({
                        next: quiz => {
                            console.log('Отправлено', quiz);
                            this.service.getItems(this.request).subscribe
                            (data => this.response.set(data));

                            this.quiz_input_form.reset({
                                quizName: '',
                                quizContent: '',

                            });
                            this.multyVariants.controls
                            .map(control => control.get('variant')?.reset('') );

                        },
                        error: err => {
                            console.error('Ошибка отправки', err);
                        }
                    });
                }
                if (this.isMultySelect){
                    const request: IQuizCreateRequest = {
                        name: formValue.quizName,
                        description: formValue.quizContent,
                        items: [
                            {
                                type:QuizItemType.SelectMany,
                                id: 1,
                                quizId: 1,
                                options: variants,
                            }
                        ]
                    };
                
                    this.service.create(request).subscribe({
                        next: quiz => {
                            console.log('Отправлено', quiz);
                            this.service.getItems(this.request).subscribe
                            (data => this.response.set(data));

                            this.quiz_input_form.reset({
                                quizName: '',
                                quizContent: '',
                                
                            });
                            this.multyVariants.controls
                            .map(control => control.get('variant')?.reset('') );
                        },
                        error: err => {
                            console.error('Ошибка отправки', err);
                        }
                        
                    });
                }
            }
            if (this.modeControl.value ==='range'){
                const formValue = this.quiz_input_form.value;
                const request: IQuizCreateRequest = {
                        name: formValue.quizName,
                        description: formValue.quizContent,
                        items: [
                            {
                                type:QuizItemType.Range,
                                id: 1,
                                quizId: 1,
                                max: formValue.maxRange,
                                min: formValue.minRange
                            }
                        ]
                    };
                    this.service.create(request).subscribe({
                        next: quiz => {
                            console.log('Отправлено', quiz);
                            this.service.getItems(this.request).subscribe
                            (data => this.response.set(data));

                            this.quiz_input_form.reset({
                                quizName: '',
                                quizContent: '',
                                min: '',
                                max: '',
                            });
                        },
                        error: err => {
                            console.error('Ошибка отправки', err);
                        }
                        
                    });
            }
            if (this.modeControl.value ==='date'){
                const formValue = this.quiz_input_form.value;
                const request: IQuizCreateRequest = {
                        name: formValue.quizName,
                        description: formValue.quizContent,
                        items: [
                            {
                                type:QuizItemType.Date,
                                id: 1,
                                quizId: 1,
                            }
                        ]
                    };
                
                    this.service.create(request).subscribe({
                        next: quiz => {
                            console.log('Отправлено', quiz);
                            this.service.getItems(this.request).subscribe
                            (data => this.response.set(data));

                            this.quiz_input_form.reset({
                                quizName: '',
                                quizContent: '',
                            });
                        },
                        error: err => {
                            console.error('Ошибка отправки', err);
                        }
                        
                    });
            }
        }
    }
    auth(){
        this.router.navigate(['/auth']);
    }
}