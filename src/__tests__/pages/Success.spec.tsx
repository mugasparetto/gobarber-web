import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-canvas-mock';

import Success from '../../pages/Success';

const mockedSignOut = jest.fn();
const mockedHistoryReplace = jest.fn();
let mockedLocationSearch =
  '?provider_id=provider-1&provider_name=Provider One&date=1630072800000';

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      replace: mockedHistoryReplace,
    }),
    useLocation: () => ({
      search: mockedLocationSearch,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
    Redirect: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signOut: mockedSignOut,
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        role: 'customer',
      },
    }),
  };
});

describe('Success page', () => {
  it('should be able to go back', () => {
    const { getByText } = render(<Success />);

    const goBackButton = getByText('Go back');

    fireEvent.click(goBackButton);

    expect(mockedHistoryReplace).toHaveBeenCalledWith('/');
  });
});
