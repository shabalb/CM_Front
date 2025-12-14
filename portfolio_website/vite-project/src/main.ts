import './style.scss';
import './ts/scroll.ts';
import './ts/hummenu.ts';
import './ts/inputcheck.ts';
import './ts/lightmenu.ts';
import './ts/updateClock.ts';
import './ts/switherThems.ts';
import { MockSkillService } from './models/mockSkills';
import { SetImage, SetPicture } from './ts/setSkills';
import * as set from './ts/setSkills';
import './ts/colorInput.ts'
//import './ts/colorInputRGB.ts'


const body = document.body;
const seting = new MockSkillService();


    const skills = await seting.getSkills();
    skills.forEach(skill =>{
        const img = SetImage(skill);
        //body.append(img);
        SetPicture(skill);
        set.SetRefs(skill);
})


