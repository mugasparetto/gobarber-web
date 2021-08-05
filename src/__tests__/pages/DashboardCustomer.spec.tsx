import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import Dashboard from '../../pages/DashboardCustomer';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedSignOut = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

const mockedProviders = [
  {
    id: 'provider-1',
    name: 'Provider One',
    avatar_url: 'http://fake-avatar-url.com',
  },
  {
    id: 'provider-2',
    name: 'Provider Two',
    avatar_url: 'http://fake-avatar-url.com',
  },
  {
    id: 'provider-3',
    name: 'Provider Three',
    avatar_url: 'http://fake-avatar-url.com',
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
    available: true,
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
const mockedDayAvailability = [
  {
    hour: 8,
    available: true,
  },
  {
    hour: 9,
    available: false,
  },
  {
    hour: 10,
    available: false,
  },
  {
    hour: 11,
    available: true,
  },
  {
    hour: 12,
    available: false,
  },
  {
    hour: 13,
    available: false,
  },
  {
    hour: 14,
    available: true,
  },
  {
    hour: 15,
    available: false,
  },
  {
    hour: 16,
    available: true,
  },
  {
    hour: 17,
    available: false,
  },
];

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
      signOut: mockedSignOut,
      user: {
        id: 'user-123',
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

jest.mock('date-fns', () => {
  return {
    format: (date: Date | number) => {
      const newDate = new Date(date);

      return `${String(newDate.getHours()).padStart(2, '0')}:00`;
    },
  };
});

describe('DashboardCustomer Page', () => {
  beforeEach(() => {
    apiMock.reset();
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 7, 27, 8).getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
    apiMock.restore();
  });

  it('should show day appointments for provider', async () => {
    apiMock.onGet('providers').reply(200, mockedProviders);

    const { findAllByText } = render(<Dashboard />);

    expect(await findAllByText('Provider One')).toBeTruthy();
  });

  it('should load provider availability', async () => {
    apiMock
      .onGet('providers')
      .reply(200, mockedProviders)
      .onGet('providers/provider-1/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability)
      .onGet('providers/provider-1/day-availability', {
        params: {
          year: 2021,
          month: 8,
          day: 27,
        },
      })
      .reply(200, mockedDayAvailability);

    const { findByText } = render(<Dashboard />);

    const providerOneElement = await findByText('Provider One');

    act(() => {
      fireEvent.click(providerOneElement);
    });

    const dayTwentySix = await findByText('26');
    const dayTwentySeven = await findByText('27');
    const dayThirty = await findByText('30');
    const hourEight = await findByText('08:00');
    const hourEightButton = hourEight.parentElement;
    const hourNine = await findByText('09:00');
    const hourNineButton = hourNine.parentElement;

    expect(dayTwentySeven).toHaveAttribute('aria-selected', 'true');
    expect(dayTwentySix).toHaveAttribute('aria-disabled', 'true');
    expect(dayThirty).toHaveAttribute('aria-disabled', 'false');
    expect(hourEightButton).not.toHaveAttribute('disabled');
    expect(hourNineButton).toHaveAttribute('disabled');
  });

  it('should be able to change the selected date', async () => {
    apiMock
      .onGet('providers')
      .reply(200, mockedProviders)
      .onGet('providers/provider-1/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability)
      .onGet('providers/provider-1/day-availability', {
        params: {
          year: 2021,
          month: 8,
          day: 30,
        },
      })
      .reply(200, mockedDayAvailability)
      .onGet('providers/provider-1/day-availability', {
        params: {
          year: 2021,
          month: 8,
          day: 27,
        },
      })
      .reply(200, mockedDayAvailability);

    const { findByText } = render(<Dashboard />);

    const providerOneElement = await findByText('Provider One');

    act(() => {
      fireEvent.click(providerOneElement);
    });

    const dayTwentySeven = await findByText('27');
    const dayThirty = await findByText('30');

    act(() => {
      fireEvent.click(dayThirty);
    });

    await waitFor(() => {
      expect(dayTwentySeven).toHaveAttribute('aria-selected', 'false');
      expect(dayThirty).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('should not be able to change the selected date to invalid day', async () => {
    apiMock
      .onGet('providers')
      .reply(200, mockedProviders)
      .onGet('providers/provider-1/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability)
      .onGet('providers/provider-1/day-availability', {
        params: {
          year: 2021,
          month: 8,
          day: 27,
        },
      })
      .reply(200, mockedDayAvailability);

    const { findByText } = render(<Dashboard />);

    const providerOneElement = await findByText('Provider One');

    act(() => {
      fireEvent.click(providerOneElement);
    });

    const dayTwentySeven = await findByText('27');
    const dayTwentyEight = await findByText('28');

    act(() => {
      fireEvent.click(dayTwentyEight);
    });

    await waitFor(() => {
      expect(dayTwentySeven).toHaveAttribute('aria-selected', 'true');
      expect(dayTwentyEight).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('should be able to change the current month', async () => {
    apiMock
      .onGet('providers')
      .reply(200, mockedProviders)
      .onGet('providers/provider-1/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability)
      .onGet('providers/provider-1/month-availability', {
        params: {
          year: 2021,
          month: 9,
        },
      })
      .reply(200, mockedMonthAvailability)
      .onGet('providers/provider-1/day-availability', {
        params: {
          year: 2021,
          month: 8,
          day: 27,
        },
      })
      .reply(200, mockedDayAvailability)
      .onGet('providers/provider-1/day-availability', {
        params: {
          year: 2021,
          month: 9,
          day: 27,
        },
      })
      .reply(200, mockedDayAvailability);

    const { findByText, getByRole, getByText } = render(<Dashboard />);

    const providerOneElement = await findByText('Provider One');

    act(() => {
      fireEvent.click(providerOneElement);
    });

    const nextMonthButton = getByRole('button', { name: 'Next Month' });
    const monthLabel = getByText('August 2021');

    act(() => {
      fireEvent.click(nextMonthButton);
    });

    await waitFor(() => expect(monthLabel).toHaveTextContent('September 2021'));
  });

  it('should create an appointment', async () => {
    apiMock
      .onGet('providers')
      .reply(200, mockedProviders)
      .onGet('providers/provider-1/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability)
      .onGet('providers/provider-1/day-availability', {
        params: {
          year: 2021,
          month: 8,
          day: 27,
        },
      })
      .reply(200, mockedDayAvailability)
      .onPost('appointments')
      .replyOnce(200, {
        provider_id: 'provider-1',
        user_id: 'user-123',
        id: 'appointment-123',
      });

    const { findByText } = render(<Dashboard />);

    const providerOneElement = await findByText('Provider One');

    act(() => {
      fireEvent.click(providerOneElement);
    });

    const hourEleven = await findByText('11:00');
    const hourElevenButton = hourEleven.parentElement;

    const bookNowButton = await findByText('Book now');

    act(() => {
      fireEvent.click(hourElevenButton!);
    });

    fireEvent.click(bookNowButton);

    await waitFor(() =>
      expect(mockedHistoryPush).toHaveBeenCalledWith(
        expect.objectContaining({
          state: {
            bookingSucceeded: true,
          },
        })
      )
    );
  });

  it('should display an error if creating an appointment fails', async () => {
    apiMock
      .onGet('providers')
      .reply(200, mockedProviders)
      .onGet('providers/provider-1/month-availability', {
        params: {
          year: 2021,
          month: 8,
        },
      })
      .reply(200, mockedMonthAvailability)
      .onGet('providers/provider-1/day-availability', {
        params: {
          year: 2021,
          month: 8,
          day: 27,
        },
      })
      .reply(200, mockedDayAvailability)
      .onPost('appointments')
      .networkError();

    const { findByText } = render(<Dashboard />);

    const providerOneElement = await findByText('Provider One');

    act(() => {
      fireEvent.click(providerOneElement);
    });

    const hourFourteen = await findByText('14:00');
    const hourFourteenButton = hourFourteen.parentElement;

    const bookNowButton = await findByText('Book now');

    act(() => {
      fireEvent.click(hourFourteenButton!);
    });

    fireEvent.click(bookNowButton);

    await waitFor(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' })
      )
    );
  });
});
