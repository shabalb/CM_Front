import type { Skills } from "../models/skills";

export function SetImage(skill:Skills){
    const img = document.createElement("img");
    img.src = skill.icon;
    img.alt = "document photo";
    img.className = "container-photo photo";
    img.title = "document photo";
    return img;
}