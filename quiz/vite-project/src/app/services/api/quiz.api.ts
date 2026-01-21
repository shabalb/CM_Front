import { Api } from "./api";

export class QuizApi extends Api{
    public getUrl(): string{
        return "http://localhost:5000/";
    }
}