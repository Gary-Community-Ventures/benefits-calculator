import { useState } from 'react';

export interface ITheme {
  primaryColor: string;
  secondaryColor: string;
  midBlueColor: string;
  secondaryBackgroundColor: string;
  creamColor: string;
  hoverColor: string;
  outlineHoverBackgroundColor: string;
  outlineHoverColor: string;
  progressBarColor: string;
  cssVariables: {
    '--primary-color': string;
    '--secondary-color': string;
    '--secondary-background-color': string;
    '--cream-color': string;
    '--main-max-width': string;
    'font-size': string;
    '--main-header-color': string;
    '--midBlue-color': string;
    '--hover-color': string;
    '--icon-color': string;
    '--secondary-icon-color': string;
    '--option-card-hover-font-color': string;
    '--link-color': string;
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
    midBlueColor: '#41528C',
    hoverColor: '#ECDEED',
    outlineHoverColor: '#293457',
    outlineHoverBackgroundColor: '#ECDEED',
    progressBarColor: '#D6743F',
    cssVariables: {
      '--primary-color': '#293457',
      '--secondary-color': '#B85A27',
      '--secondary-background-color': '#FBF9FC',
      '--cream-color': '#F9EFE6',
      '--main-max-width': '1310px',
      'font-size': '16px',
      '--main-header-color': '#B85A27',
      '--midBlue-color': '#41528C',
      '--hover-color': '#ECDEED',
      '--icon-color': '#D6743F',
      '--secondary-icon-color': '#D6743F',
      '--option-card-hover-font-color': '#1D1C1E',
      '--link-color': '#41528C',
    },
  },
  twoOneOne: {
    primaryColor: '#005191',
    secondaryColor: '#005191',
    midBlueColor: '#005191',
    secondaryBackgroundColor: '#F7F7F7',
    creamColor: '#F9EFE6',
    hoverColor: '#FFFFFF',
    outlineHoverBackgroundColor: '#005191',
    outlineHoverColor: '#FFFFFF',
    progressBarColor: '#539ED0',
    cssVariables: {
      '--primary-color': '#005191',
      '--secondary-color': '#005191',
      '--secondary-background-color': '#F7F7F7',
      '--cream-color': '#F9EFE6',
      '--main-max-width': '1310px',
      'font-size': '18px',
      '--main-header-color': '#B85A27',
      '--midBlue-color': '#41528C',
      '--hover-color': '#EFEFEF',
      '--icon-color': '#ff443b',
      '--secondary-icon-color': '#005191',
      '--option-card-hover-font-color': '#1D1C1E',
      '--link-color': '#41528C',
    },
  },
};

type ThemeReturnType = [ITheme, React.Dispatch<React.SetStateAction<'default' | 'twoOneOne'>>, any];

function generateMuiOverides(theme: ITheme) {
  const deepBlueColor = theme.primaryColor;
  const darkTerraCottaColor = theme.secondaryColor;
  const blackColor = '#2A2B2A';
  const midBlue = theme.midBlueColor;
  const lavenderColor = theme.hoverColor;

  return {
    palette: {
      primary: {
        main: deepBlueColor,
      },
      secondary: {
        main: darkTerraCottaColor,
      },
    },
    components: {
      // Name of the component
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        variants: [
          {
            props: { variant: 'contained' },
            style: {
              backgroundColor: deepBlueColor,
              border: '1px solid black',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontFamily: 'Open Sans',
              ':hover': {
                backgroundColor: lavenderColor,
                color: deepBlueColor,
              },
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              backgroundColor: 'transparent',
              color: midBlue,
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontFamily: 'Open Sans',
              ':hover': {
                backgroundColor: theme.outlineHoverBackgroundColor,
                color: theme.outlineHoverColor,
                border: 'none',
              },
            },
          },
        ],
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
              color: deepBlueColor,
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
