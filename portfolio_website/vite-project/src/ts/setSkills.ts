import type { Skills } from "../models/skills";

export function SetImage(skill: Skills) {
  const img = document.createElement("img");
  img.src = skill.icon;
  img.alt = "document photo";
  img.className = "container-photo photo";
  img.title = "document photo";
  return img;
}
export function SetPicture(skill: Skills) {
  const img = document.getElementById("Picture") as HTMLImageElement;
  img.src = skill.picture;
  const icon = document.getElementById("Icon") as HTMLImageElement;
  icon.src = skill.icon;
}

export function SetRefs(skill: Skills) {
  const refs = skill.refs;
  const gitContainer = document.getElementById("Grid-git") as HTMLElement;
  for (const ref of refs) {
    const block = document.createElement("div");
    block.className = "grid-item";
    const refBlock = document.createElement("a");
    refBlock.href = ref.refgit;
    refBlock.text = ref.name;
    refBlock.className = "git-projects";
    block.append(refBlock);
    gitContainer.append(block);
  }
}
