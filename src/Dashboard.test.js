// Dashboard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders Dashboard component', () => {
  const onSignOut = jest.fn(); // Mock the onSignOut function

  const { getByText } = render(<Dashboard onSignOut={onSignOut} />);

  // Check if the welcome message is rendered
  const welcomeMessage = getByText(/Welcome to BLISSMED/i);
  expect(welcomeMessage).toBeInTheDocument();

  // Check if the sign out button is rendered
  const signOutButton = getByText(/Sign out/i);
  expect(signOutButton).toBeInTheDocument();
});

test('calls onSignOut when Sign out button is clicked', () => {
  const onSignOut = jest.fn(); // Mock the onSignOut function

  const { getByText } = render(<Dashboard onSignOut={onSignOut} />);

  // Click the sign out button
  const signOutButton = getByText(/Sign out/i);
  fireEvent.click(signOutButton);

  // Check if onSignOut function is called
  expect(onSignOut).toHaveBeenCalledTimes(1);
});
