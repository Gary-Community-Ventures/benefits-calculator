import { useState } from 'react';

export interface ITheme {
  primaryColor: string;
  secondaryColor: string;
  terraCottaColor: string;
  lightLavenderBackground: string;
  midBlueColor: string;
  cssVariables: {
    '--primary-color': string;
    '--secondary-color': string;
    '--confirmation-background': string;
    '--main-max-width': string;
    'font-size': string;
    '--main-header-color': string;
    '--light-lavender-background': string;
    '--midBlue-color': string;
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
    terraCottaColor: '#B85A27',
    lightLavenderBackground: '#FBF9FC',
    midBlueColor: '#41528C',
    cssVariables: {
      '--primary-color': '#037A93',
      '--secondary-color': '4ECDC4',
      '--confirmation-background': '#D3F2F0',
      '--main-max-width': '1310px',
      'font-size': '16px',
      '--main-header-color': '#B85A27',
      '--light-lavender-background': '#FBF9FC',
      '--midBlue-color': '#41528C',
    },
  },
  twoOneOne: {
    primaryColor: '#005191',
    secondaryColor: '#539ED0',
    terraCottaColor: '#B85A27',
    lightLavenderBackground: '#FBF9FC',
    midBlueColor: '#41528C',
    cssVariables: {
      '--primary-color': '#005191',
      '--secondary-color': '#539ED0',
      '--confirmation-background': '#D4E7F2',
      '--main-max-width': '1310px',
      'font-size': '18px',
      '--main-header-color': '#B85A27',
      '--light-lavender-background': '#FBF9FC',
      '--midBlue-color': '#41528C',
    },
  },
};

type ThemeReturnType = [ITheme, React.Dispatch<React.SetStateAction<'default' | 'twoOneOne'>>, any];

function generateMuiOverides(theme: ITheme) {
  const blueColor = theme.primaryColor;
  const greenColor = theme.secondaryColor;
  const blackColor = '#2A2B2A';
  const midBlue = theme.midBlueColor;

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
              color: midBlue,
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
