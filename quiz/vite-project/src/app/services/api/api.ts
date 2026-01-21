import { Injectable } from "@angular/core";

@Injectable()
export abstract class Api{
    public abstract getUrl(): string;
}