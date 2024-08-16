import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import languageOptions from '../../Assets/languageOptions';

export default function languageRouteWrapper(children: ReactElement) {
  const languages = Object.keys(languageOptions);
  return (
    <>
      {languages.map((language, key) => {
        return (
          <Route path={`/${language}`} key={key}>
            {children}
          </Route>
        );
      })}
      {children}
    </>
  );
}
