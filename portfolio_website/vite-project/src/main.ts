import './style.scss';
import './ts/scroll.ts';
import './ts/hummenu.ts';
import './ts/inputcheck.ts';
import './ts/lightmenu.ts';
import './ts/updateClock.ts';
import './ts/switherThems.ts';
import { MockSkillService } from './models/mockSkills';
import { SetImage } from './ts/setSkills';

const body = document.body;
const seting = new MockSkillService();

async function getimage() {
    const skills = await seting.getSkills();
    skills.forEach(skill =>{
        const img = SetImage(skill);
        body.append(img);
})
}

getimage();

//<img src="image3х4.jpg" alt="document photo" class="container-photo photo" title="document photo">
	