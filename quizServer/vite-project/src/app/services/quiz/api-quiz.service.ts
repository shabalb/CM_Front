import { QuizService } from "./quiz.service";
import { IPagination, IPaginationRequest } from "../../models/pagination";
import { Observable, of } from "rxjs";
import { IQuiz, IQuizCreateRequest, IQuizCreateSend, IQuizItem,IQuizDat,IQuizDescription,QuizItemType } from "../../models/quiz";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api } from "../api/api";


@Injectable()
export class ApiQuizService extends QuizService {
    private readonly httpClient = inject(HttpClient);
    private readonly apiConfig = inject(Api)

    

    //public getItems (request: IPaginationRequest):Observable<IPagination<IQuizDat>>{
    //    return this.httpClient.get<IPagination<IQuizDat>>(`${this.apiConfig.getUrl()}/api/quizes?pageNumber=${request.page}&pageSize=${request.page_size}`);
    //}
    public getItems (request: IPaginationRequest):Observable<IPagination<IQuiz>>{
        return this.httpClient.get<IPagination<IQuiz>>(`${this.apiConfig.getUrl()}/api/quizes?pageNumber=${request.page}&pageSize=${request.page_size}`);
    }
    public override create(request: IQuizCreateRequest): Observable<IQuiz> {
        return this.httpClient.post<IQuiz>(`${this.apiConfig.getUrl()}/api/quizes`,request);
    }

    
}
