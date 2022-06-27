import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  if (typeof window.URL.createObjectURL === 'undefined') {
    window.URL.createObjectURL = () => {
      // Do nothing
      // Mock this function for mapbox-gl to work
    };
  }
  render(<App />);
});
