import { SimplePaletteColorOptions, Color, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteColorOptions
    extends SimplePaletteColorOptions, Partial<Color> {
    lighter?: string;
    darker?: string;
  }
}