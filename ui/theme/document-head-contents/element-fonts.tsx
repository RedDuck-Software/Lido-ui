import React from 'react';

const CSS_FONTS = `@import url(https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800);
body {
font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
@font-face {
    font-family: 'Graphik';
    src: url('./graphik/GraphikMedium.otf') format('woff2');
    font-weight: medium;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Graphik';
    src: url('./graphik/GraphikRegular.otf') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Graphik';
    src: url('./graphik/GraphikSemibold.otf') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'sfDisplay';
    src: url('./sf-pro-display/SFPRODISPLAYBOLD.OTF') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'sfDisplay';
    src: url('./sf-pro-display/SFPRODISPLAYMEDIUM.OTF') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'sfDisplay';
    src: url('./sf-pro-display/SF-Pro-Display-Semibold.woff') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'sfText';
    src: url('./sf-pro-text/SF-Pro-Text-Bold.otf') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'sfText';
    src: url('./sf-pro-text/SF-Pro-Text-Medium.otf') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'sfText';
    src: url('./sf-pro-text/SF-Pro-Text-Regular.otf') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'sfText';
    src: url('./sf-pro-text/SF-Pro-Text-Semibold.otf') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}
`;

export const Fonts = (): JSX.Element => <style>{CSS_FONTS}</style>;
