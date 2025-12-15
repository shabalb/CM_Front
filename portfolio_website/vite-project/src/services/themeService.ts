import type { Thema } from '../models/thema.ts';

export interface IThemaService {
    //static savedThema:string ="";
    getThema(): Promise<readonly Thema[]>;
}