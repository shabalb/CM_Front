import type { Skills } from './skills.ts';
import type { ISkillService } from '../services/skillServices.ts';


export class MockSkillService implements ISkillService{
    async getSkills(): Promise<readonly Skills[]> {
        return [{icon:'image3х4.jpg', picture:'cat.jpg',
            refs:[{refgit:'https://github.com/shabalb/Scene2D_',name:'Графический конструктор картинок'},
                  {refgit:'https://github.com/shabalb/PhotoCodeTest',name:'Оптический поток на видео'},
                  {refgit:'https://github.com/shabalb/GatesTask',name:'Асинхронная работа'},
                  {refgit:'https://github.com/shabalb',name:'GitHub'},
                  {refgit:'https://github.com/shabalb',name:'GitHub'},
                  {refgit:'https://github.com/shabalb',name:'GitHub'},
        ]}];
        
    }
}