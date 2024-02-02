const dark = {
  background: {
    app: '#030a0c',
    navigator: '#030a0c',
    navigatorButton: '#0090ff',
    menu: '#ffffff',
    button: '#1e1e1e',
    input: '#081317',
    shadow: '#000000',
    avatar: '#f72c25',
    notification: 'linear-gradient(-60deg, #fb00ff, #0090ff)',
    danger: '#ff0000',
    modal: '#ffffff',
    pane: '#000000',
    bar: '#000000',
    tag: '#51436f',
    comment: '#262626',
    feature_stage_0: 'linear-gradient(-60deg, #1c2b37, #492525, #151b2d)',
    feature_stage_1: 'linear-gradient(-60deg, #1c2b37, #493823, #151b2d)',
    feature_stage_2: 'linear-gradient(-60deg, #1c1c30, #1d292a, #1c1c30)',
  },
  color: {
    app: '#dbe1dc',
    navigator: '#dbe1dc',
    navigatorButton: '#ffffff',
    menu: '#000000',
    button: '#ffffff',
    input: '#ffffff',
    shadow: '#ffffff',
    avatar: '#ffffff',
    notification: '#ffffff',
    danger: '#ffffff',
    modal: '#030a0c',
    pane: '#dbe1dc',
    bar: '#00ff8c',
    tag: '#ffffff',
    comment: '#ffffff',
    feature: '#ffffff',
  },
  border: {
    input: '2px solid #262626',
    actions: '1px solid #262626',
  },
  outline: {
    input: '2px solid #ffffff',
  },
  special: {
    true: '#00ff8c',
    false: '#ff0000',
    roma: 'linear-gradient(-60deg, #00ff8c, #fb00ff, #0090ff)',
    julius: 'linear-gradient(-60deg, #00ff8c, #0090ff)',
    nero: 'linear-gradient(-60deg, #ff00fa, #ff7100)',
    splitter: 'linear-gradient(-60deg, #030a0c, #00ff8c, #fb00ff, #0090ff)',
    modified: '#00ff8c',
  },
  gap: {
    tiny: '4px',
    small: '8px',
    normal: '16px',
    large: '32px',
    extra: '64px',
  },
  zindex: {
    navigator: 2,
    pane: 3,
    modals: 4,
    notifications: 5,
    menus: 1,
  },
};

const light: typeof dark = {
  ...dark,
  background: {
    app: '#f3f7f4',
    navigator: '#f3f7f4',
    navigatorButton: '#0090ff',
    menu: '#ffffff',
    button: '#030a0c',
    input: '#ffffff',
    shadow: '#000000',
    avatar: '#f72c25',
    notification: '#000000',
    danger: '#ff0000',
    modal: '#ffffff',
    pane: '#ffffff',
    bar: '#000000',
    tag: '#d2b9df',
    comment: '#0090ff',
    feature_stage_0: 'linear-gradient(-60deg, #d4d7e5, #ebb7b7, #d4d7e5)',
    feature_stage_1: 'linear-gradient(-60deg, #d4d7e5, #fbf0c4, #d4d7e5)',
    feature_stage_2: 'linear-gradient(-60deg, #d4d7e5, #c1c6c6, #d4d7e5)',
  },
  color: {
    app: '#313131',
    navigator: '#313131',
    navigatorButton: '#ffffff',
    menu: '#000000',
    button: '#dbe1dc',
    input: '#000000',
    shadow: '#ffffff',
    avatar: '#ffffff',
    notification: '#ffffff',
    danger: '#ffffff',
    modal: '#030a0c',
    pane: '#313131',
    bar: '#00ff8c',
    tag: '#000000',
    comment: '#ffffff',
    feature: '#000000',
  },
  border: {
    input: '2px solid #cfcfcf',
    actions: '1px solid #cfcfcf',
  },
  outline: {
    input: '2px solid #000000',
  },
  special: {
    true: '#00ff8c',
    false: '#ff0000',
    roma: 'linear-gradient(-60deg, #00ff8c, #fb00ff, #0090ff)',
    julius: 'linear-gradient(-60deg, #00ff8c, #0090ff);',
    nero: 'linear-gradient(-60deg, #ff00fa, #ff7100)',
    splitter: 'linear-gradient(-60deg, #f3f7f4, #00ff8c, #fb00ff, #0090ff)',
    modified: '#00ff8c',
  },
};

export type TTheme = typeof dark;

export type TThemes = {
  dark: TTheme;
  light: TTheme;
};

export const themes: TThemes = {
  dark,
  light,
};

export const baseTheme = `
  html, body, #client {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  body {
    font-family: Tahoma, sans-serif;
    overflow: hidden;
    color: #dbe1dc;
    background: #030804;
  }
  p, h1, h2, h3, svg {
    margin: 0;
    padding: 0;
    flex-shrink: 0;
    white-space: break-spaces;
  }
  label {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
  p {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  h1 {
    font-size: 2.8rem;
    font-weight: 400;
    line-height: 4.2rem;
    background: ${dark.special.julius};
    background-size: 180%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h2 {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 2.4rem;
    background: ${dark.special.nero};
    background-size: 180%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.7rem;
  }
  textarea {
    font-size: 1rem;
    line-height: 1.1rem;
    font-weight: 400;
  }
  a {
    color: inherit;
    text-decoration: inherit;
    border-radius: 4px;
  }
  button {
    background: none;
    color: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 4px;
    font-size: 1rem;
    line-height: 1.5rem;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  ul, li {
    margin: 0;
    padding: 0;
  }
  textarea {
    resize: none;
    font-family: Tahoma, sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    overflow: visible;
  }
  ::-webkit-scrollbar {
    width: 8px;
    background: #030804;
    -webkit-border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb {
      background: linear-gradient(-60deg, #ff00fa, #ff7100);
      -webkit-border-radius: 4px;
  }
  ::-webkit-scrollbar-corner {
      background: #030804;
  }
`;
