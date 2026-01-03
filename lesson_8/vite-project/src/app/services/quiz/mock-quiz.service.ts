import { QuizService } from "./quiz.service";
import { IPagination, IPaginationRequest } from "../../models/pagination";
import { Observable, of } from "rxjs";
import { IQuiz, IQuizCreateRequest, IQUizItem } from "../../models/quiz";



export class MockQuizService extends QuizService {
    
    private readonly _quizes: IQuiz[] = [];
    private readonly _quiz_items: IQUizItem[] = [];
    
    private _quiz_id: number = 0;
    private _quiz_item_id: number = 0;

    public getItems (request: IPaginationRequest):Observable<IPagination<IQuiz>>{
        return of({
            page: request.page,
            page_size: request.page_size,
            total: this._quizes.length,
            items: this._quizes.slice((request.page - 1) * request.page_size, request.page * request.page_size ),
        })
    }
    public override create(request: IQuizCreateRequest): Observable<IQuiz> {
        
        //const quiz_id = this._quizes.length !== 0 ? this._quizes.map(x => x.id).slice(-1)[0] + 1 : 0;

        const quiz: IQuiz = {
            id: this._quiz_id,
            name:request.name,
            description: request.descriotion,
        }
        this._quizes.push(quiz);

        //let quiz_items_id = this._quiz_items.length !== 0 ? this._quiz_items.map(x => x.id).slice(-1)[0] + 1 : 0;
        
        request.items.forEach(item =>{
            const quiz_item:IQUizItem = {
                ...item,
                quiz_id:this._quiz_id,
                id: this._quiz_item_id++
            }

            this._quiz_items.push(quiz_item);
        });
        this._quiz_id++;

        return of( quiz);
    }
}
