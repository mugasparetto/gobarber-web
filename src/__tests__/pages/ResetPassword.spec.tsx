import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
let mockedLocationSearch = '?token=token-123';
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: mockedLocationSearch,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();

    apiMock.reset();
  });

  afterAll(() => {
    apiMock.restore();
  });

  it('should be able to reset password', async () => {
    apiMock.onPost('password/reset').reply(204);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Password');
    const passwordConfirmationField = getByPlaceholderText('Confirm password');
    const buttonElement = getByText('Reset password');

    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).toHaveBeenCalledWith('/'));
  });

  it('should not be able to reset password without token', async () => {
    mockedLocationSearch = '';

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Password');
    const passwordConfirmationField = getByPlaceholderText('Confirm password');
    const buttonElement = getByText('Reset password');

    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' })
      )
    );
  });

  it('should not be able to reset password with unmatching passwords', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Password');
    const passwordConfirmationField = getByPlaceholderText('Confirm password');
    const buttonElement = getByText('Reset password');

    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    fireEvent.change(passwordConfirmationField, {
      target: { value: 'no-matching-password' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/')
    );
  });
});
