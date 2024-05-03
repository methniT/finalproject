// AdminDashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

test('renders AdminDashboard component', () => {
  render(
    <Router>
      <AdminDashboard />
    </Router>
  );

  // Check if the heading is rendered correctly
  const headingElement = screen.getByText(/Admin Dashboard/i);
  expect(headingElement).toBeInTheDocument();

  // Check if Main Options section is rendered correctly
  const mainOptionsSection = screen.getByText(/Main Options/i);
  expect(mainOptionsSection).toBeInTheDocument();

  // Check if User Management section is rendered correctly
  const userManagementSection = screen.getByText(/User Management/i);
  expect(userManagementSection).toBeInTheDocument();

  // Check if all the links are rendered correctly and have the correct destinations
  const links = screen.getAllByRole('link');
  links.forEach(link => {
    expect(link).toHaveAttribute('href');
  });

  // Specific link checks
  const predictLink = screen.getByText(/Predict/i);
  expect(predictLink).toHaveAttribute('href', '/predict');

  const healthJournalLink = screen.getByText(/Health Journal/i);
  expect(healthJournalLink).toHaveAttribute('href', '/health-journal');

  const signOutLink = screen.getByText(/Sign Out/i);
  expect(signOutLink).toHaveAttribute('href', '/sign-out');

  const updateUserLink = screen.getByText(/Update User/i);
  expect(updateUserLink).toHaveAttribute('href', '/update-user');

  const deleteUserLink = screen.getByText(/Delete User/i);
  expect(deleteUserLink).toHaveAttribute('href', '/delete-user');

  const searchUserLink = screen.getByText(/Search User/i);
  expect(searchUserLink).toHaveAttribute('href', '/search-user');
});
