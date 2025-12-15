import { MockThemaService } from "../models/mockThema";

MockThemaService.subscribe((thema) => {
  const color = document.documentElement.style;
  color.setProperty("--main-background-color", thema.mainColor);
  color.setProperty("--content-background", thema.contentBackGrColor);
  color.setProperty("--content-text", thema.text);
  color.setProperty("--topbar-color", thema.barColor);
  localStorage.setItem("usertheme", thema.mainColor);
});
