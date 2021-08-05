import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import ForgotPassword from '../../pages/ForgotPassword';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ForgotPassword Page', () => {
  afterAll(() => {
    apiMock.restore();
  });

  it('should be able to request a new password', async () => {
    apiMock.onPost('password/forgot').reply(204);

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('Email');
    const buttonElement = getByText('Send email');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' })
      )
    );
  });

  it('should not request a new password without an email', async () => {
    apiMock.onPost('password/forgot').reply(204);

    const { getByText } = render(<ForgotPassword />);

    const buttonElement = getByText('Send email');

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedAddToast).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' })
      )
    );
  });

  it('should display an error if request new password fails', async () => {
    apiMock.onPost('password/forgot').networkError();

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('Email');
    const buttonElement = getByText('Send email');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' })
      )
    );
  });
});
