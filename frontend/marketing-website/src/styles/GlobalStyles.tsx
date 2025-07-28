import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset and base styles */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: var(--font-inter), ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.default};
    overflow-x: hidden;
    min-height: 100vh;
  }
  
  /* Remove default button styles */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.solid.brand.primary};
      outline-offset: 2px;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  
  /* Link styles */
  a {
    color: inherit;
    text-decoration: none;
    transition: color ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};
    
    &:hover {
      color: ${({ theme }) => theme.colors.solid.brand.primary};
    }
    
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.solid.brand.primary};
      outline-offset: 2px;
    }
  }
  
  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border: 1px solid ${({ theme }) => theme.colors.border.medium};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing[3]};
    transition: border-color ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.solid.brand.primary};
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }
  
  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  h1 { font-size: ${({ theme }) => theme.typography.fontSize['5xl']}; }
  h2 { font-size: ${({ theme }) => theme.typography.fontSize['4xl']}; }
  h3 { font-size: ${({ theme }) => theme.typography.fontSize['3xl']}; }
  h4 { font-size: ${({ theme }) => theme.typography.fontSize['2xl']}; }
  h5 { font-size: ${({ theme }) => theme.typography.fontSize.xl}; }
  h6 { font-size: ${({ theme }) => theme.typography.fontSize.lg}; }
  
  /* Responsive heading sizes */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    h1 { font-size: ${({ theme }) => theme.typography.fontSize['4xl']}; }
    h2 { font-size: ${({ theme }) => theme.typography.fontSize['3xl']}; }
    h3 { font-size: ${({ theme }) => theme.typography.fontSize['2xl']}; }
    h4 { font-size: ${({ theme }) => theme.typography.fontSize.xl}; }
  }
  
  /* Paragraph styles */
  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* List styles */
  ul, ol {
    padding-left: ${({ theme }) => theme.spacing[6]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    
    li {
      margin-bottom: ${({ theme }) => theme.spacing[2]};
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  /* Utility classes */
  .gradient-text {
    background: ${({ theme }) => theme.colors.text.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: ${({ theme }) => theme.spacing[4]};
    padding-right: ${({ theme }) => theme.spacing[4]};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-left: ${({ theme }) => theme.spacing[3]};
      padding-right: ${({ theme }) => theme.spacing[3]};
    }
  }
  
  .container-full {
    width: 100%;
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    padding-left: ${({ theme }) => theme.spacing[6]};
    padding-right: ${({ theme }) => theme.spacing[6]};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding-left: ${({ theme }) => theme.spacing[4]};
      padding-right: ${({ theme }) => theme.spacing[4]};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-left: ${({ theme }) => theme.spacing[3]};
      padding-right: ${({ theme }) => theme.spacing[3]};
    }
  }
  
  /* Grid system */
  .grid {
    display: grid;
    gap: ${({ theme }) => theme.spacing[4]};
    
    &.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
    &.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    &.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    &.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
    &.grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
    
    /* Responsive grid */
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      &.grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
      &.grid-cols-6 { grid-template-columns: repeat(3, 1fr); }
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      gap: ${({ theme }) => theme.spacing[3]};
      
      &.grid-cols-2,
      &.grid-cols-3,
      &.grid-cols-4,
      &.grid-cols-6 {
        grid-template-columns: 1fr;
      }
    }
  }
  
  /* Flex utilities */
  .flex {
    display: flex;
    
    &.flex-col { flex-direction: column; }
    &.flex-wrap { flex-wrap: wrap; }
    &.items-center { align-items: center; }
    &.items-start { align-items: flex-start; }
    &.items-end { align-items: flex-end; }
    &.justify-center { justify-content: center; }
    &.justify-between { justify-content: space-between; }
    &.justify-around { justify-content: space-around; }
    &.justify-evenly { justify-content: space-evenly; }
    
    &.gap-xs { gap: ${({ theme }) => theme.spacing[1]}; }
    &.gap-sm { gap: ${({ theme }) => theme.spacing[2]}; }
    &.gap-md { gap: ${({ theme }) => theme.spacing[3]}; }
    &.gap-lg { gap: ${({ theme }) => theme.spacing[4]}; }
    &.gap-xl { gap: ${({ theme }) => theme.spacing[6]}; }
  }
  
  /* Text utilities */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  .text-xs { font-size: ${({ theme }) => theme.typography.fontSize.xs}; }
  .text-sm { font-size: ${({ theme }) => theme.typography.fontSize.sm}; }
  .text-base { font-size: ${({ theme }) => theme.typography.fontSize.base}; }
  .text-lg { font-size: ${({ theme }) => theme.typography.fontSize.lg}; }
  .text-xl { font-size: ${({ theme }) => theme.typography.fontSize.xl}; }
  .text-2xl { font-size: ${({ theme }) => theme.typography.fontSize['2xl']}; }
  .text-3xl { font-size: ${({ theme }) => theme.typography.fontSize['3xl']}; }
  
  .font-light { font-weight: ${({ theme }) => theme.typography.fontWeight.light}; }
  .font-normal { font-weight: ${({ theme }) => theme.typography.fontWeight.normal}; }
  .font-medium { font-weight: ${({ theme }) => theme.typography.fontWeight.medium}; }
  .font-semibold { font-weight: ${({ theme }) => theme.typography.fontWeight.semibold}; }
  .font-bold { font-weight: ${({ theme }) => theme.typography.fontWeight.bold}; }
  
  /* Spacing utilities */
  .m-0 { margin: 0; }
  .mt-0 { margin-top: 0; }
  .mb-0 { margin-bottom: 0; }
  .ml-0 { margin-left: 0; }
  .mr-0 { margin-right: 0; }
  
  .p-0 { padding: 0; }
  .pt-0 { padding-top: 0; }
  .pb-0 { padding-bottom: 0; }
  .pl-0 { padding-left: 0; }
  .pr-0 { padding-right: 0; }
  
  /* Visibility utilities */
  .hidden { display: none; }
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    .hidden-sm { display: none; }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    .hidden-md { display: none; }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    .hidden-lg { display: none; }
  }
  
  /* Animation utilities */
  .fade-in {
    opacity: 0;
    animation: fadeIn ${({ theme }) => theme.animations.duration.slow} ${({ theme }) => theme.animations.easing.easeOut} forwards;
  }
  
  .slide-up {
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp ${({ theme }) => theme.animations.duration.slow} ${({ theme }) => theme.animations.easing.easeOut} forwards;
  }
  
  .scale-in {
    opacity: 0;
    transform: scale(0.9);
    animation: scaleIn ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.spring} forwards;
  }
  
  /* Keyframe animations */
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-10px); }
    70% { transform: translateY(-5px); }
  }
  
  /* Gradient background animation */
  .animated-gradient {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
  }
  
  /* Hover effects */
  .hover-lift {
    transition: transform ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  .hover-scale {
    transition: transform ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  /* Focus styles for accessibility */
  .focus-visible {
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.solid.brand.primary};
      outline-offset: 2px;
    }
  }
  
  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.solid.neutral[100]};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.solid.neutral[400]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    &:hover {
      background: ${({ theme }) => theme.colors.solid.neutral[500]};
    }
  }
  
  /* Print styles */
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    .no-print {
      display: none !important;
    }
  }
`;

export default GlobalStyles;