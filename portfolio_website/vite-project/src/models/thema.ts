import Color from "color";

export class Thema {
  default: boolean = true;
  mainColor: string = "black";
  contentBackGrColor: string = "#252525";
  text: string = "#ffffffff";
  barColor: string = "black";
  constructor(userColor: string) {
    const userClr = Color(userColor);
    this.default = false;
    this.mainColor = userColor;
    this.contentBackGrColor = userClr.lighten(0.1).toString();
    const rgb = parseInt(userColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    this.text = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    this.barColor = userClr.darken(0.4).toString();
  }
}
