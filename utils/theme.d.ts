import { ThemeOptions } from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    backgroundColor?: {
      main?: string;
    };
    textColor?: {
      main?: string;
    };
    boxShadowColor?: {
      main?: string;
    };
  }
  interface ThemeOptions {
    backgroundColor?: {
      main?: React.CSSProperties['color'];
    };
    textColor?: {
      main?: React.CSSProperties['color'];
    };
    boxShadowColor?: {
      main?: React.CSSProperties['color'];
    };
  }
}
