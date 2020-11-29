import React                            from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import customTheme                      from '../styles/customTheme';
import MainLayout                       from '../components/MainLayout';

function MyApp({ Component, pageProps }) {
  return <>
    <head>
      <title>Flexa-Gallery</title>
    </head>
    <ThemeProvider theme={{ ...customTheme }}>
      <CSSReset/>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  </>;
}

export default MyApp;
