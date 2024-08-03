import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  applyTheme,
} from "./node_modules/@material/material-color-utilities/index.js";
// } from "@material/material-color-utilities/index.js";

const materialTheme = document.createElement("style");
materialTheme.setAttribute("id", "material-theme");
document.head.appendChild(materialTheme);

function colorSchemeHCT(hexColor) {
  const sourceColor = argbFromHex(hexColor);
  const theme = themeFromSourceColor(sourceColor);
  const { palettes } = theme;

  let cssText = "";

  const newTone = (tone) => {
    switch (tone) {
      case 90:
        return 5;
      case 95:
        return 4;
      case 99:
        return 1;
      default:
        return 10;
    }
  };

  const addColorVars = (paletteName, palette) => {
    for (let tone = 10; tone <= 100; tone += newTone(tone)) {
      const color = palette.tone(tone);
      const colorHex = hexFromArgb(color);
      cssText += `--${paletteName}-${tone}: ${colorHex}; `;
    }
  };

  addColorVars("primary", palettes.primary);
  addColorVars("secondary", palettes.secondary);
  addColorVars("tertiary", palettes.tertiary);
  addColorVars("neutral", palettes.neutral);
  addColorVars("neutral-variant", palettes.neutralVariant);

  materialTheme.textContent = `:root { ${cssText} }`;
}

function colorSchemeImg(path) {
  const img = document.createElement("img");
  img.crossOrigin = "Anonymous";
  img.src = path;

  img.addEventListener("load", () => {
    const vibrant = new Vibrant(img);
    const swatches = vibrant.swatches();
    const primary = swatches.Vibrant?.getHex() ?? swatches.DarkVibrant?.getHex() ?? swatches.LightVibrant?.getHex();
    colorSchemeHCT(primary);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

colorSchemeHCT("#319acb");

document.body.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
