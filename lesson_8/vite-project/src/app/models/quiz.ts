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

export interface IQuizCreateRequest {
    readonly name: string;
    readonly descriotion: string;
    readonly items: readonly IQuizItemRequest[];
}