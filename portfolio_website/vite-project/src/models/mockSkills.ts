import type { Skills } from './skills.ts';
import type { ISkillService } from '../services/skillServices.js';
//import img from '../image3х4.jpg';


export class MockSkillService implements ISkillService{
    async getSkills(): Promise<readonly Skills[]> {
        return [{icon:'image3х4.jpg'}];
        //return [{icon:'../icons/image3x4.jpg'}];
        //return [{icon:img}];
    }
}