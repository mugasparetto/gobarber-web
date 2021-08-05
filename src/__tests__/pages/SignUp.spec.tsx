import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import SignUp from '../../pages/SignUp';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
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

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    apiMock.reset();
  });

  afterAll(() => {
    apiMock.restore();
  });

  it('should be able to sign up', async () => {
    const apiResponse = {
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatar_url: null,
      role: 'customer',
    };

    apiMock.onPost('users').reply(200, apiResponse);

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Register');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).toHaveBeenCalledWith('/'));
  });

  it('should not be able to sign up with invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Register');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  });

  it('should display an error if sign up fails', async () => {
    apiMock.onPost('users').networkErrorOnce();

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Register');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' })
      )
    );
  });
});
