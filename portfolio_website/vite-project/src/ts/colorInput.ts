import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/classic.min.css";
import { MockThemaService } from "../models/mockThema";
import { Thema } from "../models/thema";

const el = document.getElementById("color-plt") as HTMLElement;

if (el != null) {
  const pickr = Pickr.create({
    el,
    theme: "classic",
    closeOnScroll: true,
    components: {
      preview: false,
      opacity: false,
      hue: true,

      interaction: {
        hex: false,
        rgba: false,
        input: false,
        save: true,
      },
    },
  });

  pickr.on("change", (color: Pickr.HSVaColor) => {
    const btn = document.querySelector(".pcr-button") as HTMLElement;
    btn?.style.setProperty("--pickr-color", color.toHEXA().toString());
    MockThemaService.savedThema = new Thema(color.toHEXA().toString());
  });
}
