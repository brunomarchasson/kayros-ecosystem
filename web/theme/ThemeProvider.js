
import React from 'react';
import {
  createTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import { createComponents } from './components';
import { createPalette } from './palette';
import { createTypography } from './typography';

/**
 * Creates a customized version of Material UI theme.
 *
 * @see https://mui.com/customization/theming/
 * @see https://mui.com/customization/default-theme/
 */
function createTheme(mode) {
  return responsiveFontSizes(createMuiTheme({
    palette: createPalette(mode),
    components: createComponents(mode),
    typography: createTypography(),
  }));
}

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
const ToggleThemeContext = React.createContext(() => { });

function ThemeProvider(props) {
  const [theme, setTheme] = React.useState(() => createTheme('light'));

  const toggleTheme = React.useCallback(() => {
    setTheme((theme) => createTheme(theme.palette.mode === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <MuiThemeProvider theme={ theme }>
      <ToggleThemeContext.Provider value={ toggleTheme }>
        { props.children }
      </ToggleThemeContext.Provider>
    </MuiThemeProvider>
  );
}

export { ThemeProvider, ToggleThemeContext };
