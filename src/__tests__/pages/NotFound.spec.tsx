import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NotFound from '../../pages/NotFound';

const mockedHistoryReplace = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      replace: mockedHistoryReplace,
    }),
  };
});

describe('Success page', () => {
  it('should be able to go back', () => {
    const { getByText } = render(<NotFound />);

    const goBackButton = getByText('Go to main page');

    fireEvent.click(goBackButton);

    expect(mockedHistoryReplace).toHaveBeenCalledWith('/');
  });
});
