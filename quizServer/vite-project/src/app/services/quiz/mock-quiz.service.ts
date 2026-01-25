import { QuizService } from "./quiz.service";
import { IPagination, IPaginationRequest } from "../../models/pagination";
import { Observable, of } from "rxjs";
import { IQuiz, IQuizCreateRequest, IQuizCreateSend, IQuizItem,IQuizDat,IQuizDescription,QuizItemType } from "../../models/quiz";



export class MockQuizService extends QuizService {
    
    /*
    private readonly _quizes: IQuizDat[] = [{id: 0, name:"quiz",description: [{type: QuizItemType.Text,question:"question"}]},
                                            {id: 1, name:"quizselect",description: [{type: QuizItemType.Select,question:"question",options:["var1","var2"]}]},
                                            {id: 2, name:"quizmultyselect",description: [{type: QuizItemType.SelectMany,question:"question",options:["var1","var2"]}]},
                                            {id: 3, name:"quizrange",description: [{type: QuizItemType.Range,question:"question",max:100,min:0}]},
                                            {id: 4, name:"quizdate",description: [{type: QuizItemType.Date,question:"question"}]}];
                                            */
    private readonly _quizes: IQuiz[] = [{id: 0, name:"quiz",description:"question",items: [{type: QuizItemType.Text,id: 1, quizId: 0, placeholder:"answer"}]},
                                            {id: 1, name:"quizselect",description:"question", items: [{type: QuizItemType.Select,id: 1, quizId: 1,options:["var1","var2"]}]},
                                            {id: 2, name:"quizmultyselect",description: "question", items: [{type: QuizItemType.SelectMany,id: 1, quizId: 2,options:["var1","var2"]}]},
                                            {id: 3, name:"quizrange",description: "question", items: [{type: QuizItemType.Range,id: 1, quizId: 3,max:100,min:0}]},
                                            {id: 4, name:"quizdate",description: "question", items: [{type: QuizItemType.Date,id: 1, quizId: 4}]}];
    private readonly _quiz_items: IQuizItem[] = [];
    
    private _quiz_id: number = 5;
    private _quiz_item_id: number = 5;

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
            description: "",
            items: [{type:QuizItemType.Text,id:1,quizId:1,placeholder:''}],
        }
        this._quizes.push(quiz);

        //let quiz_items_id = this._quiz_items.length !== 0 ? this._quiz_items.map(x => x.id).slice(-1)[0] + 1 : 0;
        
        /*
        request.items.forEach(item =>{
            const quiz_item:IQUizItem = {
                ...item,
                quiz_id:this._quiz_id,
                id: this._quiz_item_id++
            }

            this._quiz_items.push(quiz_item);
        });
        this._quiz_id++;
        */
        return of( quiz);
    }

    
}
