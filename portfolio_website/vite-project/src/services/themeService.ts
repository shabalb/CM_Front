import type { Thema } from '../models/thema.ts';

export interface IThemaService {
    getThema(): Promise<readonly Thema[]>;
}