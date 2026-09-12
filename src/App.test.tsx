import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the profile name and the nine case cards', () => {
  render(<App />);
  expect(screen.getAllByText(/김규호/).length).toBeGreaterThan(0);
  expect(document.querySelectorAll('[id^="case-"]').length).toBe(9);
});
