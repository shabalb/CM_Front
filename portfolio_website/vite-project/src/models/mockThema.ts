import type { Thema } from '../models/thema.ts';
import type { IThemaService } from '../services/themeService.ts';


export class MockThemaService implements IThemaService{
    async getThema(): Promise<readonly Thema[]> {
        return [];
        
    }
}