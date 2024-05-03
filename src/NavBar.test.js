import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter instead of BrowserRouter
import NavBar from './NavBar';

test('renders navbar links correctly', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  // Check if all navigation links are present
  expect(screen.getByText('BLISSMED')).toBeInTheDocument();
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About Us')).toBeInTheDocument();
  expect(screen.getByText('Prevention of Breast Cancer')).toBeInTheDocument();
  expect(screen.getByText('Predict')).toBeInTheDocument();
  expect(screen.getByText('Health Journal')).toBeInTheDocument();
  expect(screen.getByText('Contact Us')).toBeInTheDocument();
  expect(screen.getByText('Administration')).toBeInTheDocument();
});

test('active link is highlighted correctly', () => {
  // Render the Navbar with a specific active link
  render(
    <MemoryRouter initialEntries={['/about']}> {/* Simulate navigation to '/about' route */}
      <NavBar />
    </MemoryRouter>
  );

  // After navigation, check if the "About Us" link is active
  expect(screen.getByText('About Us').closest('li')).toHaveClass('active');
});
