import "./style.scss";
import "./ts/scroll.ts";
import "./ts/hummenu.ts";
import "./ts/inputcheck.ts";
import "./ts/lightmenu.ts";
import "./ts/updateClock.ts";
import "./ts/switherThems.ts";
import { MockSkillService } from "./models/mockSkills";
import { SetPicture } from "./ts/setSkills";
import * as set from "./ts/setSkills";
import "./ts/colorInput.ts";
import "./ts/setUserThema";

const seting = new MockSkillService();

const skills = await seting.getSkills();
skills.forEach((skill) => {
  SetPicture(skill);
  set.SetRefs(skill);
});
