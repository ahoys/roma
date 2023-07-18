import fields from 'strings/strings.fields';
import buttons from 'strings/strings.buttons';
import registers from 'strings/strings.registers';
import titles from 'strings/strings.titles';
import navigator from 'strings/strings.navigator';
import notifications from 'strings/strings.notifications';
import inputs from 'strings/strings.inputs';
import panes from 'strings/strings.panes';
import descriptions from 'strings/strings.descriptions';
import progress from 'strings/strings.progress';
import comment from 'strings/strings.comment';
import home from 'strings/strings.home';
import login from 'strings/strings.login';
import profile from 'strings/strings.profile';
import options from 'strings/strings.options';

const fi = {
  fields: {
    ...fields.fi,
  },
  buttons: {
    ...buttons.fi,
  },
  registers: {
    ...registers.fi,
  },
  titles: {
    ...titles.fi,
  },
  navigator: {
    ...navigator.fi,
  },
  notifications: {
    ...notifications.fi,
  },
  inputs: {
    ...inputs.fi,
  },
  panes: {
    ...panes.fi,
  },
  descriptions: {
    ...descriptions.fi,
  },
  progress: {
    ...progress.fi,
  },
  comment: {
    ...comment.fi,
  },
  home: {
    ...home.fi,
  },
  login: {
    ...login.fi,
  },
  profile: {
    ...profile.fi,
  },
  options: {
    ...options.fi,
  },
};

export const strings: { [key: string]: typeof fi } = { fi };
