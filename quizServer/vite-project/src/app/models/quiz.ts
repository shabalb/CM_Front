export interface IQuiz {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly items: IQuizItem[];
}

export enum QuizItemType {
    Text = 'text',
    Select = 'select',
    SelectMany = 'select_many',
    Range = 'range',
    Date = 'date'
}

export type IQuizItem =
  | ITextItem
  | ISelectItem
  | IRangeItem
  | IDateItem;

export interface ITextItem{
    readonly type: QuizItemType.Text;
    readonly id: number;
    readonly quizId: number;
    readonly placeholder: string; 
}

export interface ISelectItem{
    readonly type: QuizItemType.Select | QuizItemType.SelectMany;
    readonly id: number;
    readonly quizId: number;
    readonly options: string[]; 
}

export interface IRangeItem{
    readonly type: QuizItemType.Range;
    readonly id: number;
    readonly quizId: number;
    readonly min: number;
    readonly max: number; 
}
export interface IDateItem{
    readonly type: QuizItemType.Date;
    readonly id: number;
    readonly quizId: number; 
}

export type IQuizItemRequest =
  | ITextItemRequest
  | ISelectItemRequest
  | IRangeItemRequest
  | IDateItemRequest;

export interface ITextItemRequest{
    readonly type: QuizItemType.Text;
    readonly id: number;
    readonly quizId: number;
    readonly placeholder: string; 
}

export interface ISelectItemRequest{
    readonly type: QuizItemType.Select | QuizItemType.SelectMany;
    readonly id: number;
    readonly quizId: number;
    readonly options: string[]; 
}

export interface IRangeItemRequest{
    readonly type: QuizItemType.Range;
    readonly id: number;
    readonly quizId: number;
    readonly min: number;
    readonly max: number; 
}
export interface IDateItemRequest{
    readonly type: QuizItemType.Date;
    readonly id: number;
    readonly quizId: number; 
}

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