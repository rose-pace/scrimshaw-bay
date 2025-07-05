/**
 * Main entry point for Scrimshaw Bay Campaign Guide
 */

import { ScrimshawBayApp } from '@/app.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create and initialize the app
  const app = new ScrimshawBayApp();
  
  // Make app available globally for debugging
  window.ScrimshawBayApp = app;
  
  // Handle any uncaught errors
  window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
  });
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });
  
  console.log('Scrimshaw Bay Campaign Guide initialized successfully');
});
