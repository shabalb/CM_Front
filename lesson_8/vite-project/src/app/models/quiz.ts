export interface IQuiz {
    readonly id: number;
    readonly name: string;
    readonly description: string;
}

export enum QuizItemType {
    Text = 'text',
    Select = 'select',
    SelectMany = 'select_many',
    Range = 'range',
    Date = 'date'
}

export interface IQUizItem {
    readonly id: number;
    readonly quiz_id: number;
    readonly type: QuizItemType;
}

export interface IQuizItemRequest {
    readonly type: QuizItemType;
}

/*
export interface IQuizCreateRequest {
    readonly name: string;
    readonly descriotion: string;
    readonly items: readonly IQuizItemRequest[];
}
*/
/*
export interface IQuizDescription{
    readonly question: string;
    readonly answer: string;
}*/
export interface ITextQuestion {
    readonly type: QuizItemType.Text;
    readonly question: string;
}

export interface ISelectQuestion {
    readonly type: QuizItemType.Select;
    readonly question: string;
    readonly options: readonly string[];
}

export interface IMultySelectQuestion {
    readonly type: QuizItemType.SelectMany;
    readonly question: string;
    readonly options: readonly string[];
}

export interface IRangeQuestion {
    readonly type: QuizItemType.Range;
    readonly question: string;
    readonly max: number;
    readonly min: number;
}

export interface IDateQuestion {
    readonly type: QuizItemType.Date;
    readonly question: string;
}

export type IQuizDescription =
  | ITextQuestion
  | ISelectQuestion
  | IMultySelectQuestion
  | IRangeQuestion
  | IDateQuestion;


export interface IQuizCreateRequest {
    readonly name: string;
    readonly description: string;
    readonly items: readonly IQuizItemRequest[];
}

export interface IQuizCreateSend {
    readonly name: string;
    readonly description: readonly IQuizDescription[];
    readonly items: readonly IQuizItemRequest[];
}

export interface IQuizDat {
    readonly id: number;
    readonly name: string;
    readonly description: readonly IQuizDescription[];
}