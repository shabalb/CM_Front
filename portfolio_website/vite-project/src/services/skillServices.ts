import type { Skills } from "../models/skills.ts";

export interface ISkillService {
  getSkills(): Promise<readonly Skills[]>;
}
