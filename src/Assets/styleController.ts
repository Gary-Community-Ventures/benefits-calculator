import { useState } from 'react';

export interface ITheme {
  primaryColor: string;
  secondaryColor: string;
  cssVariables: {
    '--primary-color': string;
    '--secondary-color': string;
    '--main-max-width': string;
    'font-size': string;
  };
}

interface IThemes {
  default: ITheme;
  twoOneOne: ITheme;
}

const themes: IThemes = {
  default: {
    primaryColor: '#037A93',
    secondaryColor: '#4ECDC4',
    cssVariables: {
      '--primary-color': '#037A93',
      '--secondary-color': '4ECDC4',
      '--main-max-width': '99999rem',
      'font-size': '16px',
    },
  },
  twoOneOne: {
    primaryColor: '#005191',
    secondaryColor: '#539ED0',
    cssVariables: {
      '--primary-color': '#005191',
      '--secondary-color': '#539ED0',
      '--main-max-width': '1310px',
      'font-size': '18px',
    },
  },
};

type ThemeReturnType = [ITheme, React.Dispatch<React.SetStateAction<'default' | 'twoOneOne'>>, any];

function generateMuiOverides(theme: ITheme) {
  const blueColor = theme.primaryColor;
  const greenColor = theme.secondaryColor;
  const blackColor = '#2A2B2A';

  return {
    palette: {
      primary: {
        main: blueColor,
      },
    },
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: blueColor,
            ':hover': {
              backgroundColor: greenColor,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: blackColor,
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: blueColor,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: blueColor,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: blueColor,
            '&:hover': {
              color: greenColor,
            },
          },
        },
      },
    },
  };
}

export default function useStyle(initialStyle: keyof IThemes): ThemeReturnType {
  const [themeName, setTheme] = useState(initialStyle);

  const theme = themes[themeName];

  for (const [key, value] of Object.entries(theme.cssVariables)) {
    document.documentElement.style.setProperty(key, value);
  }

  const styleOverrides = generateMuiOverides(theme);

  return [theme, setTheme, styleOverrides];
}
