import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  format,
  parseISO,
  isAfter,
  isWeekend,
  addHours,
  subHours,
  isEqual,
  startOfDay,
} from 'date-fns';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface AppointmentData {
  id: string;
  date: string;
  formattedHour: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const DashboardBarber: React.FC = () => {
  const brazilianTime = useMemo(() => {
    let date = subHours(new Date(), 3);
    date = addHours(date, new Date().getTimezoneOffset() / 60);

    return date;
  }, []);

  const [selectedDate, setSelectedDate] = useState(brazilianTime);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [currentMonth, setCurrentMonth] = useState(brazilianTime);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<AppointmentData[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const formattedAppointments = response.data.map((appointment) => {
          const apiDate = addHours(
            parseISO(appointment.date),
            new Date().getTimezoneOffset() / 60
          );

          return {
            ...appointment,
            date: apiDate.toISOString(),
            formattedHour: format(apiDate, 'HH:mm'),
          };
        });

        setAppointments(formattedAppointments);
      });
  }, [selectedDate]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, 'MMMM do');
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc');
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) => {
      return isAfter(parseISO(appointment.date), brazilianTime);
    });
  }, [appointments, brazilianTime]);

  const fullDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const date = new Date(year, month, monthDay.day);

        return (
          monthDay.available === false &&
          !isWeekend(date) &&
          isAfter(date, brazilianTime)
        );
      })
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability, brazilianTime]);

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
        <Schedule>
          <h1>Bookings</h1>
          <p style={{ color: 'white' }}>Time below is related to GMT-3</p>
          <p>
            {isEqual(startOfDay(selectedDate), startOfDay(brazilianTime)) && (
              <span>Today</span>
            )}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isEqual(startOfDay(selectedDate), startOfDay(brazilianTime)) &&
            nextAppointment && (
              <NextAppointment>
                <strong>Next booking</strong>
                <div>
                  <img
                    src={nextAppointment.user.avatar_url}
                    alt={nextAppointment.user.name}
                  />
                  <strong>{nextAppointment.user.name}</strong>
                  <span>
                    <FiClock /> {nextAppointment.formattedHour}
                  </span>
                </div>
              </NextAppointment>
            )}

          <Section>
            <strong>Morning</strong>

            {morningAppointments.length === 0 && <p>No bookings</p>}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock /> {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Afternoon</strong>

            {afternoonAppointments.length === 0 && <p>No bookings</p>}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock /> {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
              past: { before: brazilianTime },
              highlighted: [...fullDays],
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default DashboardBarber;
