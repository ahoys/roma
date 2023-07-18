export interface IButton {
  name: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  danger?: boolean;
  onClick: () => void;
}
