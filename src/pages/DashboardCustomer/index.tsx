import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { format, addHours, subHours } from 'date-fns';
import { FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Button from '../../components/Button';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  BarbersContainer,
  BarbersList,
  Barber,
  CalendarContainer,
  Calendar,
  Section,
  Hour,
  HourContainer,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface DayAvailabilityItem {
  hour: number;
  available: boolean;
}

interface BarberData {
  id: string;
  name: string;
  avatar_url: string;
}

const DashboardCustomer: React.FC = () => {
  const brazilianTime = useMemo(() => {
    let date = subHours(new Date(), 3);
    date = addHours(date, new Date().getTimezoneOffset() / 60);

    return date;
  }, []);

  const [selectedDate, setSelectedDate] = useState(brazilianTime);
  const [selectedHour, setSelectedHour] = useState<number | undefined>(
    undefined
  );
  const [currentMonth, setCurrentMonth] = useState(brazilianTime);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [dayAvailability, setDayAvailability] = useState<DayAvailabilityItem[]>(
    []
  );
  const [barbers, setBarbers] = useState<BarberData[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<
    Omit<BarberData, 'avatar_url'> | undefined
  >(undefined);

  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.disabled) {
      return;
    }
    setSelectedDate(day);
    setSelectedHour(undefined);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleSelectBarber = useCallback(
    (barber: Omit<BarberData, 'avatar_url'>) => {
      setSelectedBarber(barber);
      setSelectedHour(undefined);
    },
    []
  );

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour!);
      date.setMinutes(0);

      let apiDate = addHours(date, 3);
      apiDate = subHours(apiDate, new Date().getTimezoneOffset() / 60);

      await api.post('appointments', {
        provider_id: selectedBarber?.id,
        date: apiDate,
      });

      history.push({
        pathname: '/customer/success',
        search: `?provider_id=${selectedBarber?.id}&provider_name=${
          selectedBarber?.name
        }&date=${date.getTime()}`,
        state: {
          bookingSucceeded: true,
        },
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Something went wrong',
        description: 'An error has occured. Try again.',
      });
    }
  }, [selectedBarber, selectedDate, selectedHour, addToast, history]);

  useEffect(() => {
    api.get<BarberData[]>('/providers').then((response) => {
      const { data } = response;
      setBarbers(data);
    });
  }, []);

  useEffect(() => {
    if (selectedBarber) {
      api
        .get(`/providers/${selectedBarber.id}/month-availability`, {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        })
        .then((response) => {
          setMonthAvailability(response.data);
        });
    }
  }, [currentMonth, selectedBarber]);

  useEffect(() => {
    if (selectedBarber) {
      api
        .get(`/providers/${selectedBarber.id}/day-availability`, {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        })
        .then((response) => {
          setDayAvailability(response.data);
        });
    }
  }, [selectedDate, selectedBarber]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const morningAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [dayAvailability]);

  const afternoonAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [dayAvailability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <Link to="/profile">
              <img src={user.avatar_url} alt={user.name} />
            </Link>
            <div>
              <Link to="/profile">
                <span>Welcome,</span>
              </Link>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <BarbersContainer>
          <h1>Barbers</h1>

          <BarbersList>
            {barbers.map((barber) => (
              <Barber
                key={barber.id}
                selected={selectedBarber?.id === barber.id}
                onClick={() => {
                  handleSelectBarber(barber);
                }}
              >
                <img src={barber.avatar_url} alt={barber.name} />
                <strong>{barber.name}</strong>
              </Barber>
            ))}
          </BarbersList>
        </BarbersContainer>

        <CalendarContainer>
          {selectedBarber && <h1>Select a date & time</h1>}
          <Calendar>
            {!selectedBarber && <h4>No barber selected</h4>}
            <DayPicker
              disabledDays={[
                { daysOfWeek: [0, 6] },
                { before: brazilianTime },
                ...disabledDays,
              ]}
              fromMonth={brazilianTime}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              onMonthChange={handleMonthChange}
              className={selectedBarber ? '' : 'hidden'}
            />
            <p>Hours below are related to GMT-3</p>
          </Calendar>
          {selectedBarber && (
            <>
              <Section>
                <strong>Morning</strong>
                <HourContainer>
                  {morningAvailability.map(
                    ({ formattedHour, available, hour }) => (
                      <Hour
                        disabled={!available}
                        selected={selectedHour === hour}
                        available={available}
                        key={formattedHour}
                        onClick={() => {
                          handleSelectHour(hour);
                        }}
                      >
                        <span>{formattedHour}</span>
                      </Hour>
                    )
                  )}
                </HourContainer>
              </Section>
              <Section>
                <strong style={{ marginTop: 24 }}>Afternoon</strong>
                <HourContainer>
                  {afternoonAvailability.map(
                    ({ formattedHour, available, hour }) => (
                      <Hour
                        disabled={!available}
                        selected={selectedHour === hour}
                        available={available}
                        key={formattedHour}
                        onClick={() => {
                          handleSelectHour(hour);
                        }}
                      >
                        <span>{formattedHour}</span>
                      </Hour>
                    )
                  )}
                </HourContainer>
              </Section>
              <Button
                style={{ marginTop: 32 }}
                disabled={!selectedHour}
                onClick={handleCreateAppointment}
              >
                Book now
              </Button>
            </>
          )}
        </CalendarContainer>
      </Content>
    </Container>
  );
};

export default DashboardCustomer;
