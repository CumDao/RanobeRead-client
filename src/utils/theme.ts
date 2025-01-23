import { createTheme } from '@mui/material';

const themeDark = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#666666',
      dark: '#838383',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const themeLight = createTheme({
//   colorSchemes: {
//     dark: false,
//   },
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#bfbaba',
//       light: '#878787',
//     },
//   },
// });

export default themeDark;
