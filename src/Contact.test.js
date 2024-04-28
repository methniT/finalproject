import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Contact from './Contact';
import Axios from 'axios';

jest.mock('axios');

describe('Contact component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submits the form with valid data', async () => {
    const mockedAxiosPost = jest.spyOn(Axios, 'post');
    const testData = {
      name: 'Methni',
      email: 'methni@gmail.com',
      message: 'Test message'
    };

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: testData.name } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: testData.email } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: testData.message } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(mockedAxiosPost).toHaveBeenCalledTimes(1);
      expect(mockedAxiosPost).toHaveBeenCalledWith('http://localhost:3001/contact', testData);
      expect(window.alert).toHaveBeenCalledWith('Message sent successfully!');
    });
  });

  it('displays an error message if form submission fails', async () => {
    const mockedAxiosPost = jest.spyOn(Axios, 'post');
    mockedAxiosPost.mockRejectedValueOnce(new Error('Failed to send message'));

    render(<Contact />);

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(mockedAxiosPost).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('Failed to send message. Please try again later.');
    });
  });
});
