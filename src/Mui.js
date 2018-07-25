import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0077C5',
      contrastText: '#fff'
    },
    secondary: {
      main: '#2ca01c',
      contrastText: '#fff'
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 12,
  },
});

export default muiTheme;
