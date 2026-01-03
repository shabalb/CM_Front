import { Component, computed, inject, Signal } from "@angular/core";
import { QuizService } from "../../services/quiz/quiz.service";
import {toSignal} from '@angular/core/rxjs-interop'
import { map } from "rxjs";
import { IQuiz } from "../../models/quiz";
import { IPaginationRequest } from "../../models/pagination";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { IPagination } from "../../models/pagination";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component ({
    selector:'app-quiz-discover',
    template: `
        @let r = response();

        @if (r === null) {
            <mat-spinner></mat-spinner>

        } @else {
            <div class = "quiz-list">
                @for (item of r.items; track item.id) {
                    {{item.name}}
                }
            </div>
            <mat-paginator [length]="r.total"
                  [pageSize]="request.page_size"                  
                  aria-label="Select page">
            </mat-paginator>
        }
`,
    styleUrls:['quiz-discover.component.css'],
    imports:[
        MatPaginator
    ]
})
export class QuizDiscoverComponent{
    private readonly service = inject (QuizService);

    protected readonly request: IPaginationRequest = {
        page: 1,
        page_size: 10,
    }

    protected readonly response: Signal<IPagination<IQuiz> | null> =  toSignal(
        this.service.getItems(this.request),
        {initialValue:null}
    )


    protected readonly items: Signal<readonly IQuiz[]> = computed(()=>this.response()?.items ?? []);
}