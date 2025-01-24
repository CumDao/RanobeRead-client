import { createTheme } from '@mui/material';
import { paletteDark, paletteLight } from './palette';

const theme = createTheme({
  colorSchemes: {
    dark: { palette: paletteDark },
    light: { palette: paletteLight },
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});

export default theme;
