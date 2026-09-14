import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the profile name and the seven case cards', () => {
  render(<App />);
  expect(screen.getAllByText(/김규호/).length).toBeGreaterThan(0);
  expect(document.querySelectorAll('[id^="case-"]').length).toBe(7);
});

test('sections follow the reading order', () => {
  render(<App />);
  const ids = Array.from(document.querySelectorAll('main section[id]')).map((el) => el.id);
  expect(ids).toEqual(['home', 'journey', 'platform', 'stories', 'stack', 'ai', 'how', 'leadership', 'contact']);
});

test('renders the two-page print resume with site link and education', () => {
  render(<App />);
  const rp = document.querySelector('.print-only.rp');
  expect(rp).not.toBeNull();
  expect(rp?.textContent).toContain('한성대학교');
  expect(rp?.textContent).toContain('kyo-resume.vercel.app');
  expect(rp?.querySelectorAll('a').length).toBe(0);
  expect(rp?.querySelectorAll('svg').length).toBe(0);
});
