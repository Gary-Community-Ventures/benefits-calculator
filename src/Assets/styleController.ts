import { useState } from 'react';

export interface ITheme {
  primaryColor: string;
  secondaryColor: string;
  cssVariables: { '--primary-color': string; '--secondary-color': string };
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
    },
  },
  twoOneOne: {
    primaryColor: '#005191',
    secondaryColor: '#539ED0',
    cssVariables: {
      '--primary-color': '#005191',
      '--secondary-color': '#539ED0',
    },
  },
};

export type StyleReturn = [ITheme, React.Dispatch<React.SetStateAction<'default' | 'twoOneOne'>>, keyof IThemes];

export default function useStyle(initialStyle: keyof IThemes): StyleReturn {
  const [themeName, setTheme] = useState(initialStyle);

  const theme = themes[themeName];

  for (const [key, value] of Object.entries(theme.cssVariables)) {
    document.documentElement.style.setProperty(key, value);
  }

  return [theme, setTheme, themeName];
}
