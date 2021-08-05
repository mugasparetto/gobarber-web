import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import Profile from '../../pages/Profile';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedUpdateUser = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      updateUser: mockedUpdateUser,
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      },
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

describe('Profile Page', () => {
  afterAll(() => {
    apiMock.restore();
  });

  it('should be able to update name and email', async () => {
    const apiResponse = {
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatar_url: null,
    };

    apiMock.onPut('profile').reply(200, apiResponse);

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const buttonElement = getByText('Save changes');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).toHaveBeenCalledWith('/'));
  });

  it('should be able to update password', async () => {
    const apiResponse = {
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatar_url: null,
    };

    apiMock.onPut('profile').reply(200, apiResponse);

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const oldPasswordField = getByPlaceholderText('Password');
    const passwordField = getByPlaceholderText('New password');
    const passwordConfirmationField = getByPlaceholderText('Confirm password');

    const buttonElement = getByText('Save changes');

    fireEvent.change(oldPasswordField, { target: { value: '123456' } });
    fireEvent.change(passwordField, { target: { value: '234567' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '234567' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).toHaveBeenCalledWith('/'));
  });

  it('should not be able to update profile with invalid password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const oldPasswordField = getByPlaceholderText('Password');
    const passwordField = getByPlaceholderText('New password');
    const passwordConfirmationField = getByPlaceholderText('Confirm password');

    const buttonElement = getByText('Save changes');

    fireEvent.change(oldPasswordField, { target: { value: '123456' } });
    fireEvent.change(passwordField, { target: { value: '234567' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: 'no-matching-password' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/')
    );
  });

  it('should display an error if update fails', async () => {
    apiMock.onPut('profile').networkError();

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const oldPasswordField = getByPlaceholderText('Password');
    const passwordField = getByPlaceholderText('New password');
    const passwordConfirmationField = getByPlaceholderText('Confirm password');

    const buttonElement = getByText('Save changes');

    fireEvent.change(oldPasswordField, { target: { value: '123456' } });
    fireEvent.change(passwordField, { target: { value: '234567' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '234567' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' })
      )
    );
  });

  it('should update avatar', async () => {
    const file = new File(['test'], 'image.png', { type: 'image/png' });

    const apiResponse = {
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatar_url: 'https://avatarlink.com',
    };

    apiMock.onPatch('users/avatar').reply(200, apiResponse);

    const { getByTestId } = render(<Profile />);

    const uploadField = getByTestId('input-avatar');

    fireEvent.change(uploadField, { target: { files: [file] } });

    await waitFor(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' })
      )
    );
  });

  it('should not update avatar without file', async () => {
    const { getByTestId } = render(<Profile />);

    const uploadField = getByTestId('input-avatar');

    fireEvent.change(uploadField, { target: { files: null } });

    await waitFor(() =>
      expect(mockedAddToast).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' })
      )
    );
  });
});
