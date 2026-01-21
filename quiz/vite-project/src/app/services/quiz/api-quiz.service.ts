import { QuizService } from "./quiz.service";
import { IPagination, IPaginationRequest } from "../../models/pagination";
import { Observable, of } from "rxjs";
import { IQuiz, IQuizCreateRequest, IQuizCreateSend, IQUizItem,IQuizDat,IQuizDescription,QuizItemType } from "../../models/quiz";
import { Injectable,inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api } from "../api/api";



@Injectable()
export class ApiQuizService extends QuizService{
    private readonly httpClient = inject(HttpClient);
    private readonly apiConfig = inject(Api);

    public override getItems (request: IPaginationRequest):Observable<IPagination<IQuizDat>>{
        return this.httpClient.get<IPagination<IQuizDat>>(`${this.apiConfig.getUrl()}api/quizes?pageNumber=${request.page}&pagesize=${request.page_size}`)
    }
    public override create(request: IQuizCreateSend): Observable<IQuizDat> {
        return this.httpClient.post<IQuizDat>(`${this.apiConfig.getUrl()}api/quizes`,request);
    }

}