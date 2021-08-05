import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import Dashboard from '../../pages/DashboardBarber';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedSignOut = jest.fn();
const mockedAppointments = [
  {
    id: '5d0571a6-92e6-4ca6-b9cb-ee5fce8acd4a',
    provider_id: '1109cc5a-b59f-4a56-af14-1584d62c68bf',
    user_id: '94c78366-47b9-49af-920f-7431748162a1',
    date: '2021-08-28T20:00:00.000Z',
    created_at: '2020-08-04T06:32:30.726Z',
    updated_at: '2020-08-04T06:32:30.726Z',
    user: {
      id: '94c78366-47b9-49af-920f-7431748162a1',
      name: 'Guilherme Teixeira',
      email: 'mail@mail.com',
      avatar: 'b1ba530918-20170131_21224012.jpg',
      created_at: '2020-07-29T06:49:17.261Z',
      updated_at: '2020-08-03T20:34:52.082Z',
      avatar_url:
        'http://localhost:4356/files/b1ba530918-20170131_21224012.jpg',
    },
  },
  {
    id: 'd57ee9f9-a1a7-4023-a706-febe56837428',
    provider_id: '1109cc5a-b59f-4a56-af14-1584d62c68bf',
    user_id: '94c78366-47b9-49af-920f-7431748162a1',
    date: '2021-08-28T13:00:00.000Z',
    created_at: '2020-08-04T06:27:51.098Z',
    updated_at: '2020-08-04T06:27:51.098Z',
    user: {
      id: '94c78366-47b9-49af-920f-7431748162a1',
      name: 'Guilherme Teixeira',
      email: 'mail@mail.com',
      avatar: 'b1ba530918-20170131_21224012.jpg',
      created_at: '2020-07-29T06:49:17.261Z',
      updated_at: '2020-08-03T20:34:52.082Z',
      avatar_url:
        'http://localhost:4356/files/b1ba530918-20170131_21224012.jpg',
    },
  },
];
const mockedMonthAvailability = [
  {
    day: 1,
    available: false,
  },
  {
    day: 2,
    available: false,
  },
  {
    day: 3,
    available: false,
  },
  {
    day: 4,
    available: false,
  },
  {
    day: 5,
    available: false,
  },
  {
    day: 6,
    available: false,
  },
  {
    day: 7,
    available: false,
  },
  {
    day: 8,
    available: false,
  },
  {
    day: 9,
    available: false,
  },
  {
    day: 10,
    available: false,
  },
  {
    day: 11,
    available: false,
  },
  {
    day: 12,
    available: false,
  },
  {
    day: 13,
    available: false,
  },
  {
    day: 14,
    available: false,
  },
  {
    day: 15,
    available: false,
  },
  {
    day: 16,
    available: false,
  },
  {
    day: 17,
    available: false,
  },
  {
    day: 18,
    available: false,
  },
  {
    day: 19,
    available: false,
  },
  {
    day: 20,
    available: false,
  },
  {
    day: 21,
    available: false,
  },
  {
    day: 22,
    available: false,
  },
  {
    day: 23,
    available: false,
  },
  {
    day: 24,
    available: false,
  },
  {
    day: 25,
    available: false,
  },
  {
    day: 26,
    available: false,
  },
  {
    day: 27,
    available: false,
  },
  {
    day: 28,
    available: true,
  },
  {
    day: 29,
    available: true,
  },
  {
    day: 30,
    available: true,
  },
  {
    day: 31,
    available: true,
  },
];

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
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
      },
    }),
  };
});

jest.mock('date-fns', () => {
  return {
    ...jest.requireActual('date-fns'),
    isToday: () => true,
    isAfter: () => true,
  };
});

describe('DashboardBarber Page', () => {
  beforeEach(() => {
    apiMock.reset();
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 7, 28, 8));
  });

  beforeAll(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    apiMock.restore();
  });

  it('should show day appointments for provider', async () => {
    apiMock
      .onGet('appointments/me', {
        params: {
          year: 2021,
          month: 8,
          day: 28,
        },
      })
      .reply(200, mockedAppointments)
      .onGet('providers/user-123/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability);

    const { findAllByText } = render(<Dashboard />);

    expect(await findAllByText('Guilherme Teixeira')).toBeTruthy();
  });

  it('should be able to change the selected date', async () => {
    apiMock
      .onGet('appointments/me', {
        params: {
          year: 2021,
          month: 8,
          day: 28,
        },
      })
      .reply(200, mockedAppointments)
      .onGet('appointments/me', {
        params: {
          year: 2021,
          month: 8,
          day: 30,
        },
      })
      .reply(200, mockedAppointments)
      .onGet('providers/user-123/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability);

    const { getByText } = render(<Dashboard />);

    const dayTwentyEight = getByText('28');
    const dayThirty = getByText('30');

    act(() => {
      fireEvent.click(dayThirty);
    });

    await waitFor(() => {
      expect(dayTwentyEight).toHaveAttribute('aria-selected', 'false');
      expect(dayThirty).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('should not be able to change the selected date to invalid day', async () => {
    apiMock
      .onGet('appointments/me', {
        params: {
          year: 2021,
          month: 8,
          day: 28,
        },
      })
      .reply(200, mockedAppointments)
      .onGet('providers/user-123/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability);

    const { getByText } = render(<Dashboard />);

    const dayTwentyEight = getByText('28');
    const dayTwentyNine = getByText('29');

    act(() => {
      fireEvent.click(dayTwentyNine);
    });

    await waitFor(() => {
      expect(dayTwentyEight).toHaveAttribute('aria-selected', 'true');
      expect(dayTwentyNine).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('should be able to change the current month', async () => {
    apiMock
      .onGet('appointments/me', {
        params: {
          year: 2021,
          month: 8,
          day: 28,
        },
      })
      .reply(200, mockedAppointments)
      .onGet('providers/user-123/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability)
      .onGet('providers/user-123/month-availability', {
        params: {
          year: 2021,
          month: 9,
        },
      })
      .reply(200, mockedMonthAvailability);

    const { getByRole, getByText } = render(<Dashboard />);

    const nextMonthButton = getByRole('button', { name: 'Next Month' });
    const monthLabel = getByText('August 2021');

    act(() => {
      fireEvent.click(nextMonthButton);
    });

    await waitFor(() => expect(monthLabel).toHaveTextContent('September 2021'));
  });
});
