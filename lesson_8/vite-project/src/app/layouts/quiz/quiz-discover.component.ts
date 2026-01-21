import { Component, computed, inject, signal, Signal } from "@angular/core";
import { QuizService } from "../../services/quiz/quiz.service";
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from "rxjs";
import { IQuiz, IQuizCreateRequest, QuizItemType, IQuizCreateSend, IQuizDescription, IQuizDat } from "../../models/quiz";
import { IPaginationRequest } from "../../models/pagination";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IPagination } from "../../models/pagination";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from "@angular/forms";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from "@angular/material/input";



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
                @for (item of r.items; track item.id) {
                    @if (item.description[0].type == QuizItemType.Text){
                        <div class = "quiz-item">
                            <label class="item-name">
                                {{item.id}}. {{item.name}}
                            </label>
                            <label class="item-question">
                                {{item.description[0].question}}
                            </label>
                        </div>
                    }
                    @if (item.description[0].type == QuizItemType.Select){
                        <div class = "quiz-item">
                            <label class="item-name">
                                {{item.id}}. {{item.name}}
                            </label>
                            <label class="item-question">
                                {{item.description[0].question}}
                            </label>
                        </div>
                    }
                }
                <button mat-button (click)="showFields()" class = "button-add"><mat-icon > add</mat-icon></button>
                

                <form [formGroup]="quiz_input_form" novalidate (ngSubmit)="send()" class = "quiz-form">
                    
                    <div  [hidden]="!isAddingNew">
                    <select [formControl]="modeControl" (select)="changeMode()" class="select-mode">
                        <option value="text">текстовый</option>
                        <option value="select">выбор</option>
                        <option value="multyselect">выбор несколько</option>
                    </select>
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
                            <div class="input-container">
                                <label>Ответ</label>
                                <input name="answer"   formControlName="quizAnswer" class="input-answer"/>
                                <label id = "answer-alert" class = "alert" [class.hidden]="!isincorrectAnswer">alert</label>
                            </div>
                        }
                        @if (modeControl.value === "select"){
                            <div  class="input-container">
                                <label>Вопрос</label>
                                <textarea name="question"   formControlName="quizContent" class="input-question" rows = "10"></textarea>
                                <label id = "question-alert" class = "alert" [class.hidden]="!isincorrectQuestion">alert</label>
                            </div>
                            
                            <label>Варианты</label>
                            <div formArrayName="answers">
                                @for (control of variants.controls; let i = $index;  track $index) {
                                
                                    
                                
                                    <div class="input-answer">
                                        <mat-radio-button [value]="i+1">{{i+1}}</mat-radio-button>
                                        
                                        <input type="text" [formControlName]="i" placeholder="вариант"/>

                                        <button mat-button (click)="removeVariant(i)">
                                          <mat-icon fontSet="material-icons">clear</mat-icon>
                                        </button>
                                    </div>
                                
                                }
                            </div>
                            <button mat-button (click)="addVariant()" ><mat-icon fontSet="material-icons"> add</mat-icon></button>

                            

                            
                        }

                        @if (modeControl.value === "multyselect"){
                            <div  class="input-container">
                                <label>Вопрос</label>
                                <textarea name="question"   formControlName="quizContent" class="input-question" rows = "10"></textarea>
                                <label id = "question-alert" class = "alert" [class.hidden]="!isincorrectQuestion">alert</label>
                            </div>
                            
                            <label>Варианты</label>
                            <div formArrayName="variantsMultySelect">
                                @for (control of multyVariants.controls; let i = $index;  track $index) {
                                
                                  <div class="input-answer" [formGroupName]="i">
                                    <mat-checkbox formControlName="correct"> {{i+1}} </mat-checkbox>
                                    <input type="text" formControlName="variant" placeholder="вариант" />
                                
                                    <button mat-button (click)="removeMultyVariant(i)">
                                      <mat-icon fontSet="material-icons">clear</mat-icon>
                                    </button>
                                  </div>
                                
                                }
                            </div>
                            <button mat-button (click)="addMultyVariant()" type = "button" ><mat-icon fontSet="material-icons"> add</mat-icon></button>

                            

                            
                        }
                    </div>
                    <button mat-button [hidden]="!isAddingNew" class="button-send">send</button>
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
    MatButtonModule
]

})
export class QuizDiscoverComponent {
    private readonly service = inject(QuizService);
    private readonly router = new Router;
    modeControl = new FormControl<'text' | 'select' | 'multyselect'>('text');
    QuizItemType = QuizItemType;
    

