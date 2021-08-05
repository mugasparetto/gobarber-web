import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface BarberProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

export const Container = styled.div``;

export const Header = styled.header`
  padding: 2rem 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 2rem;

  @media all and (max-width: 31.25em) {
    padding: 0 1rem;
  }

  > img {
    height: 5rem;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;

  @media all and (max-width: 31.25em) {
    margin-left: auto;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;

    @media all and (max-width: 24em) {
      display: none;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    line-height: 1.5rem;

    @media all and (max-width: 24em) {
      margin-left: 0;
    }

    span {
      color: #f4ede8;
      font-size: 1rem;
    }

    strong {
      color: #ff9000;
      font-size: 1rem;
    }
  }
`;

export const Content = styled.main`
  max-width: 70rem;
  margin: 4rem auto;
  padding: 0 2rem;
  display: flex;

  @media all and (max-width: 55.625em) {
    flex-direction: column;
    margin: 2rem auto;
  }

  @media all and (max-width: 31.25em) {
    padding: 0 1rem;
  }
`;

export const BarbersContainer = styled.div`
  flex: 1;
  margin-right: 7.5rem;

  @media all and (max-width: 63.75em) {
    margin-right: 4rem;
  }

  @media all and (max-width: 55.625em) {
    margin-right: 0;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.25rem;

    @media all and (max-width: 31.25em) {
      font-size: 2rem;
    }
  }
`;

export const BarbersList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  @media all and (max-width: 55.625em) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }

  @media all and (max-width: 31.25em) {
    margin-top: 1.5rem;
  }
`;

export const Barber = styled.div<BarberProps>`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.selected
      ? css`
          background: #ff9000;
        `
      : css`
          background: #3e3b47;
        `}

  &:hover {
    ${(props) =>
      props.selected
        ? css`
            background: #ff9000;
          `
        : css`
            background: ${shade(0.1, '#3e3b47')};
          `}
  }

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;

    @media all and (max-width: 55.625em) {
      width: 2.5rem;
      height: 2.5rem;
    }

    @media all and (max-width: 24em) {
      display: none;
    }
  }

  strong {
    margin-left: 1.5rem;
    font-size: 1.25rem;

    ${(props) =>
      props.selected
        ? css`
            color: #232129;
          `
        : css`
            color: #fff;
          `}

    @media all and (max-width: 55.625em) {
      margin-left: 1rem;
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media all and (max-width: 24em) {
      margin-left: 0;
    }
  }

  & + div {
    margin-top: 1rem;
  }

  @media all and (max-width: 55.625em) {
    max-width: 15rem;
    padding: 1rem;

    & + div {
      margin-top: 0;
      margin-left: 1rem;
    }
  }
`;

export const CalendarContainer = styled.aside`
  h1 {
    font-size: 2.25rem;
    margin-bottom: 2rem;

    @media all and (max-width: 31.25em) {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }

  h4 {
    text-align: center;
    margin-top: 5rem;
    font-size: 1rem;
  }
`;

export const Calendar = styled.div`
  width: 23.75rem;

  @media all and (max-width: 55.625em) {
    margin: 0 auto;
  }

  @media all and (max-width: 31.25em) {
    width: auto;
  }

  .hidden {
    display: none;
  }

  .DayPicker {
    border-radius: 0.625rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 0.625rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5rem;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 0.5rem;
    margin: 1rem 0 0 0;
    padding: 1rem;
    background-color: #28262e;
    border-radius: 0 0 0.625rem 0.625rem;

    @media all and (max-width: 24em) {
      border-spacing: 0.25rem;
      padding: 1rem 0;
    }
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 2.5rem;
    height: 2.5rem;
    background: #3e3b47;
    border-radius: 0.625rem;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 0.625rem;
    color: #232129 !important;
  }

  .DayPicker-Day--outside {
    background: transparent !important;
  }
`;

export const Section = styled.section`
  margin-top: 2rem;

  > strong {
    color: #999591;
    font-size: 1.25rem;
    line-height: 1.5rem;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  > p {
    color: #999591;
    font-size: 1rem;
  }
`;

export const HourContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Hour = styled.button<HourProps>`
  border: 0;
  padding: 0.75rem;
  background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 0.625rem;

  opacity: ${(props) => (props.available ? 1 : 0.3)};
  cursor: ${(props) => (props.available ? 'pointer' : 'auto')};

  span {
    color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
    font-size: 1rem;
  }

  &:hover {
    ${(props) =>
      props.selected
        ? css`
            background: #ff9000;
          `
        : props.available &&
          css`
            background: ${shade(0.1, '#3e3b47')};
          `}
  }
`;
