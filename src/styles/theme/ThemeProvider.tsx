import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { themes } from './themes';
export const ThemeProvider = (props: { children: React.ReactChild }) => {

  return (
    <OriginalThemeProvider theme={themes}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
