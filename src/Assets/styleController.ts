import { useState } from 'react';

interface ITheme {
  primaryColor: string;
  secondaryColor: string;
}

const themes: { [key: string]: ITheme } = {
  default: {
    primaryColor: '#037A93',
    secondaryColor: '#4ecdc4',
  },
  twoOneOne: {
    primaryColor: '#005191',
    secondaryColor: '#539ED0',
  },
};

function useStyle(initialStyle: string) {
  const [style, setStyle] = useState(initialStyle);

  const theme = themes[style];

  return { theme: theme, setStyle: setStyle };
}
