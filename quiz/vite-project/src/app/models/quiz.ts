export interface IQuiz {
    readonly id: number;
    readonly name: string;
    readonly description: string;
}

export enum QuizItemType {
    Text = 'text',
    Select = 'select',
    SelectMany = 'select_many',
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
    readonly answer: string;
}

export interface ISelectQuestion {
    readonly type: QuizItemType.Select;
    readonly question: string;
    readonly options: readonly string[];
    readonly correctOptionIndex: number;
}

export type IQuizDescription =
  | ITextQuestion
  | ISelectQuestion;


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