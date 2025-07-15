export interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  }