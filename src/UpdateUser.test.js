import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UpdateUser from './UpdateUser';

// Mock Axios
jest.mock('axios', () => ({
  put: jest.fn(() => Promise.resolve({ data: { message: 'Success' } })),
}));

describe('UpdateUser', () => {
  test('should update user information', async () => {
    // Render the component
    const { getByPlaceholderText, getByTestId, getByText } = render(<UpdateUser />);

    // Fill in form fields
    fireEvent.change(getByPlaceholderText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('new name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('new age'), { target: { value: '30' } });

    // Submit the form
<button type="submit" data-testid="update-user-button">Update User</button>
  });
});
