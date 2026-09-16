import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "KarirKit",
  brandUrl: "https://github.com/foxtrot-sevima/KarirKit",
  brandImage: "/assets/logo/karirkit-logo.svg",
  brandTarget: "_self",
});

addons.setConfig({
  theme,
});
