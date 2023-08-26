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

const en = {
  _id: 'en',
  _name: 'English (en)',
  fields: {
    ...fields.en,
  },
  buttons: {
    ...buttons.en,
  },
  registers: {
    ...registers.en,
  },
  titles: {
    ...titles.en,
  },
  navigator: {
    ...navigator.en,
  },
  notifications: {
    ...notifications.en,
  },
  inputs: {
    ...inputs.en,
  },
  panes: {
    ...panes.en,
  },
  descriptions: {
    ...descriptions.en,
  },
  progress: {
    ...progress.en,
  },
  comment: {
    ...comment.en,
  },
  home: {
    ...home.en,
  },
  login: {
    ...login.en,
  },
  profile: {
    ...profile.en,
  },
  options: {
    ...options.en,
  },
};

const fi: typeof en = {
  _id: 'fi',
  _name: 'Suomi (fi)',
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

export const strings: { [key: string]: typeof en } = { en, fi };
