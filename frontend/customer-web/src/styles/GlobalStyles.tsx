'use client';

import { createGlobalStyle } from 'styled-components';
import { cssVariables } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* CSS Custom Properties */
  :root {
    ${cssVariables}
  }

  /* CSS Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
    overflow-x: hidden; /* Prevent horizontal scroll */
    overflow-y: auto; /* Allow vertical scroll and dropdowns */
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.default};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    overflow-x: hidden; /* Prevent horizontal scroll */
    overflow-y: auto; /* Allow vertical scroll and dropdowns */
    min-height: 100vh;
    transition: color 0.3s ease, background-color 0.3s ease;
  }

  /* Global transition styles for theme switching */
  * {
    transition: background-color 0.3s ease, 
                color 0.3s ease, 
                border-color 0.3s ease, 
                box-shadow 0.3s ease,
                opacity 0.3s ease;
  }

  /* Prevent transitions during theme initialization */
  .no-transition * {
    transition: none !important;
  }

  /* Theme-aware document classes */
  .dark-theme {
    color-scheme: dark;
  }

  .light-theme {
    color-scheme: light;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h1 { font-size: ${({ theme }) => theme.typography.fontSize.h1}; }
  h2 { font-size: ${({ theme }) => theme.typography.fontSize.h2}; }
  h3 { font-size: ${({ theme }) => theme.typography.fontSize.h3}; }
  h4 { font-size: ${({ theme }) => theme.typography.fontSize.h4}; }
  h5 { font-size: ${({ theme }) => theme.typography.fontSize.h5}; }
  h6 { font-size: ${({ theme }) => theme.typography.fontSize.h6}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color ${({ theme }) => theme.animations.duration.fast} ${({ theme }) => theme.animations.easing.standard};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borderRadius.small};
    }
  }

  /* Form Elements */
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, select, textarea {
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
    }
  }

  /* Lists */
  ul, ol {
    padding-left: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Scrollbar Styling - Theme Aware */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral[100]};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[400]};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
    }
  }

  /* Utility Classes */
  .gradient-text {
    background: ${({ theme }) => theme.colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .gradient-background {
    background: ${({ theme }) => theme.colors.background.gradient};
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
  }

  .text-glow {
    text-shadow: 0 0 20px rgba(255, 154, 158, 0.6);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0 ${({ theme }) => theme.spacing.xl};
    }
  }

  /* Keyframe Animations */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 154, 158, 0.4); }
    50% { box-shadow: 0 0 40px rgba(255, 154, 158, 0.8); }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* RTL Support */
  html[dir="rtl"] {
    body {
      direction: rtl;
      text-align: right;
    }

    .container {
      text-align: right;
    }

    .gradient-text {
      background: linear-gradient(-135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* RTL list adjustments */
    ul, ol {
      padding-left: 0;
      padding-right: ${({ theme }) => theme.spacing.lg};
    }

    /* RTL button group adjustments */
    .button-group {
      flex-direction: row-reverse;
    }
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  @media (prefers-contrast: high) {
    :root {
      --color-primary-gradient: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      --color-secondary-gradient: linear-gradient(135deg, #0abde3 0%, #006ba6 100%);
    }

    a {
      text-decoration: underline;
    }

    button {
      border: 2px solid currentColor;
    }
  }

  /* Dark mode support preparation */
  @media (prefers-color-scheme: dark) {
    :root {
      /* Dark theme variables will be added here */
    }
  }

  /* Print styles */
  @media print {
    * {
      background: transparent !important;
      color: #000 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a {
      text-decoration: underline;
    }

    .gradient-text {
      -webkit-text-fill-color: #000 !important;
      background: none !important;
    }
  }

  /* Focus management for better accessibility */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  .focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;