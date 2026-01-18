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
import { MatIcon, MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-quiz-discover',
    template: `
    
    
        @let r = response();
        
        <div class = "quiz-window">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        @if (r === null) {
            <mat-spinner></mat-spinner>

        } @else {
            
            <div class = "quiz-list">
                @for (item of r.items; track item.id) {
                    <div class = "quiz-item">
                    {{item.name}}
                    </div>
                }
            <form [formGroup]="quiz_input_form" novalidate (ngSubmit)="send()" class = "quiz-form">
                <button mat-button (click)="showFields()" class = "button-add"><mat-icon > add</mat-icon></button>
                <div  [hidden]="!isAddingNew">
                    <div class="input-container">
                        <label>Имя</label>
                        <input name="name"   formControlName="quizName" class="input-name"/>
                        <label id = "name-alert" class = "alert" [class.hidden]="!isincorrectName">alert</label>
                    </div>
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
        MatIcon
    ]

})
export class QuizDiscoverComponent {
    private readonly service = inject(QuizService);


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
        "quizName": new FormControl("", [Validators.required, Validators.maxLength(this.nameMaxLength)]),
        "quizContent": new FormControl("", [Validators.required, Validators.maxLength(this.questionMaxLength)]),
        "quizAnswer": new FormControl("", [Validators.required, Validators.maxLength(this.answerMaxLength)]),
    });
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
        if (!this.isincorrectName && !this.isincorrectQuestion && !this.isincorrectAnswer) {
            const formValue = this.quiz_input_form.value;
            const request: IQuizCreateSend = {
                name: formValue.name,
                description: [
                    {
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
            })
        }
    }
}