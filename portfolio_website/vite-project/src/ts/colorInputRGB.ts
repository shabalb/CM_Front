import iro from '@jaames/iro';

const el = document.getElementById("color-pick") as HTMLElement;

if (el != null){
  const picker =  iro.ColorPicker(el, {
  width: 280,

  layout: [
    {
      component: iro.ui.Wheel,
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: "saturation", 
      },
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: "value",
      },
    },
  ],
});
}

