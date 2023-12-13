import { useState } from 'react';

export interface ITheme {
  primaryColor: string;
  secondaryColor: string;
  terraCottaColor: string;
  midBlueColor: string;
  secondaryBackgroundColor: string;
  creamColor: string;
  cssVariables: {
    '--primary-color': string;
    '--secondary-color': string;
    '--confirmation-background': string;
    '--secondary-background-color': string;
    '--cream-color': string;
    '--main-max-width': string;
    'font-size': string;
    '--main-header-color': string;
    '--midBlue-color': string;
    '--option-card-background-color': string;
    '--option-card-hover-background-color': string;
    '--option-card-hover-font-color': string;
    '--option-card-icon-fill-color': string;
    '--selected-option-card-background-color': string;
    '--selected-option-card-font-color': string;
    '--add-another-income-button-hover-color': string;
  };
}

interface IThemes {
  default: ITheme;
  twoOneOne: ITheme;
}

const themes: IThemes = {
  default: {
    primaryColor: '#293457',
    secondaryColor: '#B85A27',
    secondaryBackgroundColor: '#FBF9FC',
    creamColor: '#F9EFE6',
    terraCottaColor: '#B85A27',
    midBlueColor: '#41528C',
    cssVariables: {
      '--primary-color': '#293457',
      '--secondary-color': '#B85A27',
      '--confirmation-background': '#D3F2F0',
      '--secondary-background-color': '#FBF9FC',
      '--cream-color': '#F9EFE6',
      '--main-max-width': '1310px',
      'font-size': '16px',
      '--main-header-color': '#B85A27',
      '--midBlue-color': '#41528C',
      '--option-card-background-color': '#FFFFFF',
      '--option-card-hover-background-color': '#ECDEED',
      '--option-card-hover-font-color': '#1D1C1E',
      '--option-card-icon-fill-color': '#D6743F',
      '--selected-option-card-background-color': '#293457',
      '--selected-option-card-font-color': '#FFFFFF',
      '--add-another-income-button-hover-color': '#ECDEED',
    },
  },
  twoOneOne: {
    primaryColor: '#005191',
    secondaryColor: '#539ED0',
    terraCottaColor: '#B85A27',
    midBlueColor: '#41528C',
    secondaryBackgroundColor: '#FBF9FC',
    creamColor: '#F9EFE6',
    cssVariables: {
      '--primary-color': '#005191',
      '--secondary-color': '#539ED0',
      '--confirmation-background': '#D4E7F2',
      '--secondary-background-color': '#FBF9FC',
      '--cream-color': '#F9EFE6',
      '--main-max-width': '1310px',
      'font-size': '18px',
      '--main-header-color': '#B85A27',
      '--midBlue-color': '#41528C',
      '--option-card-background-color': '#FFFFFF',
      '--option-card-hover-background-color': '#ECDEED',
      '--option-card-hover-font-color': '#1D1C1E',
      '--option-card-icon-fill-color': '#D6743F',
      '--selected-option-card-background-color': '#293457',
      '--selected-option-card-font-color': '#FFFFFF',
      '--add-another-income-button-hover-color': '#ECDEED',
    },
  },
};

type ThemeReturnType = [ITheme, React.Dispatch<React.SetStateAction<'default' | 'twoOneOne'>>, any];

function generateMuiOverides(theme: ITheme) {
  const deepBlueColor = theme.primaryColor;
  const darkTerraCottaColor = theme.secondaryColor;
  const blackColor = '#2A2B2A';
  const midBlue = theme.midBlueColor;

  return {
    palette: {
      primary: {
        main: deepBlueColor,
      },
    },
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: deepBlueColor,
            ':hover': {
              backgroundColor: darkTerraCottaColor,
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
              color: midBlue,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: deepBlueColor,
            '&:hover': {
              color: darkTerraCottaColor,
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