    changeMode(){
        this.variants.clear();
        this.multyVariants.clear();
    }

    protected readonly request: IPaginationRequest = {
        page: 1,
        page_size: 10,
    }

    protected readonly response: Signal<IPagination<IQuizDat> | null> = toSignal(
        this.service.getItems(this.request),
        { initialValue: null }
    )


    protected readonly items: Signal<readonly IQuizDat[]> = computed(() => this.response()?.items ?? []);
    nameMaxLength = 30;
    questionMaxLength = 300;
    answerMaxLength = 10;


    quiz_input_form: FormGroup = new FormGroup({
        quizName: new FormControl("", [Validators.required, Validators.maxLength(this.nameMaxLength)]),
        "quizContent": new FormControl("", [Validators.required, Validators.maxLength(this.questionMaxLength)]),
        "quizAnswer": new FormControl("", [Validators.required, Validators.maxLength(this.answerMaxLength)]),
        "numberOfVar": new FormControl<number | null>(null, [Validators.required]),
        "variants": new FormArray<FormControl<string>>([], [Validators.required]),
        "answerSelect": new FormControl<number | null>(null, [Validators.required]),
        "variantsMultySelect": new FormArray<FormGroup>([]),
        
    });

    get variants(): FormArray<FormControl<string>>{
        return this.quiz_input_form.get("variants") as FormArray<FormControl<string>>;
    }

    get multyVariants(): FormArray<FormGroup>{
        return this.quiz_input_form.get("variantsMultySelect") as FormArray<FormGroup>;
    }

    ngOnInit() {
    this.modeControl!.valueChanges.subscribe(mode => {this.onModeChange();});
    }
    onModeChange() {
        this.variants.clear();
        this.multyVariants.clear();
    }

    addVariant(){
        return this.variants.push(new FormControl<string>("",{nonNullable: true, validators: [Validators.required]}));
    }

    addMultyVariant(){
        
         return this.multyVariants.push(new FormGroup({variant: new FormControl<string>("",{nonNullable: true, validators: [Validators.required]}),
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
    submit() {
        console.log(1);
    }
    showFields() {
        this.isAddingNew = true;
    }
    send() {
        if(this.modeControl.value ==="text"){
            if (this.quiz_input_form.get("quizName")?.errors?.["required"]) {
                this.isincorrectName = true;
                document.getElementById("name-alert")!.textContent = "требуется имя";
            }
            if (this.quiz_input_form.get("quizContent")?.errors?.["required"]) {
                this.isincorrectQuestion = true;
                document.getElementById("question-alert")!.textContent = "требуется вопрос";
            }

            if (this.quiz_input_form.get("quizAnswer")?.errors?.["required"]) {
                this.isincorrectAnswer = true;
                document.getElementById("answer-alert")!.textContent = "требуется ответ";
            }

            if (this.quiz_input_form.get("quizAnswer")?.errors?.["maxlength"]) {
                this.isincorrectAnswer = true;
                document.getElementById("answer-alert")!.textContent = "превышено ограничение в " + this.answerMaxLength + " символов";
            }
            if (this.quiz_input_form.get("quizContent")?.errors?.["maxlength"]) {
                this.isincorrectQuestion = true;
                document.getElementById("question-alert")!.textContent = "превышено ограничение в " + this.questionMaxLength + " символов";
            }
            if (this.quiz_input_form.get("quizName")?.errors?.["maxlength"]) {
                this.isincorrectName = true;
                document.getElementById("name-alert")!.textContent = "превышено ограничение в " + this.nameMaxLength + " символов";
            }
        }

        if (!this.isincorrectName && !this.isincorrectQuestion && !this.isincorrectAnswer) {
            if (this.modeControl.value ==="text"){
                const formValue = this.quiz_input_form.value;
                const request: IQuizCreateSend = {
                    name: formValue.quizName,
                    description: [
                        {
                            type:QuizItemType.Text,
                            question: formValue.quizContent,
                            answer: formValue.quizAnswer
                        }
                    ],
                    items: [
                        { type: QuizItemType.Text }
                    ]
                }

                this.service.create(request).subscribe({
                    next: quiz => {
                        console.log('Отправлено', quiz);

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
            if (this.modeControl.value ==="select"){

            }
        }
        //this.response = toSignal(this.service.getItems(this.request),
        //{ initialValue: null });
    }
    auth(){
        this.router.navigate(['/auth']);
    }
}