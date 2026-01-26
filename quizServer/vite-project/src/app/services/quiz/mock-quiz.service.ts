import { QuizService } from './quiz.service';
import { IPagination, IPaginationRequest } from '../../models/pagination';
import { Observable, of } from 'rxjs';
import { IQuiz, IQuizCreateRequest, IQuizItem,QuizItemType } from '../../models/quiz';

export class MockQuizService extends QuizService {
    private readonly _quizes: IQuiz[] = [{id: 0, name:'quiz',description:'question',items: [{type: QuizItemType.Text,id: 1, quizId: 0, placeholder:'answer'}]},
                                            {id: 1, name:'quizselect',description:'question', items: [{type: QuizItemType.Select,id: 1, quizId: 1,options:['var1','var2']}]},
                                            {id: 2, name:'quizmultyselect',description: 'question', items: [{type: QuizItemType.SelectMany,id: 1, quizId: 2,options:['var1','var2']}]},
                                            {id: 3, name:'quizrange',description: 'question', items: [{type: QuizItemType.Range,id: 1, quizId: 3,max:100,min:0}]},
                                            {id: 4, name:'quizdate',description: 'question', items: [{type: QuizItemType.Date,id: 1, quizId: 4}]}];
    private readonly _quiz_items: IQuizItem[] = [];
    
    private _quiz_id: number = 5;
    private _quiz_item_id: number = 5;

    public getItems (request: IPaginationRequest):Observable<IPagination<IQuiz>>{
        return of({
            page: request.page,
            page_size: request.page_size,
            total: this._quizes.length,
            items: this._quizes.slice((request.page - 1) * request.page_size, request.page * request.page_size ),
        });
    }
    public override create(request: IQuizCreateRequest): Observable<IQuiz> {
        
        const quiz: IQuiz = {
            id: this._quiz_id,
            name:request.name,
            description: '',
            items: [{type:QuizItemType.Text,id:1,quizId:1,placeholder:''}],
        };
        this._quizes.push(quiz);
        return of( quiz);
    }

    
}
